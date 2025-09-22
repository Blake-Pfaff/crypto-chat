# Crypto Dashboard with AI Chatbot

An interactive cryptocurrency dashboard that provides real-time market data, detailed coin insights, and an AI-powered chatbot for crypto analysis and explanations.

## Features

- 📊 **Real-time Crypto Data**: Live prices, market caps, volume, and 24h changes for top cryptocurrencies
- 🔍 **Search & Filter**: Find specific coins and sort by various metrics
- 📈 **Interactive Charts**: Price history with 7-day sparklines and detailed coin charts
- 🤖 **AI Chatbot**: Ask questions about cryptocurrencies and get intelligent insights
- ⭐ **Favorites System**: Save and track your preferred coins (optional with Prisma)
- 🎨 **Modern UI**: Responsive design built with Tailwind CSS
- ⚡ **Fast Performance**: Built on Next.js 15 with React Query for optimal caching

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **API**: CoinGecko (free tier)
- **AI**: OpenAI API or similar
- **Database**: Prisma (optional for favorites)
- **Charts**: Recharts or Chart.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Set up environment variables:
```bash
cp .env.example .env.local
# Add your API keys:
# OPENAI_API_KEY=your_openai_key_here
# COINGECKO_API_KEY=your_coingecko_key_here (optional for higher rate limits)
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

Based on the PRD, the project follows this structure:

```
crypto-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Main dashboard
│   │   ├── coin/[id]/page.tsx    # Coin detail pages
│   │   └── api/
│   │       ├── coins/route.ts    # Crypto API proxy
│   │       └── chatbot/route.ts  # AI chatbot endpoint
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── CoinTable.tsx
│   │   ├── CoinCard.tsx
│   │   ├── Chatbot.tsx
│   │   └── Chart.tsx
│   ├── hooks/
│   │   └── useCryptoQuery.ts     # React Query hooks
│   └── lib/
│       └── api.ts                # API helpers
└── prisma/                       # Optional for favorites
    └── schema.prisma
```

## Core Features

### 🏠 Dashboard
- Display top 50 cryptocurrencies with real-time data
- Sort by price, market cap, volume, 24h change
- Search functionality for specific coins
- 7-day sparkline charts for quick trend visualization

### 🔍 Coin Details
- Detailed price history charts (24h, 7d, 30d views)
- Market statistics (supply, volume, rank)
- AI-powered insights and explanations

### 🤖 AI Chatbot
- Ask questions like "What is Ethereum?" or "Why is Bitcoin down today?"
- Context-aware responses using live market data
- Integrated chat interface within the dashboard

## Development

You can start editing the dashboard by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
