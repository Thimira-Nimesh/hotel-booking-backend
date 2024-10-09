import express from "express";
import {
  getRooms,
  postRooms,
  updateRooms,
  deleteRooms,
} from "../Controllers/roomController.js";

const roomsRouter = express.Router();

roomsRouter.get("/", getRooms);
roomsRouter.post("/", postRooms);
roomsRouter.put("/", updateRooms);
roomsRouter.delete("/", deleteRooms);

export default roomsRouter;
