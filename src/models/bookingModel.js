import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkIn: { type: Date },
    checkOut: { type: Date },
    firstName: { type: String, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    email: { type: String, maxLength: 200 },
    phone: { type: String, maxLength: 10 },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
