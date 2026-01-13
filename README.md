# Signalist

Signalist is a real‑time stock tracking platform that delivers personalized alerts and detailed company insights.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/arlgnv/signalist?utm_source=oss&utm_medium=github&utm_campaign=arlgnv%2Fsignalist&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## Tech stack

- **[Next.js](https://nextjs.org)** is a powerful React framework for building full-stack web applications. It provides server-side rendering, static site generation, and API routes, allowing developers to create optimized and scalable apps quickly.
- **[TypeScript](https://www.typescriptlang.org)** is a statically typed superset of JavaScript that improves code quality, tooling, and error detection. It is ideal for building large-scale applications and enhances maintainability.
- **[TailwindCSS](https://tailwindcss.com)** is a utility-first CSS framework that allows developers to build custom, responsive designs quickly without leaving their HTML. It provides pre-defined classes for layout, typography, colors, and more.
- **[Better Auth](https://www.better-auth.com)** is a framework-agnostic authentication and authorization library for TypeScript. It provides built-in support for email/password login, social sign-on (Google, GitHub, Apple, and more), and multi-factor authentication, simplifying user authentication and account management.
- **[CodeRabbit](https://www.coderabbit.ai)** is an AI-powered code review assistant that integrates with GitHub. It helps developers catch bugs, enforce best practices, and maintain consistent code quality across pull requests, reducing manual review effort and speeding up the development workflow.
- **[Finnhub](https://finnhub.io)** is a real-time financial data API that provides stock, forex, and cryptocurrency market data. It offers developers access to fundamental data, economic indicators, and news, making it useful for building trading apps, dashboards, and financial analysis tools.
- **[Inngest](https://www.inngest.com)** is a platform for event-driven workflows and background jobs. It allows developers to build reliable, scalable automated processes such as real-time alerts, notifications, and AI-powered workflows.
- **[Supabase](https://supabase.com)** is the Postgres development platform. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.
- **[Nodemailer](https://nodemailer.com)** is a Node.js library for sending emails easily. It supports various transport methods such as SMTP, OAuth2, and third-party services, making it a reliable tool for handling transactional emails, notifications, and contact forms in applications.
- **[Shadcn](https://ui.shadcn.com)** is an open-source library of fully customizable, accessible React components. It helps teams rapidly build consistent, visually appealing UIs while allowing full control over design and layout.

## Development

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en)

### Recommendations

- Enable [custom TypeScript plugin](https://nextjs.org/docs/app/api-reference/config/typescript#ide-plugin) for Next.js

### Setting up

1. Clone repository

```bash
git clone git@github.com:arlgnv/signalist.git
```

2. Navigate to cloned folder

```bash
cd signalist
```

3. Install dependencies

```bash
npm install
```

4. Set up environment variables

   Create a new file named `.env` in the project's root and fill it out with required variables

### Starting development server

1. Start the server

```bash
npm run dev
```

2. Start inngest dev server

```bash
npm inngest:dev
```

3. Open the server

   Visit [http://localhost:3000](http://localhost:3000) in your browser to view the project
