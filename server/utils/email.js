const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

// Check email pattern
exports.isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
// Email transporter
var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// Email reservation confirmation
exports.sendEmailConfirmation = (htmlFile) => {
  const mailOptions = {
    from: {
      name: "Restaurant booking",
      address: process.env.EMAIL,
    },
    to: customerInfo.email,
    subject: "Reservation info",
    html: "",
  };

  transporter.sendMail(mailOptions);
};
