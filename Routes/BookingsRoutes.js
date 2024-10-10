import express from "express";
import {
  getBookings,
  postBookings,
  updateBookings,
  deleteBookings,
} from "../Controllers/BookingsController.js";

const bookingRouter = express.Router();

bookingRouter.get("/", getBookings);
bookingRouter.post("/", postBookings);
bookingRouter.put("/", updateBookings);
bookingRouter.delete("/", deleteBookings);

export default bookingRouter;
