import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  bookingId: {
    type: Number,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  guest: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
});

const Bookings = mongoose.model("Bookings", bookingSchema);
export default Bookings;
