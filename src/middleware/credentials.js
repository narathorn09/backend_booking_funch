import { allowedOrigins } from "../../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  // check origin in allowedOrigins
  if (allowedOrigins.includes(`${origin}`)) {
    // set Access-Control-Allow-Credentials is true
    res.header("Access-Control-Allow-Credentials", "true");

    // working next function
    next();
  } else {
    // send 403 Forbidden when origin not in allowedOrigins
    return res.sendStatus(403);
  }
};
