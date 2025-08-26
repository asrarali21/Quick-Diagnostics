import { Address } from "../models/Address.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandle";



const saveAddress  = asyncHandler(async(req , res)=>{
    const {houseNo , road , zipcode, cityState} = req.body

    console.log(req.body);
    

    if ([houseNo , road , zipcode, cityState].some(item=>item.trim() === "")) {
        throw new ApiError(400 , "all feilds are required")
    }


    const address = await Address({
        houseNo , 
        road ,
         zipcode, 
         cityState
    })


    res.status(200)
    .json(new ApiResponse(200 , address ,"address successfully changed"))


})

export{saveAddress}