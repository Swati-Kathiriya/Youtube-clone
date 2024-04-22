import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const owner = req.user._id;
  
    const playlist = await Playlist.create({ 
      name,
      description,
      owner  
    });
  
    return new ApiResponse(playlist);
});
  
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const playlists = await Playlist.find({ owner: userId });
    
    return new ApiResponse(playlists);  
});
  
const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
  
    const playlist = await Playlist.findById(playlistId);
    
    return new ApiResponse(playlist);
});
  
const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
  
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $addToSet: { videos: videoId } },
      { new: true }
    );
  
    return new ApiResponse(playlist);
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
  
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId, 
      { $pull: { videos: videoId } },
      {new: true}
    );
  
    return new ApiResponse(playlist);
});
  
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
  
    await Playlist.findByIdAndDelete(playlistId);
  
    return new ApiResponse(null); 
});
  
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
  
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { name, description }, 
      { new: true }
    );
  
    return new ApiResponse(playlist);
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
