import inngest from '../client';

const sendDailyNewsSummary = inngest.createFunction(
  { id: 'daily-news-summary' },
  [
    // { cron: '0 12 * * *' }
  ],
  async () => {
    //   // Step #1: Get all users for news delivery
    //   const users = await step.run('get-all-users', getAllUsersForNewsEmail);
    //   if (!users || users.length === 0)
    //     return { success: false, message: 'No users found for news email' };
    //   // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
    //   const results = await step.run('fetch-user-news', async () => {
    //     const perUser: {
    //       user: User;
    //       articles: MarketNewsArticle[];
    //     }[] = [];
    //     for (const user of users as User[]) {
    //       try {
    //         const symbols = await getWatchlistSymbolsByEmail(user.email);
    //         let articles = await getNews(symbols);
    //         // Enforce max 6 articles per user
    //         articles = articles.slice(0, 6);
    //         // If still empty, fallback to general
    //         if (articles.length === 0) {
    //           articles = await getNews();
    //           articles = articles.slice(0, 6);
    //         }
    //         perUser.push({ user, articles });
    //       } catch (e) {
    //         console.error('daily-news: error preparing user news', user.email, e);
    //         perUser.push({ user, articles: [] });
    //       }
    //     }
    //     return perUser;
    //   });
    //   // Step #3: Summarize news via AI
    //   const userNewsSummaries = await Promise.all(
    //     results.map(async ({ user, articles }) => {
    //       try {
    //         const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
    //           '{{newsData}}',
    //           JSON.stringify(articles, null, 2),
    //         );
    //         const response = await step.ai.infer(`summarize-news-${user.email}`, {
    //           model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
    //           body: {
    //             contents: [{ role: 'user', parts: [{ text: prompt }] }],
    //           },
    //         });
    //         const part = response.candidates?.at(0)?.content.parts.at(0);
    //         const newsContent =
    //           (part && 'text' in part ? part.text : null) ?? 'No market news.';
    //         return { user, newsContent };
    //       } catch (error) {
    //         console.error('Failed to summarize news for: ', user.email, error);
    //         return { user, newsContent: null };
    //       }
    //     }),
    //   );
    //   // Step #4: Send the emails
    //   await step.run('send-news-emails', async () => {
    //     await Promise.all(
    //       userNewsSummaries.map(async ({ user, newsContent }) => {
    //         if (!newsContent) return false;
    //         await sendNewsSummaryEmail({
    //           email: user.email,
    //           date: getFormattedTodayDate(),
    //           newsContent,
    //         });
    //       }),
    //     );
    //   });
    //   return {
    //     success: true,
    //     message: 'Daily news summary emails sent successfully',
    //   };
  },
);

export default sendDailyNewsSummary;
