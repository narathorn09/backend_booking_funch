// import mongoose from "mongoose";
import User from "../models/user.js";

export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ data: "create success" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
