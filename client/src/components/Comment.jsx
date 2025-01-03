import { useState } from 'react';
import { useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';

export default function Comment({ comment, onReply, onDelete }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const { currentUser } = useSelector(state => state.user);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;

        await onReply(comment._id, replyContent);
        setReplyContent('');
        setShowReplyForm(false);
    };

    return (
        <div className="mb-4">
            <div className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg">
                <img 
                    src={comment.userId.avatar} 
                    alt={comment.userId.username}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-200">
                            {comment.userId.username}
                        </h4>
                        <span className="text-xs text-gray-400">
                            <TimeAgo date={comment.createdAt} />
                        </span>
                    </div>
                    <p className="text-gray-300 mt-1">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                        {currentUser && (
                            <button
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                className="text-sm text-cyan-400 hover:text-cyan-300"
                            >
                                Reply
                            </button>
                        )}
                        {currentUser && currentUser._id === comment.userId._id && (
                            <button
                                onClick={() => onDelete(comment._id)}
                                className="text-sm text-red-400 hover:text-red-300"
                            >
                                Delete
                            </button>
                        )}
                    </div>

                    {showReplyForm && (
                        <form onSubmit={handleReplySubmit} className="mt-3">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Write a reply..."
                                rows="2"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowReplyForm(false)}
                                    className="px-4 py-2 text-sm text-gray-400 hover:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                                >
                                    Reply
                                </button>
                            </div>
                        </form>
                    )}

                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 ml-8 space-y-4">
                            {comment.replies.map((reply) => (
                                <Comment
                                    key={reply._id}
                                    comment={reply}
                                    onReply={onReply}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        userId: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        replies: PropTypes.array
    }).isRequired,
    onReply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}; 