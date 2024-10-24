import User from "../Models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export function getUser(req, res) {
  User.find()
    .then((usersList) => {
      res.json({
        list: usersList,
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
  const user = req.params.userId;
  User.findOne({ userId: user.userId }).then((resUser) => {
    if (!resUser) {
      res.json({
        message: "Invalid UserId...",
      });
    } else {
      res.json({
        message: resUser,
      });
    }
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
  const user = req.user;
  if (!user) {
    return false;
  }
  if (user.userType != "admin") {
    return false;
  }
  return true;
}

export function isCustomerValid(req) {
  const user = req.user;
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
