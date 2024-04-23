import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "justmoviescontact@gmail.com",
    pass: process.env.ADMIN_PASSWORD,
  },
});

export default transporter;