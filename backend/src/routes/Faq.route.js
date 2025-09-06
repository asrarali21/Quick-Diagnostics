import { Router } from "express";
import { addFaq, getfaq } from "../controllers/Faq.controller.js";
import { verifyadmin } from "../middlewares/Verifyadmin.js";

const faqRoute = Router()


faqRoute.route("/addFaq").post(verifyadmin,addFaq)
faqRoute.route("/getFaq").get(getfaq)


export default faqRoute