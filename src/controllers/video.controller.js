import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadeOnCloudinary } from "../utils/cloudinary.js";



const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;



    const videoFilePath = await req.files?.videoFile[0]?.path;
    const thumbnailPath = await req.files?.thumbnail[0]?.path;

    if (!videoFilePath) {
        throw new ApiError(400, "Video file is required");
    }
    if (!thumbnailPath) {
        throw new ApiError(400, "Thumbnail is required");
    }
    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    if (!description) {
        throw new ApiError(400, "Description is required");
    }
    


    const videoFile = await uploadeOnCloudinary(videoFilePath)
    const thumbnailFile = await uploadeOnCloudinary(thumbnailPath)

    if (!videoFile) {
        throw new ApiError(400, "failed to Uplode video on Cloudinary...");

    }
    if (!thumbnailFile) {
        throw new ApiError(400, "failed to Uplode thumbnail on Cloudinary...");
    }



    const user = await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const newVideo = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnailFile.url,
        title,
        description,
        views,
        isPublished,
        owner: user._id,
    });

    const uploadedVideo = await Video.findById(newVideo._id)
    console.log(uploadedVideo);
})

export { uploadVideo };