import bcrypt from "bcrypt";
import config from "config";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import ResponseError from "../components/responseError.js";
import { sendVerifyEmail } from "../utils/sendVerifyEmail.js";

const privateKey = config.get("jwt.secret");

const generateToken = (data, privateKey) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), privateKey)
    .toString()
    .replace(/\+/g, ""); // Replace all "+" characters with an empty string
  return ciphertext;
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const saltRounds = 10;

    // find user by email
    const existingUser = await UserModel.findOne({ email });

    // check user and send response error when user duplicates email
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists. Please use another one." });
    }

    // hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // user data
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
    };

    const token = generateToken(userData, privateKey);

    // create new user
    const newUser = new UserModel({ ...userData, emailToken: token });

    // save user into mongoDB
    const respone = await newUser.save();

    // send notification email
    sendVerifyEmail(newUser);

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

    if (!user.isVerify) {
      return res.status(401).json({
        status: 401,
        message: "email is not verified!",
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
      { expiresIn: "1d" }
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

export const verifyEmail = async (req, res) => {
  try {
    const { emailToken } = req.body;

    if (!emailToken) {
      return res.status(404).json({ status: 404, message: "Email not found." });
    }

    const user = await UserModel.findOne({
      emailToken: JSON.parse(emailToken),
    });

    if (user) {
      // user.emailToken = null;
      user.isVerify = true;

      await user.save();

      return res.status(200).json({
        status: 200,
        message: "Verify success.",
        verify: user?.isVerify,
        email: user?.email
      });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Verify error, invalid token." });
    }
  } catch (error) {}
};
