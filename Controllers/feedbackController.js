import Feedback from "../Models/feedbackModel.js";

export function searchFeedback(req, res) {
  const feed = req.body;
  Feedback.findOne({ feedbackId: feed.feedbackId }).then((result) => {
    if (result == null) {
      res.json({
        message: "feedback not found",
      });
    } else {
      res.json({
        message: "Feedback found",
        feedback: result,
      });
    }
  });
}

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

export function updateFeedback(req, res) {
  const feedback = req.body;
  const user = req.user;

  if (user.userType != "admin") {
    res.json({
      message: "You Don'thave permission to Approve Feedbacks",
    });
  } else {
    Feedback.findOneAndUpdate({ approved: feedback.approved })
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

export function postFeedback(req, res) {
  const feedback = req.body;
  const user = req.user;
  if (user == null) {
    res.json({
      message: "You need to login before add feedback",
    });
    return;
  }
  if (!feedback.approved) {
    res.json({
      message: "Your Feedback Declined by Admin",
    });
  } else {
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

  //   const feed = req.body;
  //   const newFeed = new Feedback(feed);
  //   newFeed
  //     .save()
  //     .then(() => {
  //       res.json({
  //         message: "New Feedback Added",
  //       });
  //     })
  //     .catch(() => {
  //       res.json({
  //         message: "Feedback adding failure",
  //       });
  //     });
}

export function deleteFeedback(req, res) {
  const feedback = req.body;
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
