// import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import ResponseError from "../components/responseError.js";

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
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
