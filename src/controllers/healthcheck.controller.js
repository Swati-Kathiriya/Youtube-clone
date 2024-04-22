import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const healthcheck = asyncHandler(async (req, res) => {
  const response = {
    status: "OK",
    message: "Service is healthy"  
  };
  
  return new ApiResponse(response);
});

export {
  healthcheck
}
    