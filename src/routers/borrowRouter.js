import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { getAllBorrow, getBorrowById, insertBorrow, updateBorrowbyId } from "../model/borrowHistory/BorrowModal.js";
import { newBorrowValidation } from "../middlewares/joiValidation.js";
import { getBookById, updateBookbyId } from "../model/books/BookModel.js";

const router = express.Router();

const defaultborrowDays = 15;

router.all("/", (req, res, next) => {
  next();
});

router.post("/", auth, newBorrowValidation, async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const { _id: userId, fname } = req.userInfo;

    console.log(req.body);

    // Check if the user already borrowed this book and hasn't returned it
    const existingBorrow = await getAllBorrow({
      bookId,
      userId,
      isReturned: false, // Check for active borrow
    });

    if (existingBorrow.length > 0) {
      return res.status(200).json({
        status: "warning",
        message: "You have already borrowed this book and not returned it.",
      });
    }

    // Fetch book details to check stock
    const book = await getBookById(bookId);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found.",
      });
    }

    // Ensure there are available copies
    if (book.borrowed + book.damaged >= book.count) {
      return res.json({
        status: "error",
        message: "This book is currently out of stock.",
      });
    }

    // Insert the new borrow record
    const Borrow = await insertBorrow({
      ...req.body,
      userId,
      userName: fname,
    });

    if (Borrow) {
      // Increment the borrowed count for the book
      await updateBookbyId(bookId, { $inc: { borrowed: 1 } });

      return res.json({
        status: "success",
        message: "This book is available in your account.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to borrow. Please try again.",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.status = 200;
      error.message = "Another borrow with the same ISBN already exists...";
    }
    next(error);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    if (!req.body.bookId || !req.body._id) {
      throw new Error("Invalid Data...");
    }

    const borrowId = req.body._id;
    const { bookId } = req.body;

    const borrow = await updateBorrowbyId(borrowId, {
      isReturned: true,
      returnedDate: new Date(),
    });

    if (borrow?._id) {
      await updateBookbyId(bookId._id, {
        $inc: { borrowed: -1 },
      });
      return res.json({
        status: "success",
        message: "You returned the book successfully",
      });
    }

    res.json({
      status: "error",
      message: "Unable to return. Contact library",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    const borrows = await getAllBorrow();
    res.json({
      status: "success",
      borrows,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/between/:fromDate", auth, async (req, res, next) => {
  try {
    const { fromDate } = req.params;

    if (!Date.parse(fromDate)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid date format. Please use YYYY-MM-DD.",
      });
    }

    const today = new Date();
    const borrows = await getAllBorrow({
      createdAt: {
        $gte: new Date(fromDate),
        $lte: today,
      },
    });

    res.json({
      status: "success",
      borrows,
    });
  } catch (error) {
    next(error);
  }
});

/*************** Public Controllers ***************/
router.get("/", auth, async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;
    const borrows = (await getAllBorrow({ userId: _id })) || [];
    res.json({
      status: "success",
      borrows,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const Borrow = _id ? await getBorrowById(_id) : await getAllBorrow({ status: "active" });
    res.json({
      status: "success",
      Borrow,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
