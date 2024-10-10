import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  roomType: {
    type: String,
  },
  roomBoy: {
    type: String,
  },
  cleanBy: {
    type: String,
  },
  bookingStatus: {
    type: String,
    enum: ["Available", "Booked", "Out of Service"],
    default: "Available",
  },
});

const Room = mongoose.model("rooms", roomSchema);
export default Room;
