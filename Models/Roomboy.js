import mongoose from "mongoose";

const roomboySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const Roomboy = mongoose.model("Roomboy", roomboySchema);
export default Roomboy;
