const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.get(
  "/user/:userId",
  authMiddleware.allowIfLoggedIn,
  userController.getUser
);

router.get(
  "/users",
  authMiddleware.allowIfLoggedIn,
  authMiddleware.grantAccess("readAny", "profile"),
  userController.getUsers
);

router.put(
  "/user/:userId",
  authMiddleware.allowIfLoggedIn,
  authMiddleware.grantAccess("updateAny", "profile"),
  userController.updateUser
);

router.delete(
  "/user/:userId",
  authMiddleware.allowIfLoggedIn,
  authMiddleware.grantAccess("deleteAny", "profile"),
  userController.deleteUser
);

module.exports = router;
