import express from "express";
import {
  getFeedback,
  postFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackById,
} from "../Controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/", getFeedback);
feedbackRouter.get("/", getFeedbackById);
feedbackRouter.post("/", postFeedback);
feedbackRouter.put("/", updateFeedback);
feedbackRouter.delete("/:feedbackId", deleteFeedback);

export default feedbackRouter;
