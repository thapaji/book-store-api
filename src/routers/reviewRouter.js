import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { deleteReviewbyId, getAllReviews, getReviewById, insertReview, updateReviewbyId } from "../model/reviews/ReviewModal.js";

const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

router.post("/", auth, isAdmin, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    review?._id
      ? res.json({
          status: "success",
          message: "Your Review has been added successfully",
          review,
        })
      : res.json({
          status: "error",
          message: "Unable to add review. Please try again",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.status = "200";
      error.message = "Another Review with same ISBN already exists...";
    }
    next(error);
  }
});

router.put("/", auth, isAdmin, async (req, res, next) => {
  try {
    const review = await updateReviewbyId(req.body._id, req.body);
    review?._id
      ? res.json({
          status: "success",
          message: "Your Review has been updated successfully",
          review,
        })
      : res.json({
          status: "error",
          message: "Unable to update review. Please try again",
        });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.json({
      status: "success",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

/*************** Public Controllers ***************/
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews({ status: "active" });
    res.json({
      status: "success",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const review = _id ? await getReviewById(_id) : await getAllReviews({ status: "active" });
    res.json({
      status: "success",
      review,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const review = await deleteReviewbyId(_id);
    review._id
      ? res.json({
          status: "success",
          message: "Review deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Cannot Delete Review.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
