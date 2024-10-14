import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  bookingId: {
    type: Number,
    required: true,
    unique: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  reason: {
    type: String,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Bookings = mongoose.model("Bookings", bookingSchema);
export default Bookings;
