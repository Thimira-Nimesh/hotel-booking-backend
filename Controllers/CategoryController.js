import Category from "../Models/categoryModel.js";

export function getCategory(req, res) {
  Category.find()
    .then((categorylist) => {
      res.json({
        message: categorylist,
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
  const user = req.user;

  if (user == null) {
    res.status(403).json({
      message: "Login before create a Category",
    });
    return;
  }

  if (user.userType != "admin") {
    res.status(403).json({
      message: "You do not have permission to create a Category",
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
  const user = req.user;

  if (user == null) {
    res.status(403).json({
      message: "You need to login before delete category",
    });
    return;
  }

  if (user.userType != "admin") {
    res.status(403).json({
      message: "You don't have permission to Delete Category",
    });
    return;
  } else {
    const name = req.params.name;
    Category.deleteOne({ name: name })
      .then(() => {
        res.json({
          message: "Category Deleted Successfully",
        });
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });
  }
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
  const user = req.user;

  if (user == null) {
    return res.status(404).json({
      message: "You need to Login before updating category",
    });
  }

  if (user.userType !== "admin") {
    return res.status(403).json({
      message: "You do not have permission to update categories",
    });
  }

  const currentName = req.params.name;
  const newName = req.body.name;

  Category.findOne({ name: currentName })
    .then((category) => {
      if (!category) {
        return res.json({
          message: "Invalid Category..",
        });
      }

      Category.findOneAndUpdate(
        { name: currentName },
        { name: newName },
        { new: true }
      )
        .then((updatedCategory) => {
          res.json({
            message: "Category Updated Successfully",
            updatedCategory,
          });
        })
        .catch((err) => {
          res.json({
            message: "Category update failed",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Error finding category",
        error: err,
      });
    });
}
