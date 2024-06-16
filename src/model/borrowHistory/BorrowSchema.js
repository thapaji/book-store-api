// import mongoose from 'mongoose'

// const BorrowSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     bookId: {
//         type: mongoose.Types.ObjectId,
//         ref: "Book",
//         required: true
//     },
//     dueDate: {
//         type: Date,
//     },
//     isReturned: {
//         type: Boolean,
//         default: false
//     },
//     returnedDate: {
//         type: Date,
//     }
//     /***********************
//     bookTitle: {
//         type: String,
//         required: true
//     },
//      userName: {
//         type: String,
//         required: true
//     },
//     thumbnail: {
//         type: String,
//         required: true
//     },
//     **************************/
// },
//     {
//         timestamps: true,
//     }
// )

// export default mongoose.model('Borrow', BorrowSchema)

import mongoose from 'mongoose';

const BorrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
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
    });

BorrowSchema.virtual('userName', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
    get: function () {
        return this._userName;
    },
    set: function (userName) {
        this._userName = userName;
    },
});

BorrowSchema.virtual('bookDetails', {
    ref: 'Book',
    localField: 'bookId',
    foreignField: '_id',
    justOne: true,
    get: function () {
        return this._bookDetails;
    },
    set: function (bookDetails) {
        this._bookDetails = bookDetails;
    },
});

BorrowSchema.set('toJSON', { virtuals: true });
BorrowSchema.set('toObject', { virtuals: true });

export default mongoose.model('Borrow', BorrowSchema);
