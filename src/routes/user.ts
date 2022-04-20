import { Router } from "express";
import Roles from "../roles";

import * as userController from "../controllers/userController";
import * as authMiddleware from "../middlewares/authMiddleware";
import { ResourceNames as Resource } from "../constants/enums";
import { CustomRequestObject } from "models/custom-request-object";

const router = Router();

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.get("/:userId", authMiddleware.allowIfLoggedIn, userController.getUser);

router.get(
  "/users",
  authMiddleware.allowIfLoggedIn,
  function (req: CustomRequestObject, res, next) {
    return authMiddleware.checkAccess(
      Roles.can(req.user!.role).readAny(Resource.profile)
    );
  },
  userController.getUsers
);

router.put(
  "/:userId",
  authMiddleware.allowIfLoggedIn,
  function (req: CustomRequestObject, res, next) {
    return authMiddleware.checkAccess(
      Roles.can(req.user!.role).updateAny(Resource.profile)
    );
  },
  userController.updateUser
);

router.delete(
  "/:userId",
  authMiddleware.allowIfLoggedIn,
  function (req: CustomRequestObject, res, next) {
    return authMiddleware.checkAccess(
      Roles.can(req.user!.role).deleteAny(Resource.profile)
    );
  },
  userController.deleteUser
);

export default router;
