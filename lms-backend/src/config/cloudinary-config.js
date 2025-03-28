import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath, fileType="image")=>{
    try {
        if(!localFilePath){
            throw new Error("File not found");
        }

        const resourceType = fileType.startsWith("image") ? "image" 
                            : fileType.startsWith("video") ? "video"
                            : fileType === "pdf" ? "raw"
                            : "auto"; // Let Cloudinary decide
        
        const folder = fileType === "profile" ? "profiles"
                        : fileType.startsWith("image") ? "images"
                        : fileType.startsWith("video") ? "videos"
                        : fileType === "pdf" ? "documents"
                        : "uploads";
        
        const uploadResult = await cloudinary.uploader.upload(localFilePath,{
            resource_type:resourceType, folder
        });

        // console.log("Upload Result",uploadResult)

        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
        }

        return{
            success: true,
            public_id: uploadResult?.public_id,
            secure_url: uploadResult?.secure_url
        }

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        // Ensure local temp file is deleted if an error occurs
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return {
            success: false,
            message: error.message
        }
    }
};

export default uploadOnCloudinary;