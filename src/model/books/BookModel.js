import BookSchema from "./BookSchema.js";
import ReviewSchema from "../reviews/ReviewSchema.js";

/*CREATE*/
export const insertBook = (Book) => {
  return BookSchema(Book).save();
};

/*READ*/
export const getBookById = async (_id) => {
  const book = await BookSchema.findById(_id);
  if (book) {
    const reviews = await ReviewSchema.find({ bookId: _id });
    return { ...book._doc, reviews };
  }
  return null;
};

export const getAllBooks = async (filter) => {
  const books = await BookSchema.find(filter);
  const booksWithReviews = await Promise.all(
    books.map(async (book) => {
      const reviews = await ReviewSchema.find({ bookId: book._id });
      return { ...book._doc, reviews };
    })
  );
  return booksWithReviews;
};

/*UPDATE*/

export const updateBook = async (filter, obj) => {
  console.log(obj);
  return await BookSchema.findOneAndUpdate(filter, obj);
};

export const updateBookbyId = (_id, book) => {
  return BookSchema.findByIdAndUpdate({ _id }, { ...book }, { new: true });
};

/*DELETE ONE or  MANY*/

export const deleteBookbyId = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};

export const deleteBook = (ids) => {
  return BookSchema.deleteMany({ _id: { $in: ids } });
};
