import express from "express";
import {
  postUser,
  loginUser,
  getUser,
  bandUsers,
  getUserById,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.put("/", bandUsers);
userRouter.post("/login", loginUser);

export default userRouter;
