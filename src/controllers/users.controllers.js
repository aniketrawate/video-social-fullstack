import asyncHandler from '../utils/asyncHandler.js';
import { ApiErrorHandler } from '../utils/apiErrorHandler.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponseHandler.js';

const registerUser = asyncHandler( async (req, res) => {
    // get required user data from frontend ie postman for now.
    // validate the data. at least check if the required fields are present and valid.
    // check if user already exists in the database. if yes, return "usser already exists" error.
    // check for images and avatar are available in the request. 
    // upload the avatar to cloudinary and get the url of the uploaded image.
    // create a new user object with the data and the avatar url to store in MongoDB.
    // remove password and refreshToken from the user object before sending it to the frontend.
    // check if the user is created successfully in the database. if yes, return the user object to the frontend with a success message. else error message.
    // return response to frontend.

    // checking if request date is coming in the correct format and all required fields are present.
    const { fullName, email, username, password } = req.body;
    console.log("Registering user with data:", { fullName, email, username, password });

    // validate the text data. at least check if the required fields are present and valid.
    if(
        [fullName, email, username, password].some(field => field === undefined || field === null || field?.trim() === "")
    ) {
        throw new ApiErrorHandler(400, "All fields are required for user registration.");
    }

    // check if user already exists in the database. if yes, return "usser already exists" error.
    const existedUser = await User.findOne({ 
        $or: [{ email }, { username }]
    })

    if(existedUser){
        throw new ApiErrorHandler(409, "User with this email or username already exists.");
    }

    // check for images and avatar are available in the request.
    // we have acces of files because we are using multer middleware in the route handler for this controller. multer will parse the multipart/form-data and add the files to the req object as req.files.
    
    const avatarLocalPath = req.files?.avatar?.[0]?.path; // get the path of the uploaded avatar image from the request object in server. multer will store the uploaded file in the server's local storage and provide the path to it in req.files.avatar[0].path. we can use this path to upload the image to cloudinary.
    const coverLocalPath = req.files?.cover?.[0]?.path; // same for above but for cover image.(not cheacking for cover image because it is optional for user registration.)

    if(!avatarLocalPath) {
        throw new ApiErrorHandler(400, "Avatar image is required for user registration.");
    }

    // upload the avatar to cloudinary and get the url of the uploaded image.
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverLocalPath ? await uploadOnCloudinary(coverLocalPath) : null; // if cover image is present then upload it to cloudinary and get the url of the uploaded image. else set coverImage to null.

    if(!avatar || !avatar.url) {
        throw new ApiErrorHandler(500, "Failed to upload avatar image to cloudinary.");
    }
    
    // create a new user object with the data and the avatar url to store in MongoDB.
    const newUser = await User.create({
        fullName,
        email,
        username,
        password,
        avatar: avatar.url, // store the url of the uploaded avatar image in the user object.
        coverImage: coverImage?.url || null // store the url of the uploaded cover image in the user object. if cover image is not present then set it to null.
    });


    // remove password and refreshToken from the user object before sending it to the frontend.
    // i did not understand this part focuse on this. that how i am addressing current user and if name is same as new user then will all entries will be new user or it is just there untill the request is completed. i think it is just there until the request is completed. because we are not storing it in the database. so it will be lost after the request is completed.
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken"); // select all fields except password and refreshToken.
    
    // check if the user is created successfully in the database. if yes, return the user object to the frontend with a success message. else error message.
    if(!createdUser) {
        throw new ApiErrorHandler(500, "Failed to create user.");
    }
    
    // return response to frontend.
    return res.status(201).json(
        new ApiResponse(201, "User registered successfully.", createdUser)
    );

})

export { registerUser };