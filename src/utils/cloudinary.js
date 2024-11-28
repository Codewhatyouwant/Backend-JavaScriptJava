import { v2 as cloudinary } from 'cloudinary';

import fs from "fs"

// (async function () {

// Configuration


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadeOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploded successfully
        console.log("file is uploded on cloudnary successfully:", responce.url);
        fs.unlinkSync(localFilePath)
        return responce;
    } catch (error) {
        fs.unlinkSync(localFilePath) // removed the locally saved file
    }
}

export {uploadeOnCloudinary}



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