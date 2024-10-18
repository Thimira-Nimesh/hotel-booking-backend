import Gallery from "../Models/galleryModel.js";
import { isAdminValid } from "./userController.js";

export function postGallery(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
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

export function updateGallery(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }
  const galleryId = req.params.galleryId;
  Gallery.findOneAndUpdate({ galleryId: galleryId }, req.body)
    .then((result) => {
      if (!result) {
        res.json({
          message: "Invalid GalleryId...",
        });
      } else {
        res.json({
          message: "Gallery Updated Successfully",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Gallery Error",
      });
    });
}

export function deleteGallery(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }
  const galleryId = req.params.galleryId;
  Gallery.DeleteOne({ galleryId: galleryId })
    .then((result) => {
      if (!result) {
        res.json({
          message: "Invalid GalleryId",
        });
      } else {
        res.json({
          message: "Gallery Deleted Successfully",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Gallery Deletion Error",
      });
    });
}
