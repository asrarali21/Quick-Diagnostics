import { Router } from "express";
import { Addtestimonial, getTestimonial } from "../controllers/Testimonial.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const testimonialRoute = Router()


testimonialRoute.route("/addTestimonial").post(upload.single("image"),Addtestimonial)
testimonialRoute.route("/getTestimonial").get(getTestimonial)


export default testimonialRoute