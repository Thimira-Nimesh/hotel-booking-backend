import express from "express";
import {
  getRooms,
  searchRooms,
  postRooms,
  updateRooms,
  deleteRooms,
} from "../Controllers/roomController.js";

const roomsRouter = express.Router();

roomsRouter.get("/", getRooms);
roomsRouter.get("/search", searchRooms);
roomsRouter.post("/", postRooms);
roomsRouter.put("/", updateRooms);
roomsRouter.delete("/:roomId", deleteRooms);

export default roomsRouter;
