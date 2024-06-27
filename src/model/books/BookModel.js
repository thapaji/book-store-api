import BookSchema from "./BookSchema.js";

/*CREATE*/
export const insertBook = (Book) => {
    console.log(Book)
    return BookSchema(Book).save();
}

/*READ*/
export const getBookById = (_id) => {
    return BookSchema.findById(_id);
}

export const getAllBooks = (filter) => {
    return BookSchema.find(filter);
}

/*UPDATE*/

export const updateBook = async (filter, obj) => {
    console.log(obj);
    return await BookSchema.findOneAndUpdate(filter, obj);
}

export const updateBookbyId = (_id, book) => {
    return BookSchema.findByIdAndUpdate({ _id }, { ...book }, { new: true });
}

/*DELETE ONE or  MANY*/

export const deleteBookbyId = (_id) => {
    return BookSchema.findByIdAndDelete(_id);
}

export const deleteBook = (ids) => {
    return BookSchema.deleteMany({ _id: { $in: ids } });
}