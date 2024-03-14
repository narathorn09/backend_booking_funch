import { Router } from "express";
import Auth from "../middleware/auth.js";
import { createUser, getUsers } from "../controller/userController.js";
import { register, login, verifyEmail} from "../controller/authController.js";

const router = Router();

router.route("/user")
  .post(createUser)
  .get(Auth, getUsers);
router.route("/register")
  .post(register);  
router.route("/login")
  .post(login);
router.route("/verify-email")
  .post(verifyEmail);

export default router;
