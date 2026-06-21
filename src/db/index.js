import mongoose from "mongoose";



const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: process.env.DB_NAME
        });
        console.log("Connected to MongoDB", connectionInstance.connection.host);
    } catch (error) {
        console.error("Error while connecting to MongoDB", error);
        process.exit(1); // exit the app if connection fails
    }
}

export default connectDB;