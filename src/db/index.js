import mongoose from "mongoose";


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB", connectionInstance.connection.host);
        console.log(connectionInstance);
    } catch (error) {
        console.error("Error while connecting to MongoDB", error);
        process.exit(1); // exit the app if connection fails
    }
}

export default connectDB;