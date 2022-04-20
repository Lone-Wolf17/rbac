import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { UserModel } from "./models/userModel";
import userRouter from "./routes/user";
import { connectDB } from "./util/dbHelper";
import { verifyToken } from "./util/jwtHelper";

// require("dotenv").config({
//   path: path.join(__dirname, "../.env"),
// });

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middlewares
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.json()); // body parser

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"] as string;
    const { userId, exp } = verifyToken(accessToken);

    // check if token has expired
    if (exp! < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
    res.locals.loggedInUser = await UserModel.findById(userId);
    next();
  } else {
    next();
  }
});

/// set up routes
app.use("/users", userRouter);

connectDB(() => {
  // start up server
  app.listen(PORT, () => {
    console.log("Server is listening on Port: ", PORT);
  });
});
