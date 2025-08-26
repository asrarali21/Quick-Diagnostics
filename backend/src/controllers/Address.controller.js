import { Address } from "../models/Address.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";



const saveAddress  = asyncHandler(async(req , res)=>{
    const {houseNo , road , zipCode, cityState} = req.body

    console.log(req.body);
    

    if ([houseNo , road , zipCode, cityState].some(item=>!item ||item.trim() === "")) {
        throw new ApiError(400 , "all feilds are required")
    }


    const address = await Address.create({
        user: req.user._id, 
        houseNo, 
        road,
         zipCode, 
         cityState
    })


    res.status(200)
    .json(new ApiResponse(200 , address ,"address successfully changed"))


})


const getaddress = asyncHandler(async(req , res)=>{
   const addresses = await Address.find({ user: req.user._id });

  if (!addresses || addresses.length === 0) {
   throw new ApiError(400, "no address found")
  }

  res.status(200).json(new ApiResponse(200 , addresses , "got address successfully"));
    
})
export{saveAddress ,getaddress}