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
      message: "You don not have permission to create a Category",
    });
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
