import express from "express";
import {
  postUser,
  loginUser,
  getUser,
  bandUsers,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/", getUser);
userRouter.put("/", bandUsers);
userRouter.post("/login", loginUser);

export default userRouter;
