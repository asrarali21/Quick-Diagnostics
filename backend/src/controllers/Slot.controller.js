import { Lab } from "../models/lab.model";
import { Slot } from "../models/Slot.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandle";





const createSlots = asyncHandler(async( req , res)=>{
   const { labId, date, startTime ,endTime } = req.body;

    if (!labId || !date || !startTime || !endTime || !Array.isArray(timeSlots)) {
        throw new ApiError(400, "Lab ID, date, and time slots array are required");
    }


    const lab = await Lab.findById(labId);
    if (!lab) {
        throw new ApiError(404, "Lab not found");
    }

    
    const slotsDate = new Date(date);
    if (isNaN(slotsDate.getTime())) {
        throw new ApiError(400 , "invalid date formart")
    }
    

    const slot = await Slot({
         lab: labId,
        date: slotsDate,
        startTime,
         endTime,
         isBooked: false 
    })



    res.status(200)
    JSON(new ApiResponse(200 , slot , "succesfully added slot"))


})