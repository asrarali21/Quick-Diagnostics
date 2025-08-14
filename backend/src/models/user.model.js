import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    firstName :{
        type:String,
        required :true 
    },
    lastName :{
        type:String,
        required :true
    },
      email :{
        type:String,
        required :true
    },
    phoneNumber :{
      type:Number, 
     required : false
    },
    otp:{
        type:Number,
      
    },
    otpExpiry : {
        type : Date
    },
        isVerified: {
        type: Boolean,
        default: false
    }

},{timestamps:true})


export const User = mongoose.model("User" , userSchema)


