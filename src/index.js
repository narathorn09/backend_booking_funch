import express from "express";
import cors from "cors";
import config from "config";
import { createServer } from "http";
import { connectToMongoDB } from "./db-config/database-config.js";
import router from './route/router.js';

const app = express();
const port = config.get("server.port");

// connect MongoDB
connectToMongoDB();

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use('/api/', router);

app.get("/", (req, res) => {
  res.send("Hello from Express.js server!!");
});

const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
