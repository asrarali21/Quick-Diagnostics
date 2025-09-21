import { Lab } from "../models/Lab.model.js";
import { Slot } from "../models/Slot.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import mongoose from 'mongoose';





const createSlots = asyncHandler(async( req , res)=>{
   const { labId, date, startTime ,endTime } = req.body;

    if (!labId || !date || !startTime || !endTime) {
        throw new ApiError(400, "Lab ID, date, and time slots array are required");
    }


    const lab = await Lab.findById(labId);
    if (!lab) {
        throw new ApiError(404, "Lab not found");
    }

         const [year, month, day] = date.split('-');
   const slotsDate = new Date(year, month - 1, day);

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



const getslot = asyncHandler(async(req, res) => {
    const { labId, date } = req.query
    console.log("=== SLOT SEARCH DEBUG ===");
    console.log("Received labId:", labId);
    console.log("Received date:", date);
    console.log("labId type:", typeof labId);

    if (!labId || !date) {
        throw new ApiError(400, "Lab ID and Date are required");
    }

    // Convert labId to ObjectId
    let labObjectId;
    try {
        labObjectId = new mongoose.Types.ObjectId(labId);
        console.log("Converted to ObjectId:", labObjectId);
    } catch (error) {
        console.log("Invalid ObjectId format:", error.message);
        throw new ApiError(400, "Invalid lab ID format");
    }

    // Debug: Check all slots for this lab first
    const allSlotsForLab = await Slot.find({ lab: labObjectId });
    console.log("Total slots for this lab:", allSlotsForLab.length);
    
    if (allSlotsForLab.length > 0) {
        console.log("Sample slot:", {
            id: allSlotsForLab[0]._id,
            lab: allSlotsForLab[0].lab,
            date: allSlotsForLab[0].date,
            dateISO: allSlotsForLab[0].date.toISOString(),
            startTime: allSlotsForLab[0].startTime,
            endTime: allSlotsForLab[0].endTime
        });
    }

    // Parse the input date
 const startOfDay = new Date(date + 'T00:00:00.000Z');
    const endOfDay = new Date(date + 'T23:59:59.999Z');


    console.log("Search range:");
    console.log("Start:", startOfDay.toISOString());
    console.log("End:", endOfDay.toISOString());

    // Try the query
    const slots = await Slot.find({
        lab: labObjectId,
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });

    console.log("Query result:", slots.length, "slots found");
    console.log("=== END DEBUG ===");

    res.status(200).json(new ApiResponse(200, slots, "slot fetch successfully"))
})

export{createSlots , getslot}