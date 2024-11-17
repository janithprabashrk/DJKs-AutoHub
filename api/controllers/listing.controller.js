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
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let filters = {};

        // Enhanced search term functionality
        if (req.query.searchTerm) {
            const searchRegex = new RegExp(req.query.searchTerm, 'i');
            filters.$or = [
                { modelName: searchRegex },
                { Make: searchRegex },
                { description: searchRegex },
                { location: searchRegex }
            ];
        }

        // Type filter
        if (req.query.type && req.query.type !== 'all') {
            filters.type = req.query.type;
        }

        // Price range filter with validation
        if (req.query.minPrice || req.query.maxPrice) {
            filters.regularPrice = {};
            const minPrice = parseInt(req.query.minPrice);
            const maxPrice = parseInt(req.query.maxPrice);

            if (req.query.minPrice && !isNaN(minPrice)) {
                filters.regularPrice.$gte = minPrice;
            }
            if (req.query.maxPrice && !isNaN(maxPrice)) {
                filters.regularPrice.$lte = maxPrice;
            }

            // Log for debugging
            console.log('Price filters:', filters.regularPrice);
        }

        // Mileage range filter with validation
        if (req.query.minMileage || req.query.maxMileage) {
            filters.mileage = {};
            if (req.query.minMileage && !isNaN(req.query.minMileage)) {
                filters.mileage.$gte = parseInt(req.query.minMileage);
            }
            if (req.query.maxMileage && !isNaN(req.query.maxMileage)) {
                filters.mileage.$lte = parseInt(req.query.maxMileage);
            }
        }

        // Transmission type filter
        if (req.query.transmissionType && req.query.transmissionType !== 'all') {
            filters.Transmission = req.query.transmissionType;
        }

        // Fuel type filter
        if (req.query.fuelType && req.query.fuelType !== 'all') {
            filters.fuelType = req.query.fuelType;
        }

        // Enhanced sort configuration
        let sortOptions = {};
        if (req.query.sort) {
            switch(req.query.sort) {
                case 'price_desc':
                    sortOptions.regularPrice = -1;
                    break;
                case 'price_asc':
                    sortOptions.regularPrice = 1;
                    break;
                case 'created_desc':
                    sortOptions.createdAt = -1;
                    break;
                case 'created_asc':
                    sortOptions.createdAt = 1;
                    break;
                case 'year_desc':
                    sortOptions.year = -1;
                    break;
                case 'year_asc':
                    sortOptions.year = 1;
                    break;
                default:
                    sortOptions.createdAt = -1;
            }
        }

        const listings = await Listing.find(filters)
            .sort(sortOptions)
            .limit(limit)
            .skip(startIndex);

        // Get total count for pagination
        const total = await Listing.countDocuments(filters);

        res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
};
