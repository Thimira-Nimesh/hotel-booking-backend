import express from "express";
import {
  getInquiery,
  getInquieryById,
  postInquiery,
  updateInquiery,
  deleteInquiery,
} from "../Controllers/InquiryController.js";

const inquiryRouter = express.Router();

inquiryRouter.get("/", getInquiery);
inquiryRouter.get("/:inquiryId", getInquieryById);
inquiryRouter.post("/", postInquiery);
inquiryRouter.put("/:inquiryId", updateInquiery);
inquiryRouter.delete("/:inquiryId", deleteInquiery);

export default inquiryRouter;
