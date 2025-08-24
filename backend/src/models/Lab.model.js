import mongoose, { Schema } from "mongoose";

const labSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    slotsAvailable: {
        type: Number,
        default: 0
    },
    reportTime: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Lab = mongoose.model("Lab", labSchema);