import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
