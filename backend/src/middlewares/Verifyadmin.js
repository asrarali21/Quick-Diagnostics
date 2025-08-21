import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import jwt from "jsonwebtoken"


const verifyadmin = asyncHandler(async(req ,res , next)=>{
  try {
      const token = req.cookies?.accessToken || req.headers
  
      if (!token) {
          throw new ApiError( 400 , "no token found")
      }
  
      const decodedtoken = jwt.verify(token  , process.env.ACCESS_TOKEN_SECRET)
  
  
      if (decodedtoken.role !== "admin") {
          throw new ApiError(400 , "access denied admin only")
      }
        
      req.admin = decodedtoken

      next()
  } catch (error) {
      throw new ApiError(400 , "invalid or expire token ")
  }
})

export {verifyadmin}