import { Patient } from "../models/AddPatients.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";



const Addpatient = asyncHandler(async(req , res)=>{
    const{bookingforWhom ,name ,DOB ,gender} = req.body


    if ([bookingforWhom ,name ,DOB ,gender].some(item=>item.trim() === "")) {
        throw new ApiError(400 , "all fields are required")
    }

    
    
    const PatientDetails = await Patient.create({
        user:req.user._id ,
        bookingforWhom ,
        name,
        DOB,
        gender
    })


    res.status(200)
    .json(new ApiResponse(200 , PatientDetails , "successfully added patients details"))


})

const getPatientDetails = asyncHandler (async(req , res)=>{
    
    const patient =await Patient.findOne({ user: req.user._id })
    console.log(patient);


    res.status(200)
    .json(new ApiResponse(200 , patient, "successfully got patients details"))
    
})

export {Addpatient , getPatientDetails}

