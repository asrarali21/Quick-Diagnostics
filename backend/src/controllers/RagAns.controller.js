import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { answerFromKb } from "../utils/rag.services.js";



const contextAnswer= asyncHandler(async(req , res)=>{
    const {question  , k} = req.body

    const result = await answerFromKb(question , k || 5)

    if (!result) {
        throw new ApiError(400 , "Failed to answer the question ")
    }


    res.status(200)
    .json(new ApiResponse(200 , result , "succesfully got the answer"))
})


export {contextAnswer}