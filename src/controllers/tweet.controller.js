import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const user = req.user._id;
  
    const tweet = await Tweet.create({
      text,
      user
    });
  
    return new ApiResponse(tweet);
});
  
const getUserTweets = asyncHandler(async (req, res) => {   
    const user = req.user._id;
  
    const tweets = await Tweet.find({ user })
      .populate('user', 'name profilePic');
  
    return new ApiResponse(tweets);
});
  
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { text } = req.body;
  
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId, 
      { text },
      { new: true }  
    );
  
    return new ApiResponse(tweet);
});
  
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
  
    await Tweet.findByIdAndDelete(tweetId);
  
    return new ApiResponse(null);
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
