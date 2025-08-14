import { Router } from "express";
import { signupUserBasic, verifyotp } from "../controllers/user.controller.js";



const userRouter = Router()



userRouter.route("/signup").post(signupUserBasic)
userRouter.route("/verifyotp").post(verifyotp)


export {userRouter}