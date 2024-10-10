import express from "express";
import {
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
} from "../Controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", postCategory);
categoryRouter.delete("/", deleteCategory);
categoryRouter.put("/", updateCategory);

export default categoryRouter;
