import { Order } from "../models/Order.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";





const createOrder = asyncHandler(async(req , res)=>{
     const { patient, test, lab, slot, address } = req.body;

        console.log("Decoded user in controller:", req.user);
        
     if (!patient || !test || !lab || !slot || !address) {
    throw new ApiError(400, "All fields are required (patient, test, lab, slot, address)");
  }


  const order = await Order.create({
    user:req.user._id,
    patient, 
    test, 
    lab, 
    slot,
     address
  })



  res.status(200).json(new ApiResponse(200 , order , "succesfully created order"))
})


const getbyorderId = asyncHandler(async(req, res)=>{
    const {orderID} = req.params
    
    


    const order = await Order.findById(orderID)
    .populate("user" , "name,email")
    .populate("lab" , "name,price")
    .populate("patient" , "name,bookingforWhom,DOB,gender")
    .populate("slot" , "date,startTIme,ndTime")
    .populate("address" , "houseNo,road,zipCode,cityState")
    
   if (!order) {
        throw new ApiError(400 , "order not found")
    }
     




})

export {createOrder}