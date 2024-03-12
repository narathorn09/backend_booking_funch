import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import ResponseError from "../components/responseError.js";

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
    const privateKey = config.get("jwt.secret");

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

    // use jwt for gen token with playoad and privateKey
    const token = jwt.sign(
      { email: email, firstName: user.firstName, lastName: user.lastName },
      privateKey,
      { expiresIn: "10m" }
    );

    res.status(200).json({
      status: 200,
      message: "Login Success.",
      token: token,
    });
  } catch (error) {
    ResponseError(error, res);
  }
};
