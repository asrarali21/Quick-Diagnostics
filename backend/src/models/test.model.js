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
    image: {
        type: String,
        
    },
    report_time: {
        type: String,
        required: true
    },
    inclusions: {
        type: [String],  
        required: true
    },
    tat: {   
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
    },
      why_book: {
        type: [String],
        required: true
    }
}, { timestamps: true });


export const Test = mongoose.model("Test", testSchema)