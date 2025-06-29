const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.ADMIN_EMAIL, // your email address
    pass: process.env.ADMIN_PASSWORD,
  },
});

module.exports = transporter;
