import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
  
    const stats = {};
  
    stats.numVideos = await Video.countDocuments({ user: channelId });
  
    stats.numSubscribers = await Subscription.countDocuments({
      user: channelId 
    });
  
    stats.totalViews = await Video.aggregate([
      { $match: { user: channelId } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } } 
    ]);
  
    stats.totalLikes = await Like.aggregate([
      { $match: { videoUser: channelId } }, 
      { $group: { _id: null, totalLikes: { $sum: 1 } } }
    ]);
  
    return new ApiResponse(stats);
});
  
const getChannelVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    
    const videos = await Video.find({ user: channelId });
    
    return new ApiResponse(videos); 
});

export {
    getChannelStats, 
    getChannelVideos
}

