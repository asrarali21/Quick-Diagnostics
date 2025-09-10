import { Router } from "express";
import { getBotAnswer } from "../controllers/Ai.controller.js";



const AiRoute = Router()



AiRoute.route("/chat").post(getBotAnswer)


export default AiRoute