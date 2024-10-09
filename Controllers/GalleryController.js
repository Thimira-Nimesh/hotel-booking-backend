import Gallery from "../Models/galleryModel.js";

export function postGallery(req, res) {
  const user = req.user;

  if (user == null) {
    res.status(403).json({
      message: "Please login before creating gallery item",
    });
    return;
  }

  if (user?.userType != "admin") {
    res.status(403).json({
      message: "You do not have permission to create gallery item",
    });
    return;
  }

  const gallery = req.body;
  const newGallery = new Gallery(gallery);
  newGallery
    .save()
    .then(() => {
      res.json({
        message: "Gallery Created Successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Gallery Creation Failed",
      });
    });
}

export function getGallery(req, res) {
  Gallery.find()
    .then((gallerylist) => {
      res.json({
        message: gallerylist,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Gallery List Error",
      });
    });
}
