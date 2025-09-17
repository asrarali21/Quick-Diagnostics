import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { contextAnswer } from "../controllers/RagAns.controller.js";




const RagRouter = Router()



RagRouter.route("/ask").post(verifyUser , contextAnswer)

export default RagRouter