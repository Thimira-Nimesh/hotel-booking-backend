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

// export function deleteRooms(req, res) {

//   const room = req.params.roomId;
//   Room.deleteOne({
//     roomId: room,
//   })
//     .then(() => {
//       res.json({
//         message: "Room Deleted Successfully",
//       });
//     })
//     .catch(() => {
//       res.json({
//         message: "Room Deletion Failed",
//       });
//     });
// }

export function deleteRooms(req, res) {
  const roomId = req.params.roomId;

  Room.findOne({ roomId: roomId })
    .then((room) => {
      if (!room) {
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
