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

  // *************** GET SPECIFIC USER ********************
usersRouter.get("/find/:id", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // DELETE
usersRouter.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  });


  // GET USER STATS
usersRouter.get("/stats", async (req, res)=>{
    // today date
   const today = new Date();
     // if I subtract one year from today I'm gonna get a year before, so the last year.
   const lastYear = today.setFullYear(today.setFullYear() - 1);
 
   const monthArray = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];
 
   // I can find total users per month
   // to find total users per month I should aggregate the users per month
   try {
     const data = await User.aggregate([
       // function to find the month
       {
         $project: {
           // is going to look at created at and find the month
           // if it's January is gonna give us 1, it's February is gonna give us 2, etc
           month: { $month: "$createdAt" }, 
         },
       },
       // function to group by month
       {
         $group: {
           _id: "$month",
           // return total users per month
           total: { $sum: 1 },
         },
       },
     ]);
     // return data
     res.status(200).json(data)
   } catch (err) {
     res.status(500).json(err);
   }
 })

export default usersRouter;
