import mongoose, { Model } from 'mongoose';

const listingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
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
    Transmission : {
        type : String,
        required : true,
        enum: ['auto', 'manual']
    },
    imageUrls : {
        type : Array,
        required : true,
    },
    UserRef : {
        type : String,
        required : true,
    },
    
}, {timestamps : true});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;