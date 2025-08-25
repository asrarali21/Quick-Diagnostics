import { Lab } from "../models/lab.model.js";
import { Slot } from "../models/Slot.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";





const createSlots = asyncHandler(async( req , res)=>{
   const { labId, date, startTime ,endTime } = req.body;

    if (!labId || !date || !startTime || !endTime) {
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
    

    const slot = await Slot.create({
         lab: labId,
        date: slotsDate,
        startTime,
         endTime,
         isBooked: false 
    })

    

    res.status(200)
    .json(new ApiResponse(200 , slot , "succesfully added slot"))


})



const getslot = asyncHandler(async(req , res)=>{

    const {labId ,date } = req.query


  if (!labId || !date) {
    throw new ApiError(400, "Lab ID and Date are required");
  }
    const slotDate = new Date(date)
    slotDate.setHours(0,0,0,0)


    const slot = await Slot.find({
        lab:labId,
        date:slotDate
    })

    res.status(200)
    .json(new ApiResponse(200 , slot , "slot fetch successfully"))
})

export{createSlots , getslot} 