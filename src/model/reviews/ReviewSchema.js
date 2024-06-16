import mongoose from 'mongoose'

const BorrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    /*************************************** 
    userName: {
        type: String,
        required: true
    },
    *****************************************/
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: String,
        default: 'inactive'
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
},
    {
        timestamps: true,
    }
)

export default mongoose.model('Review', ReviewSchema)