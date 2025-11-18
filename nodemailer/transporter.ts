import nodemailer from 'nodemailer';

if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
  throw new Error(
    'NODEMAILER_EMAIL and NODEMAILER_PASSWORD environment variables must be set',
  );
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export default transporter;
