import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "apitest2561@gmail.com",
      pass: "btrw vjde rctq ptal",
    },
  });