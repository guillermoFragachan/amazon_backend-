import express from "express";
import UserModel from "../db/models/User.js";
import verify from "../auth/verifyToken.js";

const usersRouter = express.Router();

// *************** UPDATE ********************
usersRouter.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

// *************** GET ALL USERS ************************
// if no query is sent, is just gonna return ALL users. But if you add for example "/?new=true", is gonna return only last 10 users
usersRouter.get("/", verify, async (req, res) => {
    const query = req.query.new; // (or new users) new is the key
    if (req.user.isAdmin) {
      try {
        // if there is a query (which means if we are fetching only new users), is gonna fetch only last 10 users
        // if there is no query, is gonna fetch all users
        const users = query
          ? await UserModel.find().sort({ _id: -1 }).limit(10)
          : await UserModel.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  });

export default usersRouter;
