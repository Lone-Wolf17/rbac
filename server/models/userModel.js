const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { RoleNames } = require("../constants/enums");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: RoleNames.basic,
    enum: [RoleNames.basic, RoleNames.supervisor, RoleNames.admin],
  },
  accessToken: {
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
