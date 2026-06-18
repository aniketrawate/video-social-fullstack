import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// i think here is this function is logical error.
// we are deleting the file form the server if it fail to upload to the cloudinary.
// and if it upload successfully then we are not deleting the file form the server.
// i think we should delete file in both cases if upload is failed and upload is successfull.
// cause the whole prcess is happning in one https request and we are uploading file to the server and then uploading file to the cloudinary and then deleting file from the server.
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // check if file path is valid
        if (!localFilePath) console.log("File path not found.");
        // upload file to cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log("File uploaded to Cloudinary:", result.url); 
        fs.unlinkSync(localFilePath); // delete the local file if upload successfully, i think this is right.
        return result; // return the result of the upload (contains the URL and other details)
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the local file if upload fails
        console.error("Error uploading file to Cloudinary:", error);
        throw error; // rethrow the error to be handled by the caller
    }
}

export default uploadOnCloudinary;
