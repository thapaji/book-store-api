import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});

NewsSchema.virtual('authorName').get(function () {
    if (this.author) {
        return `${this.author.fname} ${this.author.lname}`; 
    }
    return null;
});

NewsSchema.set('toJSON', { virtuals: true });
NewsSchema.set('toObject', { virtuals: true });

export default mongoose.model('news', NewsSchema);
