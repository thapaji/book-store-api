import express from "express";
import { hashPassword } from "../utils/bcrypt.js";
import { insertUser } from "../model/users/UserModel.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  console.log("from all");
  next();
});

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "todo GET",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your Account has been created",
        })
      : es.json({
          status: "error",
          message: "Unable to create user. Please try again",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
