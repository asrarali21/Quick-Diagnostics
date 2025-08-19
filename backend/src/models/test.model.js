import mongoose, { Schema } from "mongoose";

const testSchema = new Schema({
    testName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,   
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    inclusions: {
        type: [String],   // array of strings
        required: true
    },
    tat: {   // Turnaround time
        type: String,
        required: true
    },
    disclaimers: {
        type: [String],
        required: true
    },
    features: {
        type: [String],
        required: true
    }
}, { timestamps: true });
