import express from 'express';
import { createListing, deleteListing, getListing, getListings, getUser, updateListing, getStats, incrementListingView, incrementAdClick } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/user/:id', getUser);
router.get('/search', getListings);
router.get('/stats', getStats);
router.post('/view/:id', incrementListingView);
router.post('/click/:id', incrementAdClick);

export default router;
