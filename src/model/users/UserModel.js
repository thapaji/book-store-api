import UserSchema from "./UserSchema.js";

/*CREATE*/
export const insertUser = (user) => {
    return UserSchema(user).save();
}

/*READ*/
export const getUserByEmail = (email) => {
     return UserSchema.findOne({ email });
}

export const getUsers = () => {
    return UserSchema.find();
}
export const getUsersByFilter = (filter) => {
    return UserSchema.find(filter);
}

/*UPDATE*/

export const updateUser = async (filter, obj) => {
    return await UserSchema.findOneAndUpdate(filter, obj);
}

export const updateUserbyId = (_id, listItem) => {
    return UserSchema.findByIdAndUpdate({ _id }, { ...users }, { new: true });
}

/*DELETE ONE or  MANY*/
export const deleteUser = (ids) => {
    return UserSchema.deleteMany({ _id: { $in: ids } });
}