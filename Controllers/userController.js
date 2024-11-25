import User from "../Models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export function getUser(req, res) {
  const user = req.body.user;
  console.log(user);
  if (!user) {
    res.json({
      message: "User not found",
    });
  } else {
    res.json({
      message: "message",
      user,
    });
  }
}

export function getUserList(req, res) {
  User.find()
    .then((userlist) => {
      res.json({
        userlist,
      });
    })
    .catch(() => {
      res.json({
        message: "User List Error",
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
      res.json({
        message: "User Created Successfully",
        result,
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

export function sendSampleEmail(req, res) {
  const email = req.body.email;

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
}
