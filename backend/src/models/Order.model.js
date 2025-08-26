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

},{})