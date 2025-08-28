import { ApiError } from "../utils/apiError.js";


export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null,
    });
  }
}