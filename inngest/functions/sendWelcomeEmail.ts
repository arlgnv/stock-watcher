import { createWelcomeEmail } from '@/nodemailer/emailCreators';
import nodemailer from '@/nodemailer/transporter';

import client from '../client';
import { INTRO_FOR_WELCOME_EMAIL } from '../prompts';

const sendWelcomeEmail = client.createFunction(
  { id: 'send-welcome-email' },
  { event: 'user.signed_up' },
  async ({ event, step }) => {
    const generatePersonalizedIntroResponse = await step.ai.infer(
      'generate-personalized-intro',
      {
        model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
        body: {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: INTRO_FOR_WELCOME_EMAIL.replace(
                    '{{userData}}',
                    `
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
      },
    );

    await step.run('send-email', () => {
      const personalizedIntroPart = generatePersonalizedIntroResponse.candidates
        ?.at(0)
        ?.content.parts.at(0);
      const personalizedIntro =
        (personalizedIntroPart && 'text' in personalizedIntroPart
          ? personalizedIntroPart.text
          : undefined) ??
        '<p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #ccdadc;">Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.</p>';

      void nodemailer.sendMail({
        to: event.data.email,
        subject: 'Welcome to Signalist 🚀',
        html: createWelcomeEmail(event.data.fullName, personalizedIntro),
      });
    });
  },
);

export default sendWelcomeEmail;
