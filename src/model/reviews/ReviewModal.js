import ReviewSchema from "./ReviewSchema.js";

/*CREATE*/
export const insertReview = (Review) => {
  return ReviewSchema(Review).save();
};

/*READ*/
export const getReviewById = (_id) => {
  return ReviewSchema.findById(_id);
};

export const getAllReviews = (filter) => {
  return ReviewSchema.find(filter);
};

/*UPDATE*/

export const updateReview = async (filter, obj) => {
  console.log(obj);
  return await ReviewSchema.findOneAndUpdate(filter, obj);
};

export const updateReviewbyId = (_id, review) => {
  return ReviewSchema.findByIdAndUpdate({ _id }, { ...review }, { new: true });
};

/*DELETE ONE or  MANY*/

export const deleteReviewbyId = (_id) => {
  return ReviewSchema.findByIdAndDelete(_id);
};

export const deleteReview = (ids) => {
  return ReviewSchema.deleteMany({ _id: { $in: ids } });
};
