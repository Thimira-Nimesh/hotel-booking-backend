import express from "express";
import {
  getCategory,
  postCategory,
} from "../Controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", postCategory);

export default categoryRouter;
