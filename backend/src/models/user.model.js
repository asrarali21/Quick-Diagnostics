import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
        required :true,
        unique: true
    },
        password :{
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
      resetOtp:{
        type:Number,
    },
      resetOtpExpiry : {
        type : Date
    },
        isVerified: {
        type: Boolean,
        default: false
    }

},{timestamps:true})

userSchema.pre("save" , async function (next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password , 10)
        next()
    }else{
        next()
    }
})

userSchema.methods.IspasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.GenerateAccessToken = function () {
    
    return jwt.sign(
         {_id:this._id, 
        email:this.email,
        name:this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
    
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {_id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}


export const User = mongoose.model("User" , userSchema)


