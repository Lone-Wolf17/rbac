import bcrypt from "bcrypt";

import { UserModel } from "../models/userModel";
import { RoleNames as Roles } from "../constants/enums";
import { Request, Response, NextFunction } from "express";
import { signToken } from "../util/jwtHelper";

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      role: role || Roles.basic,
    });
    const accessToken = signToken(newUser._id);
    newUser.accessToken = accessToken;
    await newUser.save();
    const userData = {
      email: newUser.email,
      role: newUser.role,
      id: newUser.id,
    };
    res.json({
      data: userData,
      accessToken,
      message: "You have signed up successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return next(new Error("Email does not exist"));

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = signToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, { accessToken });
    console.log(user.id, "User ID");
    res.status(200).json({
      data: { email: user.email, role: user.role, id: user.id },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json({
    data: users,
  });
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) return next(new Error("User does not exist"));

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    if (update.password) {
      return res.status(403).json({
        success: false,
        message: "Password Change Not allowed",
      });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(userId, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    res.status(200).json({
      data: {
        email: updatedUser.email,
        role: updatedUser.role,
        id: updatedUser.id,
      },
      message: "User has been updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
