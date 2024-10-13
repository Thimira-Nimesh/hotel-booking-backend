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

export function postUser(req, res) {
  const user = req.body;

  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, 10);

  user.password = passwordHash;

  console.log(user);

  const newUser = new User(user);
  newUser
    .save()
    .then(() => {
      res.json({
        message: "User Created Successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "User Creation Failed",
      });
    });
}

export function loginUser(req, res) {
  const credentials = req.body;

  User.findOne({ email: credentials.email }).then((user) => {
    if (user == null) {
      res.json({
        message: "user not found",
      });
    } else {
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
    }
  });
}
