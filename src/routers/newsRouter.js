import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { insertNews, getNewsById, getAllNews, updateNewsById, deleteNewsById } from "../model/news/NewsModal.js";
import {
  idValidation,
  // newNewsValidation,
  // updateNewsValidation
} from "../middlewares/joiValidation.js";

const router = express.Router();

/*************** Admin Routes ***************/

// Create a news article (Admin only)
router.post("/", auth, isAdmin, async (req, res, next) => {
  try {
    const news = await insertNews(req.body);
    news?._id
      ? res.json({
          status: "success",
          message: "News has been added successfully",
          news,
        })
      : res.json({
          status: "error",
          message: "Unable to add news. Please try again",
        });
  } catch (error) {
    next(error);
  }
});

// Update a news article (Admin only)
router.put("/", auth, isAdmin, async (req, res, next) => {
  try {
    const news = await updateNewsById(req.body._id, req.body);
    news?._id
      ? res.json({
          status: "success",
          message: "News has been updated successfully",
          news,
        })
      : res.json({
          status: "error",
          message: "Unable to update news. Please try again",
        });
  } catch (error) {
    next(error);
  }
});

// Get all news (Admin only)
router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    const newsList = await getAllNews();
    res.json({
      status: "success",
      news: newsList,
    });
  } catch (error) {
    next(error);
  }
});

/*************** Public Routes ***************/

// Get all active news (Public)
router.get("/", async (req, res, next) => {
  try {
    const newsList = await getAllNews();
    res.json({
      status: "success",
      news: newsList,
    });
  } catch (error) {
    next(error);
  }
});

// Get a single news article by ID (Public)
router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const news = await getNewsById(_id);
    news?._id
      ? res.json({
          status: "success",
          news,
        })
      : res.json({
          status: "error",
          message: "News not found",
        });
  } catch (error) {
    next(error);
  }
});

// Delete a news article by ID (Admin only)
router.delete("/:_id", auth, isAdmin, async (req, res, next) => {
  try {
    const { _id } = req.params;
    const news = await deleteNewsById(_id);
    news?._id
      ? res.json({
          status: "success",
          message: "News deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete news.",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
