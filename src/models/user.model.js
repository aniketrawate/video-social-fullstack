import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudnary URL will be used here after uploading the avatar tere
            required: true
        },
        coverImage: {
            type: String // cloudnary URL
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectID,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps: true});

// Hash the password before saving the user document
userSchema.pre("save", async function (next){ // dont wrte arrow function here because we need to use this keyword.
    if(!this.isModified("password")) return next(); // if password is not modified then we will not hash it again and just move to next middleware
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare the provided password with the hashed password in the database
userSchema.methods.isValidPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};


// Method to generate access token for user
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            userId: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}
// Method to generate refresh token for user
userSchema.methods.generateRefreshToken = function (){
return jwt.sign(
    {
        userId: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    } 
)
}


export const User = mongoose.model("User", userSchema);