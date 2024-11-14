import express from 'express';
import { deleteUser, test, updateUser, getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import Listing from '../models/listing.module.js';
import { errorHandler } from '../utils/error.js';

const router = express.Router();

router.get('/test', test); 
router.post('/update/:id', verifyToken , updateUser)
router.delete('/delete/:id', verifyToken , deleteUser)
router.get('/listing/:id', verifyToken , getUserListings)
router.get('/listings/:id', verifyToken, async (req, res, next) => {
  try {
    console.log('User ID:', req.params.id);
    
    const listings = await Listing.find({ userRef: req.params.id });
    
    console.log('Found listings:', listings);
    
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error in /listings/:id:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;