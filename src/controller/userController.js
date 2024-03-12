// import mongoose from "mongoose";
import UserModel from "../models/user.js";

export const createUser = async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({ data: "create success" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(201).json({data: users});
  } catch (error) {
    res.status(400).json(error.message);
  }
};
