import express from "express";
import {
  getBookings,
  postBookings,
  updateBookings,
  deleteBookings,
  getBookingsById,
} from "../Controllers/BookingsController.js";

const bookingRouter = express.Router();

bookingRouter.get("/", getBookings);
bookingRouter.delete("/:bookingId", deleteBookings);
bookingRouter.get("/:bookingId", getBookingsById);
bookingRouter.post("/", postBookings);
bookingRouter.put("/:bookingId", updateBookings);

export default bookingRouter;
