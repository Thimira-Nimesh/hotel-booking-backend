import express from "express";
import {
  postUser,
  loginUser,
  getUser,
  bandUsers,
  getUserList,
  getUserByname,
  deleteUserByname,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/", getUser);
userRouter.get("/userlist", getUserList);
userRouter.get("/:firstName", getUserByname);
userRouter.delete("/:firstName", deleteUserByname);
userRouter.put("/", bandUsers);
userRouter.post("/login", loginUser);

export default userRouter;
