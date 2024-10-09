import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    Required: true,
  },
  description: {
    type: String,
    Required: true,
  },
  price: {
    type: String,
    Required: true,
  },
});

const Category = mongoose.model("categories", categorySchema);
export default Category;
