import ReviewSchema from "./ReviewSchema.js";

/*CREATE*/
export const insertReview = (Review) => {
    console.log(Review)
    return ReviewSchema(Review).save();
}

/*READ*/
// export const getReviewById = (_id) => {
//     return ReviewSchema.findById(_id);
// }

export const getAllReview = (filter) => {
    return ReviewSchema.find(filter);
}

/*UPDATE*/

// export const updateReview = async (filter, obj) => {
//     console.log(obj);
//     return await ReviewSchema.findOneAndUpdate(filter, obj);
// }

// export const updateReviewbyId = (_id, Review) => {
//     return ReviewSchema.findByIdAndUpdate({ _id }, { ...Review }, { new: true });
// }

// /*DELETE ONE or  MANY*/

// export const deleteReviewbyId = (_id) => {
//     console.log(listItem);
//     return ReviewSchema.findByIdAndDelete(_id);
// }

// export const deleteReview = (ids) => {
//     return ReviewSchema.deleteMany({ _id: { $in: ids } });
// }