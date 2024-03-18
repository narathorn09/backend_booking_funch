import RoomModel from "../models/roomModel.js";
import ResponseError from "../components/responseError.js";

export const createRoom = async (req, res, next) => {
  try {
    const newRoom = new RoomModel(req.body);
    await newRoom.save();
    res.status(201).json({ data: "create success" });
  } catch (error) {
    ResponseError(error, res);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json({ data: rooms });
  } catch (error) {
    ResponseError(error, res);
  }
};
