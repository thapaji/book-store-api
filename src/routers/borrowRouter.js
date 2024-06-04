import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { getAllBorrow, getBorrowById, insertBorrow, updateBorrowbyId } from "../model/borrowHistory/BorrowModal.js";
import { newBorrowValidation } from "../middlewares/joiValidation.js";
import { updateBookbyId } from "../model/books/BookModel.js";

const router = express.Router();

const defaultborrowDays = 15;

router.all("/", (req, res, next) => {
    next();
});

router.post("/", auth, isAdmin, newBorrowValidation, async (req, res, next) => {
    try {
        const today = new Date();
        console.log(req.body)
        const { _id, fname } = req.userInfo;
        const Borrow = await insertBorrow({ ...req.body, userId: _id, userName: fname });
        if (Borrow) {
            await updateBookbyId(req.body.bookId, { isAvailable: false, expectedAvailable: today.setDate(today.getDate() + defaultborrowDays, 'day') })
            return res.json({
                status: "success",
                message: "This book is available in your account.",
            })
        }
        res.json({
            status: "error",
            message: "Unable to Borrow. Please try again",
        });

    } catch (error) {
        if (error.message.includes('E11000 duplicate key')) {
            error.status = '200';
            error.message = 'Another Borrow with same ISBN already exists...'
        }
        next(error);
    }
});

router.put("/", auth, async (req, res, next) => {
    try {
        if (!req.body.bookId || !req.body._id) {
            throw new Error('Invalid Data...')
        }
        const borrowId = req.body._id;
        const { _id } = req.body.bookId;
        const borrow = await updateBorrowbyId(req.body._id, {
            isReturned: true,
            returnedDate: new Date()
        })
        const book = await updateBookbyId(req.body.bookId, { isAvailable: true, expectedAvailable: null });

        borrow?._id
            ? res.json({
                status: "success",
                message: "You returned book successfully",
            })
            : res.json({
                status: "error",
                message: "Unable to return. Contact library",
            });
    } catch (error) {
        console.log(error)
        next(error);
    }
});


router.get('/all', auth, isAdmin, async (req, res, next) => {
    try {
        const Borrow = await getAllBorrow();
        res.json({
            status: 'success',
            Borrow
        })
    } catch (error) {
        next(error)
    }
})

/*************** Public Controllers ***************/
router.get('/', async (req, res, next) => {
    try {
        const { _id, role } = req.userInfo;
        const borrows = await getAllBorrow({ userId: _id }) || [];
        res.json({
            status: 'success',
            borrows
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params
        const Borrow = _id ? await getBorrowById(_id) : await getAllBorrow({ status: 'active' });
        res.json({
            status: 'success',
            Borrow
        })
    } catch (error) {
        next(error)
    }
})

export default router;