import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import {Types} from 'mongoose';

import { RoleNames } from "../constants/enums";

export class User {

  public id!: Types.ObjectId

  @Property({ required: true, trim: true })
  public email!: string;

  @Property({ required: true })
  public password!: string;

  @Property({
    required: true,
    default: RoleNames.basic,
    enum: [RoleNames.basic, RoleNames.supervisor, RoleNames.admin],
  })
  public role!: string;

  @Property()
  public accessToken!: string;
}

export const UserModel = getModelForClass(User);

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: RoleNames.basic,
//     enum: [RoleNames.basic, RoleNames.supervisor, RoleNames.admin],
//   },
//   accessToken: {
//     type: String,
//   },
// });
