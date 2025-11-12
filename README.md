# Rewards App

A points reward system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 3-step onboarding flow (Welcome, CPF, Personal Info)
- 💰 Points balance and tracking
- 🎁 Prize catalog with progress indicators
- 🎫 Active draws with entry system
- 👤 User profile with stats and level progression
- 📊 Transaction history
- 🎨 Custom color scheme (#FCFC30, #465EFF)
- ✨ Smooth animations with Framer Motion

## Getting Started

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deploy to Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Project Structure

\`\`\`
rewards-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── MainApp.tsx
│   ├── Onboarding.tsx
│   ├── RewardsHome.tsx
│   └── RewardsProfile.tsx
├── public/
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
\`\`\`

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vercel** - Hosting and deployment
