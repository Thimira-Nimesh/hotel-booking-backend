import express from "express";
import { postGallery, getGallery } from "../Controllers/GalleryController.js";

const galleryRouter = express.Router();

galleryRouter.get("/", getGallery);
galleryRouter.post("/", postGallery);

export default galleryRouter;
