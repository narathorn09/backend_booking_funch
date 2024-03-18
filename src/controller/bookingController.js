import BookingModel from "../models/bookingModel.js";
import ResponseError from "../components/responseError.js";

export const createBooking = async (req, res) => {
  try {
    const { user, room, firstName, lastName, email, phone, checkIn, checkOut } = req.body;
    const data = { user, room, firstName, lastName, email, phone, checkIn, checkOut };

    const newBooking = new BookingModel(data); 

    const respone = await newBooking.save();
    if (respone) {
      res.status(201).json({
        status: 201,
        message: "Booking Success.",
      });
    }
  } catch (error) {
    ResponseError(error, res);
  }
};


export const getBookingByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const bookings = await BookingModel.find({ room: roomId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No bookings found for the given roomId.",
      });
    }

    res.status(200).json({
      status: 200,
      bookings,
    });
  } catch (error) {
    ResponseError(error, res);
  }
};
