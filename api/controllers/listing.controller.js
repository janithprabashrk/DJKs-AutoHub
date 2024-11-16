import Listing from '../models/listing.module.js';
import User from '../models/user.model.js';

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "Listing not found"));
    if (req.user.id !== listing.userRef) return next(createError(401, "You are not authorized to delete this listing"));
    try {
       await Listing.findByIdAndDelete(req.params.id);
       res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        next(error)
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "Listing not found"));
    if (req.user.id !== listing.userRef) return next(createError(401, "You are not authorized to update this listing"));
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return next(createError(404, "Listing not found"));
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found!' });
        }

        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        
        // Build filter object based on query parameters
        let filters = {};

        // Search term filter (searches model name)
        if (req.query.searchTerm) {
            filters.modelName = { $regex: req.query.searchTerm, $options: 'i' };
        }

        // Type filter (all vs sale)
        if (req.query.type !== 'all') {
            filters.type = req.query.type;
        }

        // Price range filter
        if (req.query.minPrice || req.query.maxPrice) {
            filters.regularPrice = {};
            if (req.query.minPrice) filters.regularPrice.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) filters.regularPrice.$lte = parseInt(req.query.maxPrice);
        }

        // Mileage filter
        if (req.query.minMileage || req.query.maxMileage) {
            filters.mileage = {};
            if (req.query.minMileage) filters.mileage.$gte = parseInt(req.query.minMileage);
            if (req.query.maxMileage) filters.mileage.$lte = parseInt(req.query.maxMileage);
        }

        // Fuel type filter
        if (req.query.fuelType && req.query.fuelType !== 'all') {
            filters.fuelType = req.query.fuelType;
        }

        // Transmission type filter
        if (req.query.transmissionType && req.query.transmissionType !== 'all') {
            filters.transmissionType = req.query.transmissionType;
        }

        // Get listings without sorting first
        const listings = await Listing.find(filters)
            .limit(limit)
            .skip(startIndex);

        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};
