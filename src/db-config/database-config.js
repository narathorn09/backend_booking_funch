import config from "config";
import mongoose from "mongoose";

const { uri } = config.get("db.mongodb");

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${uri}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
