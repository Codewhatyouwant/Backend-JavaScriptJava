import { v2 as cloudinary } from 'cloudinary';

import fs from "fs"

// (async function () {

// Configuration


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary successfully:", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log("Error while uploading image on cloudinary:", error);
        fs.unlinkSync(localFilePath) // removed the locally saved file
    }
}

const uploadOnCloudinaryVideo = async (localFilePath)=> {
    try {
        if(!localFilePath) return null 
        const response = await cloudinary.uploader.upload(localFilePath,{

            resource_type: "video"

        })

        console.log("file is uploaded on cloudinary successfully:", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log("Error when uploading video on cloudinary in utils folder -> ", error);
        fs.unlinkSync(localFilePath) // removed the locally saved file
    }
}

const deleteVideoFromCloudinary = async(videoId)=>{
    try {
        if (!videoId) return null 
        const response = await cloudinary.uploader.destroy(videoId, {
            resource_type: "video"
        })
        console.log("Video is deleted from cloudinary successfully: ");
    } catch (error) {
        console.log("Video was not deleted -> ", error)
    }
}

const deleteImageFromCloudinary = async (imageId) => {
    try {
        if (!imageId) return null
        const response = await cloudinary.uploader.destroy(imageId, {
            resource_type: "image"
        })
        console.log("Image is deleted from cloudinary successfully: ");
    } catch (error) {
        console.log("Image was not deleted -> ", error)
    }
}


export { uploadOnCloudinary, uploadOnCloudinaryVideo, deleteVideoFromCloudinary, deleteImageFromCloudinary }



// // Upload an image
// const uploadResult = await cloudinary.uploader
//     .upload(
//         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
//     )
//     .catch((error) => {
//         console.log(error);
//     });

// console.log(uploadResult);
// })();