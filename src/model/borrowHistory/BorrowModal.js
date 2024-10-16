import BorrowSchema from "./BorrowSchema.js";

/*CREATE*/
export const insertBorrow = async (Borrow) => {
  const newBorrow = await new BorrowSchema(Borrow).save();
  return BorrowSchema.findById(newBorrow._id).populate("userId", "fname lname").populate("bookId", "title author");
};

/*READ*/
export const getBorrowById = (_id) => {
  return BorrowSchema.findById(_id).populate("userId", "fname lname").populate("bookId", "title author category thumbnail");
};

export const getAllBorrow = (filter) => {
  return BorrowSchema.find(filter).populate("userId", "fname lname").populate("bookId", "title author category thumbnail");
};

/*UPDATE*/
export const updateBorrow = async (filter, obj) => {
  return await BorrowSchema.findOneAndUpdate(filter, obj, { new: true }).populate("userId", "fname lname").populate("bookId", "title author");
};

export const updateBorrowbyId = (_id, Borrow) => {
  return BorrowSchema.findByIdAndUpdate(_id, Borrow, { new: true }).populate("userId", "fname lname").populate("bookId", "title author");
};

/*DELETE ONE or MANY*/
export const deleteBorrowbyId = (_id) => {
  return BorrowSchema.findByIdAndDelete(_id);
};

export const deleteBorrow = (ids) => {
  return BorrowSchema.deleteMany({ _id: { $in: ids } });
};
