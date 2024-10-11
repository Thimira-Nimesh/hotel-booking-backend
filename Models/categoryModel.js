import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    Required: true,
    unique: true,
  },

  price: {
    type: Number,
    Required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    Required: true,
  },
  image: {
    type: String,
  },
});

const Category = mongoose.model("categories", categorySchema);
export default Category;
