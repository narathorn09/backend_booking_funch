import config from "config";
import { createEmailTransporter } from "./createEmailTransporter.js";
const { email } = config.get("smtp");
const { url } = config.get("client");

export const sendVerifyEmail = (user) => {
  const transporter = createEmailTransporter();

  const mailOptions = {
    from: `"F-Booking" <${email}>`,
    to: user.email,
    subject: "Verify your email ✅",
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 80%;
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #333333;
                        font-size: 32px;
                        margin-bottom: 20px;
                    }
                    h2 {
                        color: #333333;
                        font-size: 28px;
                        margin-bottom: 20px;
                    }
                    p {
                        color: #666666;
                        font-size: 18px;
                        margin-top: 20px;
                        line-height: 1.5;
                    }
                    span {
                    	color: #fff;
                    }
                    .button {
                        display: inline-block;
                        background-color: #007bff;
                        color: #ffffff;
                        padding: 15px 30px;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 18px;
                        transition: background-color 0.3s ease;
                    }
                    .button:hover {
                        background-color: #0056b3;
                    }
                    
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Email Verification</h2>
                    <p>Please click the button below to verify your email address.</p>
                    <p>
                        <a href='${url}/verify-email?emailToken=${JSON.stringify(user.emailToken)}' class="button">
                            <span>Verify Email</span>
                        </a>
                    </p>
                </div>
            </body>
            </html>
    `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};
