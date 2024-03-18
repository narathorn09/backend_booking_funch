import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, maxLength: 50 },
    lastName: { type: String, maxLength: 50 },
    email: { type: String, required: true, unique: true, maxLength: 200 },
    password: { type: String, required: true, maxLength: 1024 },
    isVerify: { type: Boolean, default: false },
    emailToken: { type: String }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
