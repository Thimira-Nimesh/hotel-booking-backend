import express from "express";
import {
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getCategoryByName,
} from "../Controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.put("/:name", updateCategory);
categoryRouter.get("/", getCategory);
categoryRouter.post("/", postCategory);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.delete("/:name", deleteCategory);

export default categoryRouter;
