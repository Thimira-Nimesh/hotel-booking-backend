import express from "express";
import {
  getFeedback,
  postFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackByEmail,
} from "../Controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/", getFeedback);
feedbackRouter.get("/", getFeedbackByEmail);
feedbackRouter.post("/", postFeedback);
feedbackRouter.put("/", updateFeedback);
feedbackRouter.delete("/:feedbackId", deleteFeedback);

export default feedbackRouter;
