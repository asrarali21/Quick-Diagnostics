import { Router } from "express";
import { getBotAnswer } from "../controllers/Ai.controller.js";
import verifyUser from "../middlewares/verifyUser.js";



const AiRoute = Router()



AiRoute.route("/chat").post(verifyUser,getBotAnswer)


export default AiRoute