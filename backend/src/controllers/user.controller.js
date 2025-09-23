import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import crypto from "crypto"
import { sendemail } from "../utils/Emailsend.js";
import jwt from "jsonwebtoken"


const signupUserBasic = asyncHandler(async(req , res)=>{
          const {firstName , lastName , email ,password} = req.body
      
          if ([firstName , lastName , email ,password].some((item)=>item.trim()=== "")) {
            throw new  ApiError(400 , "all fields are required")
          }

          // Check if user already exists
          const existingUser = await User.findOne({ email })
          if (existingUser) {
            throw new ApiError(400, "User with this email already exists")
          }


          const user = await User.create({
            firstName,
            lastName,
            email,
            password
          })

          const accessToken = user.GenerateAccessToken()
           const refreshToken = user.generateRefreshToken()

     const options ={
      httpOnly : true,
      secure : true ,
        sameSite: 'none',
         path: '/'
      }
     
     res.status(200)
       .cookie("accessToken", accessToken , options)
        .cookie("refreshToken" ,refreshToken , options) 
     .json( new ApiResponse(200 , {userID : user._id ,firstName: user.firstName} , "Proceeding to the next step") )

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
   .json(new ApiResponse(200 , {} , "opt sent successfully"))
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


const myinfo = asyncHandler(async(req , res)=>{


  const user = await User.findById(req.user._id).select("firstName , lastName , email , phoneNumber")
  console.log("my info user:",user);
  

   if (!user) {
    throw new ApiError(400 , "user not found")
  }


  res.status(200)
  .json(new ApiResponse(200 , user , "succesfully got my info"))
})

const userLogin = asyncHandler(async(req , res)=>{
  const{email , password} = req.body

  if (!email || !password) {
    throw new ApiError(400 , "all fields required")
  }

  const user = await User.findOne({email})

  if (!user) {
    throw new ApiError(400 , "user doesnt exist")
  }

  const isvalid = await user.IspasswordCorrect(password)

  if (!isvalid) {
    throw new ApiError(400 , "incorrect password")
  }

  const accessToken = user.GenerateAccessToken()
  const refreshToken = user.generateRefreshToken()

  const loggedInuser  = await User.findById(user._id).select("-password -refreshToken")
  
    const options ={
      httpOnly : true,
      secure : true ,
      sameSite: 'none',
       path: '/'
    }


  res.status(200)
  .cookie("accessToken", accessToken , options)
  .cookie("refreshToken" ,refreshToken , options) 
    .json(new ApiResponse(200 , loggedInuser , "User login successfully"))
})

const userlogout = asyncHandler(async(req , res)=>{
const options = {
  httpOnly: true,
  secure: true,      // must be true for 'none'
  sameSite: 'none',
  path: '/',
}   

     res.status(200)
    .clearCookie("accessToken" ,options)
    .clearCookie("refreshToken" ,options)
    .json(new ApiResponse(200 , {} , "User logout sucessfully"))
      
})


const ForgetPassword = asyncHandler(async(req , res )=>{
     const {email} = req.body
   
    if (!email) {
      throw new ApiError(401 , "Please Enter Email")
    }

    const user = await User.findOne({email})
   
    if (!user) {
      throw new ApiError(401 , "User Doesn't Exist")
    }


    const otp = crypto.randomInt(1000 , 10000)

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)


    user.resetOtp = otp

    user.resetOtpExpiry = otpExpiry


    await user.save()

    await sendemail(user.email , otp)


    res.status(200)
    .json(new ApiResponse(200 , user.email , "Successfully Generated Otp"))

})

const verifyOtpResetpassword = asyncHandler(async(req , res)=>{
     const {email , otp , newPassword} = req.body

      const user =await User.findOne({email})
       if (!user) {
        throw new ApiError(404, "User not found");
    }

      if (user.resetOtp !== Number(otp)) {
          throw new ApiError(401 , "Invalid Otp")
      }

    if (user.resetOtpExpiry < Date.now()) {
      throw new ApiError(401 , "Expired Otp")
    }

    user.password = newPassword

    user.save()


    res.status(200)
    .json(new ApiResponse(200  , {} , "OTP verified Succesfully"))
  
})


const adminLogin = asyncHandler(async(req ,res )=>{

    console.log(req.body);
    
        const {email , password} =req.body
  

        if (email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASS) {
          throw new ApiError(400 , "invalid creadential")
        }

        const accessToken = jwt.sign
        (
            {role:"admin"},
           process.env.ACCESS_TOKEN_SECRET,
           {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
        );
         const refreshToken = jwt.sign
        (
            {role:"admin"},
           process.env.REFRESH_TOKEN_SECRET,
           {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
        )
const options = {
  httpOnly: true,
  secure: true,      // must be true for 'none'
  sameSite: 'none',
  path: '/',
}
   res
        .cookie("accessToken" , accessToken , options )
        .cookie("refreshToken" , refreshToken , options)
        .json(new ApiResponse(200 ,  "admin login successfully"))
})


const adminlogout = asyncHandler(async(req , res)=>{
const options = {
  httpOnly: true,
  secure: true,      // must be true for 'none'
  sameSite: 'none',
  path: '/',
}
     res.status(200)
    .clearCookie("accessToken" ,options)
    .clearCookie("refreshToken" ,options)
    .json(new ApiResponse(200 , {} , "admin logout sucessfully"))
      
})



export {signupUserBasic , sendOtp , verifyOtp ,myinfo , userLogin,userlogout, ForgetPassword , verifyOtpResetpassword , adminLogin ,adminlogout} 