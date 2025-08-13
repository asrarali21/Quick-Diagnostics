import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandle";
import crypto from "crypto"


const signupUserBasic = asyncHandler(async(req , res)=>{
          const {firstName , lastName , email} = req.body
      
          if ([firstName , lastName , email].some((item)=>item.trim()=== "")) {
            throw new  ApiError(400 , "all fields are required")
          }

          const user = await User.create({
            firstName,
            lastName,
            email
          })
     
     res.status(200)
     .json( new ApiResponse(200 , {userID : user._id} , "basic info saved") )

})

const verifyopt = asyncHandler(async()=>{
       
    const {userID , phoneNumber} = req.body

      if (!userID||!phoneNumber) {
         throw new ApiError(400 , "please enter mobile number")
      }

      const user = await User.findById(userID)

      if (!user) {
         throw new ApiError(400 , "user not found")
      }

      const otp = crypto.randomInt(1000, 10000); // 4-digit OTP
  const optExpiry = new Date(Date.now() + 5 * 60 * 1000)

    user.phoneNumber = phoneNumber;
    user.otp = otp;
    user.optExpiry = optExpiry;
    await user.save();
   

})