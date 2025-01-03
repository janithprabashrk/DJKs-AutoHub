import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    listingId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
        default: null
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment; 