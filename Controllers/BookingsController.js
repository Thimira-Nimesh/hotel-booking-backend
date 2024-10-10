import Bookings from "../Models/bookingModel.js";

export function getBookings(req, res) {
  const user = req.user;

  if (user == null) {
    res.json({
      message: "You need to login before view bookingList",
    });
    return;
  }

  if (user.userType != "admin") {
    res.json({
      message: "You do not have permission to view booking list",
    });
    return;
  } else {
    Bookings.find()
      .then((bookingsList) => {
        res.json({
          message: bookingsList,
        });
      })
      .catch(() => {
        res.json({
          message: "User BookingList error",
        });
      });
  }
}

export function postBookings(req, res) {
  const user = req.user;

  if (user == null) {
    res.status(403).json({
      message: "You need to Login before make a booking",
    });
  } else {
    const bookings = req.body;
    const newBookings = Bookings(bookings);

    newBookings
      .save()
      .then(() => {
        res.json({
          message: "Booking Successfull",
        });
      })
      .catch(() => {
        res.json({
          message: "Booking Failure...Try Again",
        });
      });
  }
}

export function updateBookings(req, res) {
  res.json({
    message: "update Booking",
  });
}

export function deleteBookings(req, res) {
  res.json({
    message: "delete Booking",
  });
}
