import { Router } from "express";
import { Testinfo } from "../controllers/test.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const testRouter = Router()



testRouter.route("/test").post(upload.fields([
    {
        name :"icon",
        maxCount :1
    },
    {
            name : "image",
            maxCount :1
        }
   ] ),Testinfo)


export default testRouter