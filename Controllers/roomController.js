import Room from "../Models/Rooms.js";

export function getRooms(req, res) {
  Room.find()
    .then((roomslist) => {
      res.json({
        List: roomslist,
      });
    })
    .catch(() => {
      res.json({
        message: "Rooms List Error",
      });
    });
}

export function postRooms(req, res) {
  const user = req.user;

  if (user == null) {
    res.status(404).json({
      message: "You need to login before Add Rooms",
    });
    return;
  }

  if (user?.userType != "admin") {
    res.status(403).json({
      message: "You don't have permission to add Rooms",
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

export function updateRooms(req, res) {
  res.json({
    message: "This is update Room function",
  });
}

export function deleteRooms(req, res) {
  const roomId = req.params.roomId;

  Room.findOne({ roomId: roomId })
    .then((room) => {
      if (room == null) {
        return res.status(404).json({
          message: "Invalid room ID. Room not found.",
        });
      }

      return Room.deleteOne({ roomId: roomId });
    })
    .then((deleteResult) => {
      res.json({
        message: "Room Deleted Successfully",
        deleteResult,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred during deletion.",
        error: error.message,
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
