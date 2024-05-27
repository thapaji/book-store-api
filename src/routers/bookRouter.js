import express from "express";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.all("/", (req, res, next) => {
    next();
});

router.post("/", auth, async (req, res, next) => {
    try {
        if (req.userInfo.role !== 'admin') {
            throw new Error({ status: 403, message: 'You are not authorized to perform this action' })
        }
        console.log(req.body)

    } catch (error) {
        if (error.message.includes('E11000 duplicate key')) {
            error.status = '200';
            error.message = 'Another Book with same ISBN already exists...'
        }
        next(error);
    }
});

export default router;