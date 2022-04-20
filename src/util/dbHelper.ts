import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = (callback: Function) => {
  mongoose
    .connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions)
    .then(() => {
      callback();
      console.log("Connected to the Database succesfully");
    });
};
