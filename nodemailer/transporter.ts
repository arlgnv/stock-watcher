import nodemailer from 'nodemailer';

if (!process.env.GOOGLE_EMAIL) {
  throw new Error('GOOGLE_EMAIL environment variable is not defined');
}

if (!process.env.GOOGLE_APP_PASSWORD) {
  throw new Error('GOOGLE_APP_PASSWORD environment variable is not defined');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export default transporter;
