import User from "../Models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Otp from "../Models/otp.js";
dotenv.config();

// export function getUser(req, res) {
//   const user = req.body.user;
//   console.log(user);
//   if (!user) {
//     res.json({
//       message: "User not found",
//     });
//   } else {
//     res.json({
//       message: "message",
//       user,
//     });
//   }
// }
export function getUserList(req, res) {
  // Extract pageSize and pageNumber from query parameters
  const pageSize = parseInt(req.body.pageSize, 10) || 10; // Default page size is 10
  const pageNumber = parseInt(req.body.pageNumber, 10) || 1; // Default page number is 1

  // Calculate the skip and limit values for pagination
  const skip = (pageNumber - 1) * pageSize;

  User.find()
    .skip(skip) // Skip the documents for pagination
    .limit(pageSize) // Limit the documents to the page size
    .then((userlist) => {
      User.countDocuments().then((totalCount) => {
        res.json({
          message: "Users Found",
          userlist: userlist,
          pagination: {
            currentPage: pageNumber,
            pageSize: pageSize,
            totalUsers: totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
          },
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "User List Error",
        error: error.message,
      });
    });
}

export function getUserById(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }
  const id = req.params.id;
  User.findById(id).then((res) => {
    res.json({
      message: "User Found",
      res,
    });
  });
}

export function postUser(req, res) {
  const user = req.body;

  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, 10);

  user.password = passwordHash;

  console.log(user);

  const newUser = new User(user);
  newUser
    .save()
    .then((result) => {
      //1000-9999 random number
      const otp = Math.floor(1000 + Math.random() * 9000);
      const newOtp = new Otp({
        email: user.email,
        otp: otp,
      });
      newOtp.save().then(() => {
        sendOtpEmail(user.email, otp);
        res.json({
          message: "User Created Successfully",
          result,
        });
      });
    })
    .catch((e) => {
      res.json({
        message: "User Creation Failed",
        e,
      });
    });
}

export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email }).then((user) => {
    console.log(user);
    if (user == null) {
      res.json({
        message: "user not found",
      });
      return;
    }

    if (user.disabled == true) {
      res.json({
        message: "User Disabled..Cannot Login",
      });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      res.json({
        message: "Password is Incorrect",
      });
    } else {
      const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "40h",
      });

      res.json({
        message: "user Found",
        user: user,
        token: token,
      });
    }
  });
}

export function isAdminValid(req) {
  const user = req.body.user;
  if (!user) {
    return false;
  }
  if (user.userType != "admin") {
    return false;
  }
  return true;
}

export function isCustomerValid(req) {
  const user = req.body.user;
  if (!user) {
    return false;
  }
  if (user.userType != "customer") {
    return false;
  }
  return true;
}

export function bandUsers(req, res) {
  if (!isAdminValid(req)) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }
  const email = req.user.email;

  User.findOneAndUpdate({ email: email }, req.body)
    .then((result) => {
      res.json({
        message: "User Status Updated",
        result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Disable Error",
        err,
      });
    });
}

export function deleteUser(req, res) {
  if (!isAdminValid) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }

  const user = req.body.user;
  User.deleteOne({ email: user.email }).then(() => {
    res.json({
      message: "User Deleted Successfully",
    });
  });
}

export function getUserByname(req, res) {
  const firstName = req.params.firstName;
  User.findOne({ firstName: firstName }).then((result) => {
    if (!result) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json({
        result,
      });
    }
  });
}

export function deleteUserByname(req, res) {
  const firstName = req.params.firstName;
  User.deleteOne({ firstName: firstName }).then(() => {
    res.json({
      message: "User Deleted Successfully",
    });
  });
}

export function sendOtpEmail(email, otp) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tnimesh12345@gmail.com",
      pass: "tmkgqrkxklhezano",
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });

  const message = {
    from: "tnimesh12345@gmail.com",
    to: email,
    subject: "OTP Validation",
    text: "Your OTP code is " + otp,
  };

  transport.sendMail(message, (err, info) => {
    if (!err) {
      console.log(info);
    } else {
      console.log(err);
    }
  });
}

export function validateOtp(req, res) {
  const otp = req.body.otp;
  const email = req.body.email;

  Otp.find({ email: email })
    .sort({ date: -1 })
    .then((otpList) => {
      if (otpList.length == 0) {
        res.json({
          message: "Invalid OTP..",
        });
      } else {
        const latestOtp = otpList[0];
        if (latestOtp.otp == otp) {
          User.findOneAndUpdate({ email: email }, { emailVarified: true }).then(
            () => {
              res.json({
                message: "User email verified successfully..",
              });
            }
          );
        } else {
          res.json({
            message: "Invalid OTP..",
          });
        }
      }
    });
}
