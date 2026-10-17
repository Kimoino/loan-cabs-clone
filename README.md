# CABS Loan Clone

This project recreates the mobile loan application pages shown in the supplied design references, using a Vercel-ready Next.js app with a Telegram notification endpoint.

## Features
- Multi-step mobile loan form flow matching the provided layouts
- Loan amount and term sliders
- Personal details form
- Telegram submission forwarding via `/api/submit`
- Ready for deployment on Vercel

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Environment variables for Telegram

Add these in Vercel project settings or a local `.env.local` file:

```bash
BOT_TOKEN=your_telegram_bot_token
ADMIN_CHAT_ID=your_telegram_chat_id
```

## Deployment to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add the environment variables above.
4. Deploy.

## Notes
- If you do not add `BOT_TOKEN` and `ADMIN_CHAT_ID`, the form still works in local mode and returns a success response without Telegram delivery.
- The layout is built to closely reflect the screenshots supplied by the client.
