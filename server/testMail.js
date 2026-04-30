require('dotenv').config();
const nodemailer = require("nodemailer");

console.log("Testing SMTP connection for:", process.env.SMTP_EMAIL);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("Server is ready to take our messages. Connection successful!");
  }
  process.exit();
});
