import express from "express";
import UserModel from "../services/db/models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// *******************REGISTER********************
authRouter.post("/register", async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    // crypto-js packace script to encrypt password.
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default authRouter;