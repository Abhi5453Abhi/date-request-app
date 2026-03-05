# Date Request App

A beautiful, personalized website to ask someone special on a date!

## Features

- Upload up to 4 photos with AI-generated romantic captions
- Choose from 4 beautiful color themes (Romantic Rose, Ocean Breeze, Golden Hour, Midnight Love)
- Customize your question
- Playful "No" button that dodges clicks with funny messages
- Confetti celebration when they say "Yes!"
- Real-time notification for the creator when partner responds
- Unique shareable URL for each page

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Neon Postgres** (via Drizzle ORM)
- **Vercel Blob** (for image storage)
- **canvas-confetti** (for celebrations)

## Setup

### 1. Clone and Install

```bash
git clone <your-repo>
cd date-request-app
npm install
```

### 2. Set Up Neon Database

1. Create a free Neon database at [neon.tech](https://neon.tech)
2. Copy your connection string

### 3. Set Up Vercel Blob

1. Go to your Vercel project settings
2. Navigate to Storage > Blob
3. Create a new Blob store and copy the token

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
```

### 5. Run Database Migrations

```bash
npx drizzle-kit push
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add Neon Postgres integration (or add DATABASE_URL manually)
4. Add Vercel Blob storage
5. Deploy!

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── create/page.tsx       # Create new page form
│   ├── love/[slug]/
│   │   ├── page.tsx          # Partner view with photos & question
│   │   └── celebrate/page.tsx # Celebration page
│   ├── waiting/[slug]/page.tsx # Creator waiting room
│   └── api/
│       ├── pages/            # Create/fetch pages
│       ├── upload/           # Photo upload
│       └── respond/          # Record response
├── components/
│   ├── ThemeSelector.tsx
│   ├── PhotoUpload.tsx
│   └── DodgyNoButton.tsx
├── db/
│   ├── schema.ts            # Database schema
│   └── index.ts             # Database connection
└── lib/
    ├── themes.ts            # Theme definitions
    ├── captions.ts          # Romantic captions
    ├── funny-messages.ts    # No button messages
    └── utils.ts             # Utilities
```

## License

MIT

