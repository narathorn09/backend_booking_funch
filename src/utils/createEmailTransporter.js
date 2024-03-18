import config from "config";
import nodemailer from "nodemailer";

const { email, password } = config.get("smtp");

export const createEmailTransporter = () => {
  console.log("email", email);
  console.log("password", password);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });
  return transporter;
};
