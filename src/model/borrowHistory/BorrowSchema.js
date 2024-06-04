import mongoose from 'mongoose'

const BorrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
    },
    isReturned: {
        type: Boolean,
        default: false
    },
    returnedDate: {
        type: Date,
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('Borrow', BorrowSchema)