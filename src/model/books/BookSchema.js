import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    damaged: {
      type: Number,
      default: 0,
    },
    borrowed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
