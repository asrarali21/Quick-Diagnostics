import { Router } from "express";

import { CreateOrder, verifyPayment } from "../controllers/payment.controller.js";
import verifyUser from "../middlewares/verifyUser.js";



const paymentRouter = Router()



paymentRouter.route("/create-order").post(verifyUser,CreateOrder)
paymentRouter.route("/verify").post(verifyUser,verifyPayment)



export default paymentRouter