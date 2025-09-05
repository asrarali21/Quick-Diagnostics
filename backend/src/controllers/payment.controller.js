import { Order } from "../models/Order.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { razorpay } from "../utils/Razorpay.js";




const CreateOrder = asyncHandler(async(req , res)=>{
     const {orderId} = req.body

 if (!orderId) throw new ApiError(400, "orderId required");
    

   const order = await Order.findById(orderId).populate("test lab")
   console.log(order);
   

   if (!order) {
    throw new ApiError(400 , "order not found")
   }

   const basePaise = order?.test?.price*100


     const orderdata = {
      keyId :process.env.RAZORPAY_KEY_ID,
      amount : order.amount,
      currency:order.currency,
      razorpayOrderId: order.razorpayOrderId,
       orderId: order._id
     }
   //already order exist
   if (order.razorpayOrderId) {
      return res.status(200)
    .json(new ApiResponse(200 , orderdata , "successfully got order"))
   }


   const razorpayOrder = await razorpay.orders.create({
    amount:basePaise,
    currency:order.currency || "INR",
    receipt: order._id.toString(),
    notes: { orderId: order._id.toString(), userId: order.user.toString() }
   })
   console.log(razorpayOrder);
   

   order.amount = basePaise;
   order.currency = "INR";
   order.razorpayOrderId = razorpayOrder.id;
   order.paymentStatus = "PENDING";
    await order.save();


    res.status(200)
    .json(new ApiResponse(200 , {order , razorpayOrder} , "succesfully created order"))

})

export {CreateOrder}