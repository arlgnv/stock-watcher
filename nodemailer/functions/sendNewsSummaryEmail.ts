import { NEWS_SUMMARY_EMAIL } from '../templates';
import transporter from '../transporter';

async function sendNewsSummaryEmail({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> {
  const htmlTemplate = NEWS_SUMMARY_EMAIL.replace('{{date}}', date).replace(
    '{{newsContent}}',
    newsContent,
  );

  const mailOptions = {
    from: `"Signalist News" <info@signalist.io>`,
    to: email,
    subject: `📈 Market News Summary Today - ${date}`,
    text: `Today's market news summary from Signalist`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}

export default sendNewsSummaryEmail;
