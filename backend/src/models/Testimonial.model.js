import mongoose, { Schema } from "mongoose";


const testimonialSchema = new Schema({
     name:{
        type:String,
        required:true
     },
     location :{
        type:String,
        required:true
     },
      message :{
        type:String,
        required:true
     },
     image:{
        type:String,
       
     }

} , {timestamps:true})


export const Testimonial = mongoose.model("Testimonial" , testimonialSchema)