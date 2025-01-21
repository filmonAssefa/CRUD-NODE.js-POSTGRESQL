import express from "express";
import UserController from "../controller/userController.js";
import validateRequest from "../middleware/validateRequest.js";
import { userSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post(
  "/user",
  validateRequest(userSchema.create),
  UserController.createUser
);

router.get("/users", UserController.getAllUsers);

router.get(
  "/user/:id",
  validateRequest(userSchema.id),
  UserController.getUserById
);

router.put(
  "/user/:id",
  validateRequest(userSchema.id),
  validateRequest(userSchema.update),
  UserController.updateUser
);

router.delete(
  "/user/:id",
  validateRequest(userSchema.id),
  UserController.deleteUser
);

export default router;
