import express from "express";
import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB()
.then(() => { // then block will execute only after the connection to MongoDB is successful
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
})
// no need for catch block here as we are already handling connection errors inside connectDB function. If connection fails, the app will exit and server won't start.
