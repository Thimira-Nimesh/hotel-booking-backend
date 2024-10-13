import express from "express";
import {
  getRooms,
  postRooms,
  updateRooms,
  deleteRooms,
  getRoomById,
} from "../Controllers/roomController.js";

const roomsRouter = express.Router();

roomsRouter.get("/", getRooms);
roomsRouter.get("/:roomId", getRoomById);
roomsRouter.post("/", postRooms);
roomsRouter.put("/", updateRooms);
roomsRouter.delete("/:roomId", deleteRooms);

export default roomsRouter;
