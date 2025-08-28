import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { createOrder, getbyorderId } from "../controllers/Order.controller.js";




const orderRoute = Router()



orderRoute.route("/createorder").post(verifyUser , createOrder)
orderRoute.route("/:orderId").get(verifyUser , getbyorderId)

export default orderRoute