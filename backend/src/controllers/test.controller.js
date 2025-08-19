import { Test } from "../models/test.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandle";





const Testinfo = asyncHandler (async(req , res)=>{
       const {testName,description,price,report_time,inclusions,tat,disclaimers,features,why_book} =req.body


       const testdetail = await Test.create({
        testName,
        description,
        price,
        report_time,
        inclusions,
        tat,
        disclaimers,
        features,
        why_book
       })

       if (!testdetail) {
         throw new ApiError(400 , "test detail doesnt exist")
       }

       res.status(201)
       .json(new ApiResponse(201, testdetail , "successfully created test "))
})