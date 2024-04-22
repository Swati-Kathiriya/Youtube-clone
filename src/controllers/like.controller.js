import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const userId = req.user._id;
  
    const filter = {video: videoId, user: userId};
    const update = {video: videoId, user: userId};  
  
    let likedVideo = await Like.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });
  
    return new ApiResponse(likedVideo); 
});
  
const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const userId = req.user._id;
  
    const filter = {comment: commentId, user: userId};
    const update = {comment: commentId, user: userId};
    
    let likedComment = await Like.findOneAndUpdate(filter, update, {
      new: true, 
      upsert: true
    });
  
    return new ApiResponse(likedComment);
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;
    const userId = req.user._id;
  
    const filter = {tweet: tweetId, user: userId};
    const update = {tweet: tweetId, user: userId};
  
    let likedTweet = await Like.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true  
    });
  
    return new ApiResponse(likedTweet);
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    const likes = await Like.find({user: userId, video: {$exists: true}});
    
    const videoIds = likes.map(like => like.video); 
    
    const videos = await Video.find({_id: {$in: videoIds}});
  
    return new ApiResponse(videos);
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}