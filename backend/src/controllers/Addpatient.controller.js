import { Patient } from "../models/AddPatients";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandle";



const Addpatient = asyncHandler(async(req , res)=>{
    const{bookingforWhom ,name ,DOB ,gender} = req.body


    if ([bookingforWhom ,name ,DOB ,gender].some(item=>item.trim() === "")) {
        throw new ApiError(400 , "all fields are required")
    }
    
    const PatientDetails = await Patient.create({
        bookingforWhom ,
        name,
        DOB,
        gender
    })


    res.status(200)
    .json(new ApiResponse(200 , PatientDetails , "successfully added patients details"))


})



