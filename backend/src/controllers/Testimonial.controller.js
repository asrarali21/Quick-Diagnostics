import { Testimonial } from "../models/Testimonial.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";


const Addtestimonial = asyncHandler(async(req , res)=>{
    const {name , location , message} = req.body

    const imagelocalPath = req.file?.path

    console.log(imagelocalPath);
    

    if (!imagelocalPath) {
        throw new ApiError(400 , "cannot find image local path")
    }


    const image = await uploadoncloudinary(imagelocalPath)

    if (!image) {
        throw new ApiError(400 , "cloudinary upload fail")
    }


    const testimonial = await Testimonial.create({
        name,
        location,
        message,
        image:image.url
    })

    res.status(200)
    .json(new ApiResponse( 200 , testimonial , "sucessfully added testimonial"))
})


const getTestimonial = asyncHandler(async(req , res)=>{
    const testimonial = await Testimonial.find()


    res.status(200)
    .json(new ApiResponse(200 , testimonial , "successfully got testimonial"))
})


export {Addtestimonial , getTestimonial}
