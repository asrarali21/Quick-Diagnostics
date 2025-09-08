import mongoose, { Schema } from "mongoose";



const orderschema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
      patient :{
        type:Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
        test :{
        type:Schema.Types.ObjectId,
        ref:"Test",
        required:true
    },
        lab :{
        type:Schema.Types.ObjectId,
        ref:"Lab",
        required:true
    },
        slot :{
        type:Schema.Types.ObjectId,
        ref:"Slot",
        required:true
    },
      address :{
        type:Schema.Types.ObjectId,
        ref:"Address",
        required:true
    },
  amount: 
  { type: Number, 
    required: true 
}, // store in paise (e.g. Rs 499 => 49900)
  currency: 
  { type: String, 
    default: "INR" 
},
  paymentStatus: { 
    type: 
    String,enum: ["PENDING","SUCCESS","FAILED"],
     default: "PENDING" },
  razorpayOrderId: { 
    type: String
 },
  razorpayPaymentId: {
     type: String 
    },
  razorpaySignature: {
     type: String },
  paidAt: { type: Date },


  status: {
    type: String,
    enum: ['ORDER_PLACED', 'TECHNICIAN_ASSIGNED', 'SAMPLE_COLLECTED', 'EXAMINED', 'REPORT_READY'],
    default: 'ORDER_PLACED'
  },
  technician: { type: String },
  sampleCollectionDate: { type: Date },
  

},{timestamps:true})


export const Order = mongoose.model("Order" , orderschema)