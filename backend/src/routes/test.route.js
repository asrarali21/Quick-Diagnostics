import { Router } from "express";
import { deleteTest, getallTest, getsingleTest, Testinfo } from "../controllers/test.controller.js";
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

   testRouter.route('/alltests').get(getallTest)
   testRouter.route('/singleTest/:id').get(getsingleTest)
   testRouter.route('/deleteTest/:id').delete(deleteTest)


export default testRouter