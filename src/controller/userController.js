// import mongoose from "mongoose";
import UserModel from "../models/user.js";
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
    res.status(201).json({ data: users });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // find user by email
    const existingUser = await UserModel.findOne({ email });

    // check user and send response error when user duplicates email
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const newUser = new UserModel({ firstName, lastName, username, password });
    const respone = await newUser.save();

    if (respone) {
      res.status(201).json({
        status: 201,
        code: "SUCCESS_REGISTER_USER",
        message: "Register Success.",
      });
    }
  } catch (error) {
    ResponseError(error, res);
  }
};
