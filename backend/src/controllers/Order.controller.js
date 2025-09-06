import { Order } from "../models/Order.model.js";
import { Test } from "../models/test.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";





const createOrder = asyncHandler(async(req , res)=>{
     const { patient, test, lab, slot, address } = req.body;

        console.log("Decoded user in controller:", req.user);
        
     if (!patient || !test || !lab || !slot || !address) {
    throw new ApiError(400, "All fields are required (patient, test, lab, slot, address)");
  }

  const testDoc = await Test.findById(test).select("price")
  if (!testDoc) throw new ApiError(400, "Invalid test")
  const amount = testDoc.price * 100
  const order = await Order.create({
    user:req.user._id,
    patient, 
    test, 
    lab, 
    slot,
   address,
   amount,
    currency: "INR",
    paymentStatus: "PENDING"
  })



  res.status(200).json(new ApiResponse(200 , order , "succesfully created order"))
})


const getbyorderId = asyncHandler(async(req, res)=>{
    const {orderId} = req.params
    console.log("get order id:",orderId);
    
    


    const order = await Order.findById(orderId)
    .populate("user" , "name email")
    .populate("lab" , "name price")
    .populate("test" , "testName price")
    .populate("patient" , "name bookingforWhom DOB gender")
    .populate("slot" , "date startTime endTime")
    .populate("address" , "houseNo road zipCode cityState")
    
    
    
   if (!order) {
        throw new ApiError(400 , "order not found")
    }

     

 res.status(200)
 .json(new ApiResponse(200 , order , "got review order sucessfully"))


})

export {createOrder ,getbyorderId}