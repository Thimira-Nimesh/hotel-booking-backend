import express from "express";
import {
  postGallery,
  getGallery,
  deleteGallery,
  updateGallery,
} from "../Controllers/GalleryController.js";

const galleryRouter = express.Router();

galleryRouter.get("/", getGallery);
galleryRouter.post("/", postGallery);
galleryRouter.delete("/:galleryId", deleteGallery);
galleryRouter.put("/:galleryId", updateGallery);

export default galleryRouter;
