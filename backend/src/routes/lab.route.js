import { Router } from "express";
import { addLab, getlab } from "../controllers/Lab.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const labrouter = Router()



labrouter.route("/addlab").post(upload.single("image"),addLab)
labrouter.route("/getlab").get(getlab)


export default labrouter