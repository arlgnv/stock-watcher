import nodemailer from 'nodemailer';

import environment from '@/environment';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: environment.GMAIL_ADDRESS,
    pass: environment.GOOGLE_APP_PASSWORD,
  },
});

export default transporter;
