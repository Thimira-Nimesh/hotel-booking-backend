import express from "express";
import {
  postGallery,
  getGallery,
  deleteGallery,
} from "../Controllers/GalleryController.js";

const galleryRouter = express.Router();

galleryRouter.get("/", getGallery);
galleryRouter.post("/", postGallery);
galleryRouter.delete("/:galleryId", deleteGallery);

export default galleryRouter;
