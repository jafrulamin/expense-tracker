# Expense Tracker (Next.js Version)

A simple personal expense tracking application built as part of the CUNY Tech Prep program. This app helps users track their daily expenses and manage their budget.

**Note:** The original Vite version has been backed up to `Old-expense-tracker` folder on the Desktop.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start LocalStack (for S3 receipt storage):
   ```bash
   docker-compose up -d
   ```

3. Create the S3 bucket:
   ```bash
   npm run create-bucket
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Current Features

- ✅ User authentication with NextAuth (credentials-based)
- ✅ Protected expense tracker (login required)
- ✅ Add new expenses with description, amount, category, and date
- ✅ Upload receipt images (stored in LocalStack S3)
- ✅ View receipts from expense cards
- ✅ View list of all expenses
- ✅ See total expenses count and total amount spent
- ✅ Delete individual expenses
- ✅ Expenses linked to user email
- ✅ Highlighted most recent expense
- ✅ Responsive design with Tailwind CSS

## Demo Login

- **Email:** Any valid email address
- **Password:** `password`

## Planned Next Steps

- Migrate to Next.js for better performance and routing
- Add backend API and database integration
- Implement user authentication and multi-user support
- Deploy to production

## Project Structure

- `app/` - Next.js app directory
  - `components/` - React components
  - `types.ts` - TypeScript type definitions
  - `page.tsx` - Main page
  - `layout.tsx` - Root layout
  - `globals.css` - Global styles
- `docs/` - Documentation
  - `ADR/` - Architecture Decision Records
  - `planning/` - Project planning and standup notes
- `LICENSE` - MIT License
- `README.md` - This file

**Note:** You can take a screenshot of the current UI and place it in a `screenshots/` folder later if needed.
