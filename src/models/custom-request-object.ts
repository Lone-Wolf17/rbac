import { Request } from "express";
import { User } from "./userModel";

export interface CustomRequestObject extends Request {
  user?: User;
}
