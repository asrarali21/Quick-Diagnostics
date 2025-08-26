import mongoose, { Schema } from "mongoose";


const addressschema = new Schema({
     houseNo:{
        type : String,
        required : true
     },
     road :{
           type : String,
        required : true
     },
     zipCode :{
           type : String,
        required : true
     },
      cityState :{
           type : String,
        required : true
     }
}, {timestamps:true})


export const Address = mongoose.model("Address" , addressschema)