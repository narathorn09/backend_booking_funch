import { Router } from "express";
import Auth from "../middleware/auth.js";
import { createUser, getUsers } from "../controller/userController.js";
import { register, login } from "../controller/authController.js";

const router = Router();

router.route("/user")
  .post(createUser)
  .get(getUsers);
router.route("/register")
  .post(register);  
router.route("/login")
  .post(login);

export default router;
