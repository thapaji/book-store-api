import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { getAllBooks, getBookById, insertBook } from "../model/books/BookModel.js";

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


router.get('/all', auth, isAdmin, async (req, res, next) => {
    try {
        const books = await getAllBooks();
        res.json({
            status: 'success',
            books
        })
    } catch (error) {
        next(error)
    }
})

/*************** Public Controllers ***************/
router.get('/', async (req, res, next) => {
    try {
        const books = await getAllBooks({ status: 'active' });
        res.json({
            status: 'success',
            books
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params
        const book = _id ? await getBookById(_id) : await getAllBooks({ status: 'active' });
        res.json({
            status: 'success',
            book
        })
    } catch (error) {
        next(error)
    }
})

export default router;