import { asyncHandler } from "../utils/asyncHandler";



const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description, video } = req.body;
    const { userId } = req.user;
})