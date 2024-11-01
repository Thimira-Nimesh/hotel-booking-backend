import Category from "../Models/categoryModel.js";
import { isAdminValid } from "./userController.js";

export function getCategory(req, res) {
  Category.find()
    .then((categories) => {
      res.json({
        categories,
      });
    })
    .catch((err) => {
      res.json({
        message: "categorylist error",
        err,
      });
    });
}

export function postCategory(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  const category = req.body;

  const newCategory = new Category(category);
  newCategory
    .save()
    .then((result) => {
      res.json({
        message: "New Category Added",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Category adding Failure",
        error: err,
      });
    });
}

export function deleteCategory(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  const name = req.params.name;
  console.log(name);
  Category.deleteOne({ name: name })
    .then((result) => {
      res.json({
        result,
        message: "Category Deleted Successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
}

export function getCategoryByName(req, res) {
  const name = req.params.name;

  Category.findOne({ name: name })
    .then((result) => {
      if (result == null) {
        res.json({
          message: "Cannot find the Category",
        });
      } else {
        res.json({
          message: "Category Found",
          result: result,
        });
      }
    })
    .catch((err) => {
      req.json({
        message: "Category Error",
        err,
      });
    });
}

export function updateCategory(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  const name = req.params.name;

  Category.findOneAndUpdate({ name: name }, req.body)
    .then(() => {
      res.json({
        message: "Category Updated Successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Category update failed",
        error: err,
      });
    });
}
