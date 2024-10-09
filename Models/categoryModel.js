import mongoose, { model } from "mongoose";

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

const Category = model(categorySchema, "categories");
export default Category;
