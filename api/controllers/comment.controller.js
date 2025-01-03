import Comment from '../models/comment.model.js';
import { createError } from '../utils/error.js';

export const createComment = async (req, res, next) => {
    try {
        console.log('Creating comment:', req.body);
        const { content, listingId, parentId } = req.body;
        const userId = req.user.id;

        const newComment = new Comment({
            content,
            listingId,
            userId,
            parentId
        });

        const savedComment = await newComment.save();
        console.log('Saved comment:', savedComment);

        if (parentId) {
            const parentComment = await Comment.findById(parentId);
            parentComment.replies.push(savedComment._id);
            await parentComment.save();
        }

        // Populate user info
        const populatedComment = await Comment.findById(savedComment._id)
            .populate('userId', 'username avatar');

        res.status(201).json(populatedComment);
    } catch (error) {
        console.error('Error in createComment:', error);
        next(error);
    }
};

export const getListingComments = async (req, res, next) => {
    try {
        const { listingId } = req.params;
        const comments = await Comment.find({ 
            listingId, 
            parentId: null 
        })
        .populate('userId', 'username avatar')
        .populate({
            path: 'replies',
            populate: {
                path: 'userId',
                select: 'username avatar'
            }
        })
        .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return next(createError(404, "Comment not found"));
        if (comment.userId !== req.user.id) {
            return next(createError(403, "You can only delete your own comments"));
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment deleted successfully");
    } catch (error) {
        next(error);
    }
}; 