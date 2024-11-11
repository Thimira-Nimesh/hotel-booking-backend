import Bookings from "../Models/bookingModel.js";
import { isAdminValid } from "./userController.js";
import { isCustomerValid } from "./userController.js";

export function getBookings(req, res) {
  const user = req.body.user;
  console.log(user);
  if (!user) {
    res.json({
      message: "You need to Login before view bookings",
    });
    return;
  }
  if (user.userType == "admin") {
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
  } else if (user.userType == "customer") {
    Bookings.find({ email: user.email })
      .then((result) => {
        res.json({
          message: result,
        });
      })
      .catch((err) => {
        res.json({
          message: "Booking list Error...",
          err,
        });
      });
  }
}

export function getBookingsById(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "unAuthorized",
    });
    return;
  }

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

export function postBookings(req, res) {
  // if (!isCustomerValid(req)) {
  //   res.json({
  //     message: "Unauthorized",
  //   });
  //   return;
  // }

  const startingId = 1000;
  Bookings.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1;
      const newBookings = new Bookings({
        bookingId: newId,
        roomId: req.body.roomId,
        email: req.body.user.email,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
      });
      newBookings
        .save()
        .then((result) => {
          res.json({
            message: "Booking Successfull",
            result,
          });
        })
        .catch(() => {
          res.json({
            message: "Booking Failure...Try Again",
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Booking Failure...Try Again",
        err,
      });
    });
}

export function deleteBookings(req, res) {
  const user = req.body.user;
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
  const user = req.body.user;

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

export function getBook(req, res) {
  if (!isAdminValid(res)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }
  const bookId = req.params.bookingId;
  Bookings.findOne({ bookingId: bookId }).then((result) => {
    if (!result) {
      res.json({
        message: "Invalid BookingId",
      });
    } else {
      res.json({
        message: result,
      });
    }
  });
}

export function retrieveBookingByDate(req, res) {
  const checkInDate = req.body.checkInDate;
  const checkOutDate = req.body.checkOutDate;
  console.log(checkInDate);
  console.log(checkOutDate);

  Bookings.find({
    checkInDate: {
      $gt: new Date(checkInDate),
    },
    checkOutDate: {
      $lt: new Date(checkOutDate),
    },
  })
    .then((result) => {
      res.json({
        message: "Filtered Successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to get Filtered Bookings",
        err,
      });
    });
}
