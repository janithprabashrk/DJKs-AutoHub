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


