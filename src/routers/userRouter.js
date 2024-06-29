import express from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { getUserByEmail, getUsersByFilter, insertUser } from "../model/users/UserModel.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { signAccessToken, signRefreshJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();


/***************** Public Controllers ******************/

router.all("/", (req, res, next) => {
  console.log("from all");
  next();
});



router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);

    user?._id
      ? res.json({
        status: "success",
        message: "Your Account has been created",
        user
      })
      : res.json({
        status: "error",
        message: "Unable to create user. Please try again",
      });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key')) {
      error.status = '200';
      error.message = 'Email already in use...'
    }
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.includes('@') || !password) {
      throw new Error('Please provide email and password');
    }
    const user = await getUserByEmail(email);
    if (user?._id) {
      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        return res.json({
          status: 'success',
          message: 'user logged in',
          tokens: {
            accessJWT: signAccessToken({ email }),
            refreshJWT: signRefreshJWT(email)
          }
        })
      }
    }
    res.json({
      status: 'error',
      message: 'Invalid login details'
    })
  } catch (error) {
    next(error)
  }
})


/************** Private Controllers *****************/

router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    res.json({
      status: "success",
      message: "todo GET",
      user: req.userInfo
    });
  } catch (error) {
    next(error);
  }
});

router.get("/students", auth, async (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    const users = await getUsersByFilter({ role: 'student' });
    res.json({
      status: "success",
      message: "All the students",
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:_id", auth, async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await getUsersByFilter({ _id });
    res.json({
      status: "success",
      message: "Selected User",
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/admins", auth, async (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    const users = await getUsersByFilter({ role: 'admin' });
    res.json({
      status: "success",
      message: "All the admins",
      users,
    });
  } catch (error) {
    next(error);
  }
});


export default router;
