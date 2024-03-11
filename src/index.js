import express from "express";
import cors from "cors";
import config from "config";
import { createServer } from "http";
import { connectToMongoDB } from "./db-config/database-config.js";
import { createUser } from "./controller/userController.js"
const app = express();
connectToMongoDB();

const port = config.get("server.port");

app.use(cors());
app.use(express.json({ limit: "100mb" }));

app.get("/", (req, res) => {
  res.send("Hello from Express.js server!!");
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await createUser(req.body)
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
