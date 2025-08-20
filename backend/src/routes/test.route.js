import { Router } from "express";
import { Testinfo } from "../controllers/test.controller.js";



const testRouter = Router()



testRouter.route("/test").post(Testinfo)


export default testRouter