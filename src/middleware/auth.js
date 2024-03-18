import config from "config";
import jwt from "jsonwebtoken";
import ResponseError from "../components/responseError.js";

// get privateKey from .env
const privateKey = config.get("jwt.secret");

const Auth = async (req, res, next) => {
  try {
    // get authorization from header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // if authHeader not start with Bearer will send 401
    if (!`${authHeader}`?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    // get token from authHeader by using split Bearer
    const token = `${authHeader}`?.split(" ")[1];

    jwt.verify(token, privateKey, (err, decoded) => {
      // if token expires or invalid will send 403
      if (err) {
        console.error(err);
        return res.status(403).json({
          status: 403,
          message: "Invalid Token",
        });
      }

      // next when token valid
      next();
    });
  } catch (err) {
    ResponseError(err, res);
  }
};

export default Auth;
