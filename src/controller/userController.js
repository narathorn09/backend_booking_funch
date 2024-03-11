import User from "../models/user.js"

export const createUser = async (data) => {
    const newUser = new User(data);
    await newUser.save();
}

