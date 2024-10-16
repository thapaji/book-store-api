import NewsSchema from "./NewsSchema.js";

/* CREATE */
export const insertNews = (news) => {
  return NewsSchema(news).save();
};

/* READ */
export const getNewsById = (_id) => {
  return NewsSchema.findById(_id).populate({
    path: "author",
    select: "fname lname",
  });
};

export const getAllNews = (filter) => {
  return NewsSchema.find(filter)
    .populate({
      path: "author",
      select: "fname lname",
    })
    .sort({ createdAt: -1 });
};

/* UPDATE */
export const updateNewsById = (_id, news) => {
  return NewsSchema.findByIdAndUpdate(_id, { ...news }, { new: true });
};

/* DELETE ONE OR MANY */
export const deleteNewsById = (_id) => {
  return NewsSchema.findByIdAndDelete(_id);
};

export const deleteNews = (ids) => {
  return NewsSchema.deleteMany({ _id: { $in: ids } });
};
