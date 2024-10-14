import express from "express";
import {
  getRooms,
  postRooms,
  updateRooms,
  deleteRooms,
  getRoomById,
  getRoomsByCategory,
} from "../Controllers/roomController.js";

const roomsRouter = express.Router();

roomsRouter.get("/", getRooms);
roomsRouter.get("/:category", getRoomsByCategory);
roomsRouter.get("/:roomId", getRoomById);
roomsRouter.post("/", postRooms);
roomsRouter.put("/:roomId", updateRooms);
roomsRouter.delete("/:roomId", deleteRooms);

export default roomsRouter;
