// import files & packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Authroutes from "./routes/authRoute.js";
import { connectDB } from "./config/dbConfig.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// initialize the express app
const app = express();

// database connection
connectDB();

// built-in middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// third-party middleware
app.use(cors()); // enable CORS for all routes
app.use(cookieParser()); // for parsing cookies

// Routes
app.use("/api/auth", Authroutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler); 

// export the app
export default app;
