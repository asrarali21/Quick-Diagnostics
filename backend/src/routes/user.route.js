import { Router } from "express";
import { adminLogin, adminlogout, ForgetPassword, myinfo, sendOtp, signupUserBasic, userLogin, userlogout, verifyOtp, verifyOtpResetpassword } from "../controllers/user.controller.js";
import verifyUser from "../middlewares/verifyUser.js";



const userRouter = Router()



userRouter.route("/signup").post(signupUserBasic)
userRouter.route("/sendotp").post(sendOtp)
userRouter.route("/verifyotp").post(verifyOtp)
userRouter.route("/me").get(verifyUser , myinfo)
userRouter.route("/login").post(userLogin)
userRouter.route("/logout").post(userlogout)
userRouter.route("/forgotPassword").post(ForgetPassword)
userRouter.route("/resetPassword").post(verifyOtpResetpassword)
userRouter.route("/adminlogin").post(adminLogin)
userRouter.route("/adminlogout").post(adminlogout)


export {userRouter}