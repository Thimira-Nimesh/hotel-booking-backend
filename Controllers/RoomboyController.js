import Roomboy from "../Models/Roomboy.js";

export function getRoomboys(req, res) {
  Roomboy.find()
    .then((roomBoyList) => {
      res.json({
        message: roomBoyList,
      });
    })
    .catch(() => {
      res.json({
        message: "Roomboy List Error",
      });
    });
}

export function postRoomBoys(req, res) {
  const roomboy = req.body;
  console.log(roomboy);

  const newRoomboy = new Roomboy(roomboy);
  newRoomboy
    .save()
    .then(() => {
      res.json({
        message: "Roomboy Created Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Roomboy Creation Failed",
      });
    });
}

export function deleteRoomBoys(req, res) {
  const email = req.body.email;
  Roomboy.deleteOne({ email: email })
    .then(() => {
      res.json({
        message: "Roomboy Deleted Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Roomboy Deletion Failed",
      });
    });
}

export function updateRoomBoys(req, res) {
  const email = req.body.email;
  Roomboy.findOneAndUpdate({ email: email })
    .then(() => {
      res.json({
        message: "Roomboy Updated Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Roomboy Updation Failed",
      });
    });
}
