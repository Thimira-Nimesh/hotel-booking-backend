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

export function getBookingsById(req, res) {
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
    const bookingId = req.params.bookingId;
    Bookings.findOne({ bookingId: bookingId })
      .then((result) => {
        if (!result) {
          res.json({
            message: "Booking Id Does not Exist",
          });
        } else {
          res.json({
            message: result,
          });
        }
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

export function deleteBookings(req, res) {
  const user = req.user;
  if (user == null) {
    res.json({
      message: "You need to login",
    });
    return;
  }
  if (user.userType != "admin") {
    res.json({
      message: "You do not have permission",
    });
  } else {
    const bookingId = req.params.bookingId;
    Bookings.findOne({ bookingId: bookingId }).then((result) => {
      if (result == null) {
        res.json({
          message: "Invalid Booking Id...",
        });
      }
    });
    return Bookings.deleteOne({ bookingId: bookingId })
      .then((deleteresult) => {
        res.json({
          message: "booking Deleted successfully..",
          deleteresult,
        });
      })
      .catch((err) => {
        res.json({
          message: "err",
          err,
        });
      });
  }
}

export function updateBookings(req, res) {
  const user = req.user;

  if (!user) {
    return res.json({
      message: "You need to Login",
    });
  }

  if (user.userType !== "admin") {
    return res.json({
      message: "You do not have permission",
    });
  }

  const bookingId = req.params.bookingId;
  const newStatus = req.body.status;

  Bookings.findOne({ bookingId: bookingId })
    .then((result) => {
      if (!result) {
        return res.json({
          message: "Invalid booking Id...",
        });
      }

      Bookings.findOneAndUpdate(
        { bookingId: bookingId },
        { status: newStatus },
        { new: true } // Return the updated document
      )
        .then((updatedResult) => {
          res.json({
            message: "Booking status updated successfully",
            updatedResult,
          });
        })
        .catch((err) => {
          res.json({
            message: "Failed to update booking status.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Error finding booking.",
        error: err,
      });
    });
}
