import bodyParser from "body-parser";
import express from "express";
import userRouter from "./Routes/userRouter.js";
import roomsRouter from "./Routes/roomsRouter.js";
import roomboyRouter from "./Routes/RoomboyRouter.js";
import galleryRouter from "./Routes/GalleryRoutes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

const connectionString =
  "mongodb+srv://tester2:123@cluster0.x152r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token != null) {
    jwt.verify(token, "secretkey", (err, decoded) => {
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

// app.use((req,res,next)=>{
//   const token = req.header("Authorization")?.replace("Bearer ","");

//   if(token!=null){
//     jwt.verify(token,"secretkey",(err,decoded)=>{
//       if(decoded!=null){
//         req.body.user = decoded;
//         next()
//       }else{
//         next()
//       }
//     })
//   }else{
//     next()
//   }
// })

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

app.listen(5000, (req, res) => {
  console.log("Server is Running on port 5000");
});
