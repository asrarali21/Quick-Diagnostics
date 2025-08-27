import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { createOrder } from "../controllers/Order.controller.js";




const orderRoute = Router()



orderRoute.route("/createorder").post(verifyUser , createOrder)

export default orderRoute