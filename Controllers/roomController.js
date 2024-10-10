import Room from "../Models/Rooms.js";

export function searchRooms(req, res) {
  const room = req.body;

  Room.findOne({ roomId: room.roomId }).then((result) => {
    if (result == null) {
      res.json({ message: "room not found" });
    } else {
      res.json({
        message: "Room Found",
        room: result,
      });
    }
  });
}

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
  const roomId = req.body.room;
  Room.deleteOne({
    roomId: roomId,
  })
    .then(() => {
      res.json({
        message: "Room Deleted Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Room Deletion Failed",
      });
    });
}
