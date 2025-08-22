import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"



const verifyUser = async(req , res , next) =>{
   try {
      let token = req.cookies?.accessToken || 
                req.header("Authorization")?.replace("Bearer ", "")

             console.log("=== DEBUG INFO ===");
     console.log("All cookies:", req.cookies);
     console.log("Cookie header:", req.headers.cookie);
     console.log("ACCESS_TOKEN_SECRET exists:", !!process.env.ACCESS_TOKEN_SECRET);
 
     if (!token) {
         throw new ApiError(400 , "token not found")
     }
 
     const decodetoken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
   console.log(decodetoken);
   
     if (!decodetoken) {
         throw new ApiError(400 , "invalid credential")
     }
 
     req.user = decodetoken
 
     next()
   } catch (error) {
      throw new ApiError(400 , "invalid or expire token")
   }
}

export default verifyUser