import express from "express";
import {
  postUser,
  loginUser,
  getUser,
  bandUsers,
  getUserList,
  getUserByname,
  deleteUserByname,
  sendSampleEmail,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/:id", getUser);
userRouter.get("/userlist", getUserList);
userRouter.get("/:firstName", getUserByname);
userRouter.delete("/:firstName", deleteUserByname);
userRouter.put("/", bandUsers);
userRouter.post("/login", loginUser);
userRouter.post("/email", sendSampleEmail);

export default userRouter;
