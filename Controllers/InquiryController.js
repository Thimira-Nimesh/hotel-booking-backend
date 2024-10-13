import Inquiry from "../Models/inquiryModel.js";

export function getInquiery(req, res) {
  const user = req.user;
  if (!user) {
    res.json({
      message: "You need to Login",
    });
    return;
  }
  if (user.userType != "admin") {
    res.json({
      message: "You do not have permission",
    });
  } else {
    Inquiry.find().then((inlist) => {
      res.json({
        message: inlist,
      });
    });
  }
}

export function getInquieryById(req, res) {
  const user = req.user;
  if (!user) {
    res.json({
      message: "You need to Login",
    });
    return;
  }
  if (user.userType != "admin") {
    res.json({
      message: "You do not have permission",
    });
  } else {
    const inquiryId = req.params.inquiryId;
    Inquiry.findOne({ inquiryId: inquiryId }).then((result) => {
      if (!result) {
        res.json({
          message: "Invalid Inquiry Id",
        });
      } else {
        res.json({
          message: result,
        });
      }
    });
  }
}

export function postInquiery(req, res) {
  const user = req.user;
  if (!user) {
    res.json({
      message: "You need to Login",
    });
    return;
  }

  const inquiery = req.body;

  console.log(inquiery);
  const newInquiery = new Inquiry(inquiery);

  newInquiery
    .save()
    .then(() => {
      res.json({
        message: "Your inquiry added successfully...",
      });
    })
    .catch((err) => {
      res.json({
        message: "Inquiery Adding Failed..",
        err,
      });
    });
}

export function updateInquiery(req, res) {
  const user = req.user;
  if (!user) {
    res.json({
      message: "You need to Login",
    });
  } else {
    const inquiryId = req.params.inquiryId;
    Inquiry.findOneAndUpdate({ inquiryId: inquiryId })
      .then((result) => {
        if (!result) {
          res.json({
            message: "Invalid InquiryId...",
          });
        } else {
          res.json({
            message: "Your inquiry updated successfully...",
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "Inquiery updating Failed..",
        });
      });
  }
}

export function deleteInquiery(req, res) {
  const user = req.user;
  if (!user) {
    res.json({
      message: "You need to Login",
    });
  } else {
    const inquiryId = req.params.inquiryId;
    Inquiry.findOne({ inquiryId: inquiryId })
      .then((result) => {
        if (!result) {
          res.json({
            message: "Invalid Inquiry Id...",
          });
        } else {
          Inquiry.deleteOne({ inquiryId: inquiryId }).then(() => {
            res.json({
              message: "Inquiery Deleted Successfully",
            });
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "Inquiery Adding Failed..",
          err,
        });
      });
  }
}
