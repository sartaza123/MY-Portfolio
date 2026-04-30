const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
    // Create a real transporter
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Fallback to Ethereal Email for testing
    console.log("No SMTP credentials found in .env. Falling back to Ethereal test account...");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Define email options
  const message = {
    from: `${process.env.FROM_NAME || "Portfolio Admin"} <${process.env.FROM_EMAIL || process.env.SMTP_EMAIL || "admin@portfolio.dev"}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.htmlMessage || options.message,
  };

  // Send email
  const info = await transporter.sendMail(message);

  if (!process.env.SMTP_HOST) {
    console.log("--- TEST EMAIL SENT ---");
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("-----------------------");
  }
};

module.exports = sendEmail;
