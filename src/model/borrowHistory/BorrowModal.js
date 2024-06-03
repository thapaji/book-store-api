import BorrowSchema from "./BorrowSchema.js";

/*CREATE*/
export const insertBorrow = (Borrow) => {
    console.log(Borrow)
    return BorrowSchema(Borrow).save();
}

/*READ*/
export const getBorrowById = (_id) => {
    return BorrowSchema.findById(_id);
}

export const getAllBorrow = (filter) => {
    return BorrowSchema.find(filter);
}

/*UPDATE*/

export const updateBorrow = async (filter, obj) => {
    console.log(obj);
    return await BorrowSchema.findOneAndUpdate(filter, obj);
}

export const updateBorrowbyId = (_id, Borrow) => {
    return BorrowSchema.findByIdAndUpdate({ _id }, { ...Borrow }, { new: true });
}

/*DELETE ONE or  MANY*/

export const deleteBorrowbyId = (_id) => {
    console.log(listItem);
    return BorrowSchema.findByIdAndDelete(_id);
}

export const deleteBorrow = (ids) => {
    return BorrowSchema.deleteMany({ _id: { $in: ids } });
}