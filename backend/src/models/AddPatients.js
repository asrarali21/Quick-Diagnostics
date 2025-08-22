import mongoose, { Schema } from "mongoose";




const addPatientSchema = new Schema({
      user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the user who added the patient
    required: true,
  },
     bookingforWhom :{
        type:String,
        enum:["Myself" ,"Mother" ,  "Father", "son", "Daughter", "Other"],
        required :true
     },
     name :{
        type:String,
        required : true
     },
      DOB :{
        type:Date,
        required : true
     },
         gender :{
        type:String,
        enum :["male" , "female" , "others"],
        required : true
     }
     
},{timestamps:true})


export const Patient = mongoose.model("Patient" , addPatientSchema)