import mongoose from "mongoose";

const inquirySchema = mongoose.Schema({
  inquiryId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
});

const Inquiry = mongoose.model("inquiries", inquirySchema);
export default Inquiry;
