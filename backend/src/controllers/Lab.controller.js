import { Lab } from "../models/Lab.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";




const addLab = asyncHandler(async(req , res)=>{
   const { name, location, rating, slotsAvailable, reportTime, discount ,price } = req.body;


   const labimagelocalpath = req.file.path
   console.log(labimagelocalpath);
   

   if (!labimagelocalpath) {
       throw new ApiError(400 , "file path doesnt exist")
   }

   const image = await uploadoncloudinary(labimagelocalpath)
   console.log(image);
   

   if (!image) {
    throw new ApiError(400 , "cloudinary upload failed")
   }

   const lab = await Lab.create(  {
       name,
       location,
       rating,
       slotsAvailable, 
       reportTime,
       price,
       discount,
       image: image.secure_url || image.url
    } )


    
    res.status(201).json(
        new ApiResponse(201, lab, "Lab added successfully")
    );



})


const getlab = asyncHandler(async(req , res)=>{


    const lab = await Lab.find()


    res.status(200)
    .json(new ApiResponse(200, lab , "successfully got lab"))
})

export {addLab,getlab}