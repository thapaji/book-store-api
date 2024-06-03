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
        const Borrow = await insertBorrow({ ...req.body, userId: _id, userName: fname });
        if (Borrow) {
            await updateBookbyId(req.body.bookId, { isAvailable: false, expectedAvailable: today.setDate(today.getDate() + defaultborrowDays, 'day') })
            return res.json({
                status: "success",
                message: "This book is available in your account.",
                Borrow
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

// router.put("/", auth, isAdmin, updateBorrowValidation, async (req, res, next) => {
//     try {
//         const Borrow = await updateBorrowbyId(req.body._id, req.body);
//         Borrow?._id
//             ? res.json({
//                 status: "success",
//                 message: "Your Borrow has been updated successfully",
//                 Borrow
//             })
//             : res.json({
//                 status: "error",
//                 message: "Unable to update Borrow. Please try again",
//             });
//     } catch (error) {
//         console.log(error)
//         next(error);
//     }
// });


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
        const Borrow = await getAllBorrow({ status: 'active' });
        res.json({
            status: 'success',
            Borrow
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