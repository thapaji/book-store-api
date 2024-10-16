import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    dueDate: {
      type: Date,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    returnedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

BorrowSchema.virtual("userName", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

BorrowSchema.virtual("bookDetails", {
  ref: "books",
  localField: "bookId",
  foreignField: "_id",
  justOne: true,
});

BorrowSchema.set("toJSON", { virtuals: true });
BorrowSchema.set("toObject", { virtuals: true });

export default mongoose.model("borrow", BorrowSchema);
