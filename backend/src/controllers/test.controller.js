import { Test } from "../models/test.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";





const Testinfo = asyncHandler (async(req , res)=>{
       const {testName,description,price,report_time,inclusions,tat,disclaimers,features,why_book} =req.body

 console.log(req.body);
 
 
       const iconlocalfilepath = req.files?.icon?.[0].path;
       const imagelocalfilepath  = req.files?.image?.[0]?.path;
       console.log(req.files);
       


       if (!iconlocalfilepath) {
            throw new ApiError(400 , "file doesnt exist")
            
       }

       const icon =await uploadoncloudinary(iconlocalfilepath)
      const image = imagelocalfilepath ? await uploadoncloudinary(imagelocalfilepath) : null
       
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
       ...(image?.secure_url ? { image: image.secure_url } : {}),
       })



       if (!testdetail) {
         throw new ApiError(400 , "test detail doesnt exist")
       }

       res.status(201)
       .json(new ApiResponse(201, testdetail , "successfully created test "))
})


const getallTest = asyncHandler(async(req ,res)=>{
      const test = await Test.find()

      if (!test) {
        throw new ApiError(400 , "cant found test")
      }

    res.status(200)
    .json(new ApiResponse(200 , test , "successfully got all the test"))

})

const getsingleTest = asyncHandler(async(req , res)=>{
     const {id} = req.params

     const singletest = await Test.findById(id)


     if (!singletest) {
         throw new ApiError(400 , "test not found")
     }

     res.status(200)
     .json(new ApiResponse(200 , singletest , "got test successfully"))
       
})


const deleteTest = asyncHandler(async(req , res)=>{
  const {id} = req.params
  const deletetest = await Test.findByIdAndDelete(id)

  if (!deletetest) {
       throw new ApiError(400 , "cloud not delete test")
  }


  res.status(200)
  .json(new ApiResponse(200 , "successfully deleted test"))
})



export {Testinfo , getallTest , getsingleTest ,deleteTest}


