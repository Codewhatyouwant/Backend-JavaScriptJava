import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteVideoFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { uploadOnCloudinaryVideo } from "../utils/cloudinary.js";





const UploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }



    const videoFilePath = await req.files?.videoFile[0]?.path;
    const thumbnailPath = await req.files?.thumbnailFile[0]?.path;

    if (!videoFilePath) {
        throw new ApiError(400, "Video file is required");
    }
    if (!thumbnailPath) {
        throw new ApiError(400, "Thumbnail is required");
    }
    if (!title || !description) {
        throw new ApiError(400, "Title and description is required");
    }



    const videoFile = await uploadOnCloudinaryVideo(videoFilePath)
    const thumbnailFile = await uploadOnCloudinary(thumbnailPath)

    if (!videoFile) {
        throw new ApiError(400, "failed to Upload video on Cloudinary...");

    }
    if (!thumbnailFile) {
        throw new ApiError(400, "failed to Upload thumbnail on Cloudinary...");
    }


    const newVideo = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnailFile.url || "",
        title,
        description,
        owner: user._id,
    });

    const uploadedVideo = await Video.findById(newVideo._id)

    user.videos.push(uploadedVideo._id)
    await user.save();

    return res
        .status(201)
        .json(new ApiResponse(200, { uploadedVideo }, "Video uploaded successfully"))

})

const DeleteVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.body;

    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const video = await User.findById(req.user?.videos) // problem


    
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    await deleteVideoFromCloudinary(videoId);

    await video.deleteOne({_id:videoId})
    await video.save();

    await user.updateOne(
        {_id: user._id}, 
        {$pull: {videos:videoId}}
    )
    await user.save();

    // const videoDeleted = await 
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"))
})

// const DeleteImage = asyncHandler(async(req,res)=>{
//     const {imageId} = req.body;
//     const user = await User.findById(req.user?._id)
// })

export { UploadVideo, DeleteVideo };