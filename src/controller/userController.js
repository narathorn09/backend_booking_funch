// import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    const saltRounds = 10;

    // find user by email
    const existingUser = await UserModel.findOne({ email });

    // check user and send response error when user duplicates email
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    });

    // save user into mongoDB
    const respone = await newUser.save();

    if (respone) {
      res.status(201).json({
        status: 201,
        message: "Register Success.",
      });
    }
  } catch (error) {
    ResponseError(error, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await UserModel.findOne({ email });

    // if don't have a user will send a response 401
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid username or password",
      });
    }

    // check password match
    const passwordMatch = await bcrypt.compare(password, user.password);

    // if password don't match will send a response 401
    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        message: "Invalid username or password",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Login Success.",
    });
  } catch (error) {
    ResponseError(error, res);
  }
};
