import Feedback from "../Models/feedbackModel.js";
import { isAdminValid, isCustomerValid } from "./userController.js";

export function getFeedback(req, res) {
  Feedback.find()
    .then((feedbacklist) => {
      res.json({
        message: feedbacklist,
      });
    })
    .catch(() => {
      res.json({
        message: "Feedbacklist Error",
      });
    });
}

export function getFeedbackByEmail(req, res) {
  const user = req.user;
  if (!user) {
    res.json({
      message: "You need to login",
    });
    return;
  }
  Feedback.find({ email: user.email }).then((result) => {
    if (!result) {
      res.json({
        message: "cannot find any feedbacks...",
      });
    } else {
      res.json({
        message: result,
      });
    }
  });
}

export function postFeedback(req, res) {
  if (!isCustomerValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }

  const feedback = req.body;
  const newFeed = new Feedback(feedback);
  newFeed
    .save()
    .then((createdfeedback) => {
      res.json({
        message: "Feedback Added Successfully",
        feedback: createdfeedback,
      });
    })
    .catch(() => {
      res.json({
        message: "Feedback Added Failure...",
      });
    });
}

export function updateFeedback(req, res) {
  const user = req.user;

  if (user.userType != "admin") {
    res.json({
      message: "You Don'thave permission to Approve Feedbacks",
    });
  } else {
    Feedback.findOneAndUpdate(req.body)
      .then(() => {
        res.json({
          message: "Feedback Approved",
        });
      })
      .catch(() => {
        res.json({
          message: "Feedback Approved failure...",
        });
      });
  }
}

export function deleteFeedback(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }

  const feedback = req.params.feedbackId;
  Feedback.deleteOne({ feedbackId: feedback.feedbackId })
    .then(() => {
      res.json({
        message: "Feedback Deleted Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Feedback Deletion error....",
      });
    });
}
