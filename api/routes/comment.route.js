import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
    createComment, 
    getListingComments, 
    deleteComment 
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/listing/:listingId', getListingComments);
router.delete('/delete/:id', verifyToken, deleteComment);

export default router; 