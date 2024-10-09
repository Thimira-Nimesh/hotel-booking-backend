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
});

const Room = mongoose.model("rooms", roomSchema);
export default Room;
