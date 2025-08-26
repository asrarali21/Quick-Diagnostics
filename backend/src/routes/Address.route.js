import express, { Router } from "express"
import { saveAddress } from "../controllers/Address.controller.js"



const addressRouter = Router()


addressRouter.route("/saveaddress").post(saveAddress)



export default addressRouter