import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadeOnCloudinary } from "../utils/cloudinary.js";



const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description, duration, views, isPublished, owner } = req.body;



    const videoFilePath = await req.files?.videoFile.path;
    const thumbnailPath = req.files?.thumbnail.path;

    if (!videoFilePath) {
        throw new ApiError(400, "Video file is required");

    }

    if (!thumbnail) {
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



    const user = await User._id;

    const newVideo = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnailFile.url,
        title,
        description,
        duration,
        views,
        isPublished,
        owner: user._id,
    });

    const uploadedVideo = await Video.findById(newVideo._id)
    console.log(uploadedVideo);
})

export { uploadVideo };