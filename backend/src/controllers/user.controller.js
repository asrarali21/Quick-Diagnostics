import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import crypto from "crypto"
import { sendemail } from "../utils/Emailsend.js";


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

const sendOtp = asyncHandler(async(req , res)=>{
       
    const {userID , phoneNumber} = req.body

      if (!userID||!phoneNumber) {
         throw new ApiError(400 , "please enter mobile number")
      }

      const user = await User.findById(userID)

      if (!user) {
         throw new ApiError(400 , "user not found")
      }



       
      const otp = crypto.randomInt(1000, 10000); // 4-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)

    user.phoneNumber = phoneNumber;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
   
   await sendemail(user.email , otp)
  
   

   return  res.status(200)
   .json(new ApiResponse(200 , {} , "opt generated successfully"))
})

const verifyOtp = asyncHandler(async (req, res) => {
    const { userID, otp } = req.body;

    if (!userID || !otp) {
        throw new ApiError(400, "userID and otp are required");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.otp !== Number(otp)) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (user.otpExpiry < Date.now()) {
        throw new ApiError(400, "OTP expired");
    }

    // Mark user as verified, if needed
    user.isVerified = true;
    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});

const adminLogin = asyncHandler(async(req ,res)=>{
        const {email , password} =req.body
  

        if (email ==! process.env.ADMIN_EMAIL && password ==! process.env.ADMIN_PASS) {
          throw new ApiError(400 , "invalid creadential")
        }

       
})



export {signupUserBasic , sendOtp , verifyOtp}