import { Test } from "../models/test.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";





const Testinfo = asyncHandler (async(req , res)=>{
       const {testName,description,price,report_time,inclusions,tat,disclaimers,features,why_book} =req.body

 console.log(req.body);
 
       const iconlocalfilepath = req.files?.icon?.[0].path;
       const imagelocalfilepath  = req.files?.image?.[0].path;
       console.log(req.files);
       


       if (!iconlocalfilepath && !imagelocalfilepath) {
            throw new ApiError(400 , "file doesnt exist")
            
       }

       const icon =await uploadoncloudinary(iconlocalfilepath)
       const image = await uploadoncloudinary(imagelocalfilepath)
       
       console.log(icon);
       console.log(image);
       
       

       const testdetail = await Test.create({
        testName,
        description,
        price,
        report_time,
        inclusions,
        tat,
        disclaimers,
        features,
        why_book,
        icon :icon.secure_url,
        image:image.secure_url
       })



       if (!testdetail) {
         throw new ApiError(400 , "test detail doesnt exist")
       }

       res.status(201)
       .json(new ApiResponse(201, testdetail , "successfully created test "))
})

export {Testinfo}