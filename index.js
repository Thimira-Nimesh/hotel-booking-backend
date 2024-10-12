import bodyParser from "body-parser";
import express from "express";
import userRouter from "./Routes/userRouter.js";
import roomsRouter from "./Routes/roomsRouter.js";
import roomboyRouter from "./Routes/RoomboyRouter.js";
import galleryRouter from "./Routes/GalleryRoutes.js";
import categoryRouter from "./Routes/CategoryRoutes.js";
import bookingRouter from "./Routes/BookingsRoutes.js";
import feedbackRouter from "./Routes/FeedbackRoutes.js";
import inquiryRouter from "./Routes/InquiryRoutes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token != null) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use("/api/users", userRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/roomboys", roomboyRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/category", categoryRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/inquiries", inquiryRouter);

app.listen(5000, (req, res) => {
  console.log("Server is Running on port 5000");
});
