import { Router } from "express";
import { sendOtp, signupUserBasic, verifyOtp } from "../controllers/user.controller.js";



const userRouter = Router()



userRouter.route("/signup").post(signupUserBasic)
userRouter.route("/sendotp").post(sendOtp)
userRouter.route("/verifyotp").post(verifyOtp)


export {userRouter}