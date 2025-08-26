import express, { Router } from "express"
import { getaddress, saveAddress } from "../controllers/Address.controller.js"
import verifyUser from "../middlewares/verifyUser.js"



const addressRouter = Router()


addressRouter.route("/saveaddress").post(verifyUser,saveAddress)
addressRouter.route("/getaddress").get(verifyUser,getaddress)



export default addressRouter