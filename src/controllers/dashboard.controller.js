import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js"


const getChannelStatus = asyncHandler(async (req, res) => {

})

const getChannelVideo = asyncHandler(async (req, res) => {

})

export { getChannelStatus, getChannelVideo };  // export the function to be used elsewhere