import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
  
    const comments = await Comment.find({videoId})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
  
    const total = await Comment.countDocuments({videoId})
  
    return new ApiResponse({comments, total, page, limit})
})
  
const addComment = asyncHandler(async (req, res) => {
    const comment = await Comment.create(req.body)
    return new ApiResponse(comment) 
})
  
const updateComment = asyncHandler(async (req, res) => {
    const {id} = req.params
    const comment = await Comment.findByIdAndUpdate(id, req.body, {new: true})
    return new ApiResponse(comment)
})
  
const deleteComment = asyncHandler(async (req, res) => {
    const {id} = req.params
    await Comment.findByIdAndDelete(id)
    return new ApiResponse(null) 
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}
