import Room from "../Models/Rooms.js";
import { isAdminValid } from "./userController.js";

export function getRooms(req, res) {
  Room.find()
    .then((roomslist) => {
      res.json({
        roomslist,
      });
    })
    .catch(() => {
      res.json({
        message: "Rooms List Error",
      });
    });
}

export function getRoomById(req, res) {
  const roomId = req.params.roomId;
  Room.findOne({ roomId: roomId })
    .then((result) => {
      if (result == null) {
        res.json({
          message: "Room Does not exist..Invalid Room Id",
        });
      } else {
        res.json({
          message: "Room Found",
          result,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Room Id Error...",
        err,
      });
    });
}

export function postRooms(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unautorized",
    });
    return;
  }

  const room = req.body;
  console.log(room);
  const newRoom = new Room(room);
  newRoom
    .save()
    .then(() => {
      res.json({
        message: "Room Created Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Room Creation Failed",
      });
    });
}

export function deleteRooms(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unautorized",
    });
    return;
  }

  const roomId = req.params.roomId;
  Room.deleteOne({ roomId: roomId })
    .then(() => {
      res.json({
        message: "Room Deleted Successfully",
      });
    })
    .catch((err) => {
      res.json({ message: "Room deletion error.", err });
    });
}

export function updateRooms(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }
  const roomId = req.params.roomId;

  Room.findOneAndUpdate({ roomId: roomId }, req.body)
    .then(() => {
      res.json({
        message: "Room details Updated Successfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "Room updation Failed...",
        err,
      });
    });
}

export function getRoomsByCategory(req, res) {
  const category = req.params.category;
  Room.find({ category: category })
    .then((result) => {
      res.json({
        message: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error..",
        err,
      });
    });
}

export function getRoomsById(req, res) {
  const roomId = req.params.roomId;

  Room.find({ roomId: roomId })
    .then((result) => {
      if (result == null) {
        res.json({
          message: "Invalid RoomId.. Please try again..",
        });
      } else {
        res.json({
          result,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Room Loading Error..",
        err,
      });
    });
}
