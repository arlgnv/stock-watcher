import { WELCOME_EMAIL } from '@/nodemailer/templates';
import transporter from '@/nodemailer/transporter';

import client from '../client';
import { CREATE_INTRO_FOR_WELCOME_EMAIL } from '../prompts';

const sendWelcomeEmail = client.createFunction(
  { id: 'send-welcome-email' },
  { event: 'app/user.signed_up' },
  async ({ event, step }) => {
    const generateIntroResponse = await step.ai.infer('generate-intro', {
      model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
      body: {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: CREATE_INTRO_FOR_WELCOME_EMAIL.replace(
                  '{{userData}}',
                  `
                    - Country: ${event.data.country}
                    - Investment goal: ${event.data.investmentGoal}
                    - Risk tolerance: ${event.data.riskTolerance}
                    - Preferred industry: ${event.data.preferredIndustry}
                  `,
                ),
              },
            ],
          },
        ],
      },
    });
    const introPart = generateIntroResponse.candidates
      ?.at(0)
      ?.content.parts.at(0);

    await step.run('send-email', async () => {
      const intro =
        (introPart && 'text' in introPart ? introPart.text : null) ??
        '<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.</p>';

      await transporter.sendMail({
        from: '"Signalist" <info@signalist.io>',
        to: event.data.email,
        subject: 'Welcome to Signalist - Your stock market toolkit is ready!',
        text: 'Thanks for joining Signalist',
        html: WELCOME_EMAIL.replace('{{name}}', event.data.fullName).replace(
          '{{intro}}',
          intro,
        ),
      });
    });
  },
);

export default sendWelcomeEmail;
