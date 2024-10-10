import Category from "../Models/categoryModel.js";

export function getCategory(req, res) {
  Category.find()
    .then((categorylist) => {
      res.json({
        message: categorylist,
      });
    })
    .catch(() => {
      res.json({
        message: "categorylist error",
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

  if (user?.userType != "admin") {
    res.status(403).json({
      message: "You do not have permission to create a Category",
    });
    return;
  }

  const category = req.body;

  const newCategory = new Category(category);
  newCategory
    .save()
    .then(() => {
      res.json({
        message: "New Category Added",
      });
    })
    .catch(() => {
      res.json({
        message: "Category adding Failure",
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
    const category = req.body;
    Category.deleteOne({ name: category.name })
      .then(() => {
        res.json({
          message: "Category Deleted Successfully",
        });
      })
      .catch(() => {
        res.json({
          message: "Category Deletion Failed",
        });
      });
  }
}

export function updateCategory(req, res) {
  const user = req.user;
  if (user == null) {
    res.status(404).json({
      message: "You need to Login before update category",
    });
    return;
  }

  if (user?.userType != "admin") {
    res.status(403).json({
      message: "You do not have permission to update categories",
    });
  } else {
    const category = req.body;
    Category.findOneAndUpdate({ name: category.name })
      .then(() => {
        res.json({
          message: "Category Updated Successfully",
        });
      })
      .catch(() => {
        res.json({
          message: "Category updation Failed",
        });
      });
  }
}
