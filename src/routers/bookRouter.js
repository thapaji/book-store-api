import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { deleteBookbyId, getAllBooks, getBookById, insertBook, updateBookbyId } from "../model/books/BookModel.js";
import { idValidation, newBookValidation, updateBookValidation } from "../middlewares/joiValidation.js";

const router = express.Router();

router.all("/", (req, res, next) => {
    next();
});

router.post("/", auth, isAdmin, newBookValidation, async (req, res, next) => {
    try {
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

router.put("/", auth, isAdmin, updateBookValidation, async (req, res, next) => {
    try {
        const book = await updateBookbyId(req.body._id, req.body);
        book?._id
            ? res.json({
                status: "success",
                message: "Your Book has been updated successfully",
                book
            })
            : res.json({
                status: "error",
                message: "Unable to update book. Please try again",
            });
    } catch (error) {
        console.log(error)
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

router.delete('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params
        const book = await deleteBookbyId(_id);
        book._id ?
            res.json({
                status: 'success',
                message: 'Book deleted successfully',
            }) :
            res.json({
                status: 'error',
                message: 'Cannot Delete Book.',
            })
    } catch (error) {
        next(error)
    }
})


export default router;