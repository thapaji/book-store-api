import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { insertBook } from "../model/books/BookModel.js";

const router = express.Router();

router.all("/", (req, res, next) => {
    next();
});

router.post("/", auth, isAdmin, async (req, res, next) => {
    try {

        console.log(req.body)
        const book = await insertBook(req.body);
        book?._id
            ? res.json({
                status: "success",
                message: "Your Book has been added successfully",
                book
            })
            : res.json({
                status: "error",
                message: "Unable to add book. Please try again",
            });
    } catch (error) {
        if (error.message.includes('E11000 duplicate key')) {
            error.status = '200';
            error.message = 'Another Book with same ISBN already exists...'
        }
        next(error);
    }
});

export default router;