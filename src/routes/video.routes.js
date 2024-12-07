import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadVideo } from "../controllers/video.controller.js";


const router = Router()

router.route("/uplode-video").post(upload.fields(
    [
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnailFile",
            maxCount: 1,
        }
    ]
), uploadVideo) 

export default router