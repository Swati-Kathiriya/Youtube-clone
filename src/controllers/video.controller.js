import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page, limit, query, sortBy, sortType } = req.query;
  
    const videos = await Video.find(JSON.parse(query))
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ [sortBy]: sortType })
      .populate('user', 'name profilePic');
  
    return new ApiResponse(videos);
});
  
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { video } = req.files;
    const user = req.user;
  
    const uploadResult = await uploadOnCloudinary(video);
  
    const newVideo = await Video.create({
      title,
      description,
      ...uploadResult,
      user  
    });
  
    return new ApiResponse(newVideo);
});
  
const getVideoById = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.videoId);  
    return new ApiResponse(video);
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description, thumbnail } = req.body;
  
    const video = await Video.findByIdAndUpdate(
      videoId,
      { title, description, thumbnail },
      { new: true }
    );
  
    return new ApiResponse(video);
});
  
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    await Video.findByIdAndDelete(videoId);
  
    return new ApiResponse(null);
});
  
const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
  
    const video = await Video.findById(videoId);
  
    video.isPublished = !video.isPublished;
  
    await video.save();
    
    return new ApiResponse(video); 
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
