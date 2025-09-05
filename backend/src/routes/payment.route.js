import { Router } from "express";

import { CreateOrder } from "../controllers/payment.controller.js";



const paymentRouter = Router()



paymentRouter.route("/create-order").post(CreateOrder)



export default paymentRouter