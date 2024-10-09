import express from "express";
import { postUser, loginUser, getUser } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/", getUser);
userRouter.post("/login", loginUser);

export default userRouter;
