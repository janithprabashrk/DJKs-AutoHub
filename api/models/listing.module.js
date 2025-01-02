import mongoose, { Model } from 'mongoose';

const listingSchema = new mongoose.Schema({
    vehicleNumber : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    regularPrice : {
        type : Number,
        required : true,
    },
    discountPrice : {
        type : Number,
        required : false,
    },
    modelName : {
        type : String,
        required : true,
    },
    YOM : {
        type : Number,
        required : true,
    },
    modified : {
        type : Boolean,
        required : true,
    },
    Type : {
        type : String,
        required : true,
    },
    Make : {
        type : String,
        required : true,
    },
    Mileage	: {
        type : Number,
        required : true,
    },
    color : {
        type : String,
        required : true,
    },
    fuelType : {
        type : String,
        required : true,
    },
    condition : {
        type : String,
        required : true,
        enum: ['new', 'used']
    },
    contactNumber : {
        type : Number,
        required : true,
    },
    Transmission : {
        type : String,
        required : true,
        enum: ['auto', 'manual']
    },
    imageUrls : {
        type : Array,
        required : true,
    },
    userRef : {
        type : String,
        required : true,
    },
    views: {
        type: Number,
        default: 0
    },
    adClicks: {
        type: Number,
        default: 0
    }
}, {timestamps : true});

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;