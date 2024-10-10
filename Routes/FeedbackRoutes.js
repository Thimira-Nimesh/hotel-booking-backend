import express from "express";
import {
  getFeedback,
  searchFeedback,
  postFeedback,
  updateFeedback,
  deleteFeedback,
} from "../Controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/", getFeedback);
feedbackRouter.get("/search", searchFeedback);
feedbackRouter.post("/", postFeedback);
feedbackRouter.put("/", updateFeedback);
feedbackRouter.delete("/", deleteFeedback);

export default feedbackRouter;
