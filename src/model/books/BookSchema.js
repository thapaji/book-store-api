import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'inactive'
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        index: 1,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('book', BookSchema)