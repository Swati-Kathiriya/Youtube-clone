import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    const userId = req.user._id;
  
    const filter = {user: userId, channel: channelId};
    const update = {user: userId, channel: channelId};
    
    let subscription = await Subscription.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });
  
    return new ApiResponse(subscription);
});
  
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
  
    let subscribers = await Subscription.find({channel: channelId})
      .populate('user', 'name profilePic');
  
    return new ApiResponse(subscribers);  
});
  
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const {subscriberId} = req.params;
    
    let subscriptions = await Subscription.find({user: subscriberId})
      .populate('channel');
  
    return new ApiResponse(subscriptions);
  });

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}