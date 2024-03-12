import { allowedOrigins } from "../../config/allowedOrigins.js";

export const corsOptions = {
  origin: (origin, callback) => {
    // check origin in allowedOrigins
    if (allowedOrigins.indexOf(origin) !== -1) {
      // allow origin 
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
//   optionsSuccessStatus: 200,
};
