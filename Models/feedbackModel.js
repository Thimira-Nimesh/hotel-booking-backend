import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  feedbackId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Feedback = mongoose.model("feedbacks", feedbackSchema);
export default Feedback;
