import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    // now it will only allow requests form CORS_ORIGIN RUL specified in .env file.
    origin: process.env.CORS_ORIGIN,
    credentials: true, // allow cookies to be sent in cross-origin requests
}));


app.use(express.json({limit: "16kb"})); // to parse JSON request bodies
app.use(express.urlencoded({extended: true, limit: "16kb"})); // to parse URL-encoded request bodies
app.use(express.static("public")); // to serve static files from the "public" directory
app.use(cookieParser()); // to parse cookies from incoming requests

// import routes
import usersRoutes from "./routes/users.routes.js";

// routes declaration
app.use("/api/v1/users", usersRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to VideoTube Backend!");
});



export { app };