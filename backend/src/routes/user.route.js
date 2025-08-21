import { Router } from "express";
import { adminLogin, adminlogout, sendOtp, signupUserBasic, verifyOtp } from "../controllers/user.controller.js";



const userRouter = Router()



userRouter.route("/signup").post(signupUserBasic)
userRouter.route("/sendotp").post(sendOtp)
userRouter.route("/verifyotp").post(verifyOtp)
userRouter.route("/adminlogin").post(adminLogin)
userRouter.route("/adminlogout").post(adminlogout)


export {userRouter}