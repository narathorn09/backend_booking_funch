import express from "express";
import cors from "cors";
import config from "config";
import { createServer } from "http";
import { connectToMongoDB } from "./database/mongoDB.js";
import { corsOptions } from "./middleware/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import router from './route/router.js';

const app = express();
const port = config.get("server.port");

// connect MongoDB
connectToMongoDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb" }));
app.use('/api/', router);

app.get("/", (req, res) => {
  res.send("Hello from Express.js server!!");
});

const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
