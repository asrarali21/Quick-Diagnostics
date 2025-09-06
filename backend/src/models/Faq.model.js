import mongoose, { Schema } from "mongoose";



const Faqschema = new Schema({
      question :{
        type:String,
        required:true
      },
         answer :{
        type:String,
        required:true
      }


},{timestamps:true})



export const Faq = mongoose.model("Faq", Faqschema)