import {
  getRoomboys,
  postRoomBoys,
  deleteRoomBoys,
  updateRoomBoys,
} from "../Controllers/RoomboyController.js";
import express from "express";

const roomboyRouter = express.Router();

roomboyRouter.get("/", getRoomboys);
roomboyRouter.post("/", postRoomBoys);
roomboyRouter.delete("/", deleteRoomBoys);
roomboyRouter.put("/", updateRoomBoys);

export default roomboyRouter;
