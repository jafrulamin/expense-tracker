# Expense Tracker

A personal expense tracking web application built with Next.js. Track your daily expenses, organize them by category, and keep an eye on your spending habits.

## What It Does

This app lets you:
- Sign in with GitHub or create an account with email/password
- Add expenses with description, amount, category, and date
- Optionally add a receipt URL (link to an external receipt)
- View all your expenses in a list
- Edit existing expenses
- Delete expenses you no longer need
- See a summary of total expenses and total amount spent
- Use a test account for quick demo access

Each user only sees their own expenses - everything is tied to your account.

## Tech Stack

- **Next.js 15** with App Router
- **React 19** and **TypeScript**
- **Tailwind CSS** for styling
- **NextAuth.js** for authentication (GitHub OAuth + email/password)
- **Neon Postgres** for the database
- **Drizzle ORM** for database queries and migrations

## Getting Started

### Prerequisites

You'll need:
- Node.js installed
- A Neon Postgres database (free tier works fine)
- A GitHub OAuth app (for GitHub login)

### Installation

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables. Create a `.env.local` file in the root directory:
   ```
   DATABASE_URL="your-neon-postgres-connection-string"
   GITHUB_ID="your-github-oauth-client-id"
   GITHUB_SECRET="your-github-oauth-client-secret"
   NEXTAUTH_SECRET="generate-a-random-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   To generate `NEXTAUTH_SECRET`, run:
   ```bash
   openssl rand -base64 32
   ```

3. Set up the database:
   ```bash
   npm run db:push
   ```
   This creates the necessary tables in your Neon database.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting Up GitHub OAuth

1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Expense Tracker (or whatever you want)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**
6. Add both to your `.env.local` file

## Features

### Authentication
- Sign in with GitHub (OAuth)
- Sign up and sign in with email/password
- Test account button for quick access (no registration needed)

### Expense Management
- Add expenses with:
  - Description
  - Amount
  - Category (Food, Transportation, Entertainment, Other)
  - Date
  - Optional receipt URL (just paste a link)
- View all expenses in a list
- Edit any expense
- Delete expenses
- See summary totals (count and total amount)

### User Experience
- Responsive design that works on mobile and desktop
- Clean, simple interface
- Most recent expense is highlighted
- Each user's expenses are private to their account

## Project Structure

```
app/
  ├── api/              # API routes
  │   ├── auth/         # Authentication endpoints
  │   └── expenses/     # Expense CRUD operations
  ├── auth/             # Sign in/sign up pages
  ├── components/       # React components
  └── lib/              # Utility functions
db/
  ├── schema.ts         # Drizzle database schema
  └── index.ts          # Database client setup
drizzle/                 # Database migrations
auth/
  └── config.ts         # NextAuth configuration
```

## Database Commands

- Generate migrations: `npm run db:generate`
- Push schema to database: `npm run db:push`

## Deployment

This app is ready to deploy on Vercel. Here's what you need to do:

1. Push your code to GitHub
2. Create a new project in Vercel and connect your repo
3. Add all environment variables in Vercel's dashboard:
   - `DATABASE_URL` (your Neon connection string)
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `NEXTAUTH_SECRET` (same value as local)
   - `NEXTAUTH_URL` (your Vercel URL, e.g., `https://your-app.vercel.app`)
4. Update your GitHub OAuth app callback URL to match your Vercel URL
5. Deploy!

After deployment, make sure to run `npm run db:push` to create the database tables in your production database.

## Notes

- Receipt URLs are just text links - the app doesn't handle file uploads
- The test account is automatically created/updated when you click the "Use Test Account" button
- All expenses are stored in a Postgres database and tied to the user's email

## License

MIT
