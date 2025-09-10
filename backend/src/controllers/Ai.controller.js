import getAnswer from "../utils/Ai.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";


const getBotAnswer = asyncHandler(async(req  ,res)=>{
   const {question} = req.body

   const answer = await getAnswer(question)

   if (!answer) {
    throw new ApiError(400 , "failed to get answer")
   }

   res.status(200)
   .json(new ApiResponse(200 , answer , "successfully got the answer"))
})

export {getBotAnswer}