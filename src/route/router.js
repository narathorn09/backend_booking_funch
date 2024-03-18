import { Router } from "express";
import Auth from "../middleware/auth.js";
import { register, login, verifyEmail} from "../controller/authController.js";
import { createRoom, getRooms } from "../controller/roomController.js";
import { createBooking, getBookingByRoomId } from "../controller/bookingController.js";

const router = Router();

router.route("/register")
  .post(register);  
router.route("/login")
  .post(login);
router.route("/verify-email")
  .post(verifyEmail);
router.route("/room")
  .post(createRoom)
  .get(Auth, getRooms);
router.route("/booking")
  .post(Auth, createBooking)
router.route("/booking/:roomId")
  .get(Auth, getBookingByRoomId)



export default router;
