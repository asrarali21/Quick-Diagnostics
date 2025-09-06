import { Faq } from "../models/Faq.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";



const addFaq = asyncHandler(async(req, res)=>{
    const {question , answer} = req.body

    const faq = await Faq.create({
        question,
        answer
    })
  
    res.status(200)
    .json(new ApiResponse(200 , faq , "succesfully added faq"))
})



const getfaq = asyncHandler(async(req , res)=>{

    const faq = await Faq.find()

    res.status(200)
    .json(new ApiResponse(200 , faq , "successfully got faq"))
})


export {addFaq , getfaq}