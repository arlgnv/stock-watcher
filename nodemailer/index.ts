import nodemailer from 'nodemailer';

import { WELCOME_EMAIL_TEMPLATE } from './templates';

if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
  throw new Error(
    'NODEMAILER_EMAIL and NODEMAILER_PASSWORD environment variables must be set',
  );
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

interface WelcomeEmailData {
  email: string;
  name: string;
  intro: string;
}

export async function sendWelcomeEmail({
  email,
  name,
  intro,
}: WelcomeEmailData) {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
    '{{intro}}',
    intro,
  );
  const mailOptions = {
    from: '"Signalist" <info@signalist.io>',
    to: email,
    subject: 'Welcome to Signalist - Your stock market toolkit is ready!',
    text: 'Thanks for joining Signalist',
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}
