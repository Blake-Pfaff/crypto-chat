Project: Crypto Dashboard with AI Chatbot
Tech Stack: Next.js (TypeScript), Tailwind CSS, React Query (TanStack Query), Prisma (optional for persistence), Free Crypto API (CoinGecko or similar), AI Chatbot (OpenAI API or lightweight alternative).

1. 🎯 Goal

Build an interactive crypto dashboard that allows users to:

View real-time cryptocurrency data (prices, trends, volume, market cap).

Search and filter coins.

See charts and multiple data points per coin.

Ask an AI chatbot for coin insights, explanations, and summaries.

Save favorite coins (if persistence is enabled via Prisma).

2. 👥 Target Users

Crypto enthusiasts who want quick and clear data.

Beginners who need AI explanations of terms and coin data.

Traders who want a simple overview dashboard without complex tooling.

3. 🔑 Core Features
   A. Dashboard & Market Data

Display top 50 coins with:

Name, symbol, logo

Current price

24h % change

Market cap

Volume

7-day sparkline chart

Sorting & filtering options.

Search bar for specific coins.

B. Coin Details Page

Price history chart (24h, 7d, 30d).

Supply, volume, market rank.

News section (optional, free API or RSS).

C. AI Chatbot

User can type:

“What is Ethereum?” → summary explanation

“Why is Bitcoin down today?” → market sentiment analysis (use API data + AI).

Chat window integrated into dashboard.

D. Favorites & Persistence (Optional w/ Prisma)

User can "star" coins.

Saved in local DB (SQLite or Postgres via Prisma).

Favorites section on dashboard.

4. 🛠 Tech Requirements

Frontend:

Next.js (App Router) with TypeScript

Tailwind CSS for styling

React Query for API data fetching/caching

Backend/API:

Free API: CoinGecko
(no auth needed)

AI chatbot: OpenAI API or similar free tier model

Optional Prisma integration for storing favorites

Deployment:

Vercel (ideal for Next.js)

5. 📂 Suggested File Structure
   crypto-dashboard/
   ├── prisma/
   │ └── schema.prisma # (if persistence is used)
   ├── src/
   │ ├── app/
   │ │ ├── layout.tsx
   │ │ ├── page.tsx # Dashboard
   │ │ ├── coin/[id]/page.tsx # Coin detail page
   │ │ └── api/
   │ │ ├── coins/route.ts # Proxy routes for crypto API
   │ │ └── chatbot/route.ts # Chatbot endpoint
   │ ├── components/
   │ │ ├── Navbar.tsx
   │ │ ├── CoinTable.tsx
   │ │ ├── CoinCard.tsx
   │ │ ├── Chatbot.tsx
   │ │ └── Chart.tsx
   │ ├── hooks/
   │ │ └── useCryptoQuery.ts # React Query hooks
   │ ├── lib/
   │ │ └── api.ts # Fetch helpers
   │ └── styles/
   │ └── globals.css
   ├── package.json
   ├── tsconfig.json
   └── tailwind.config.js

6. 📊 Data Points (from API)

id

symbol

name

current_price

market_cap

total_volume

price_change_percentage_24h

sparkline_in_7d

circulating_supply

total_supply

7. 🔄 API Endpoints Needed
   Crypto Data (CoinGecko)

Market Data:
GET /coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true

Coin Details:
GET /coins/{id}

AI Chatbot

Chat Endpoint (server-side in Next.js API route):
POST /api/chatbot → forwards user input + context to AI model

Optional Favorites (Prisma)

POST /api/favorites → save coin

GET /api/favorites → list favorites

DELETE /api/favorites/:id → remove coin

8. 📌 Non-Goals

No trading or wallet integration (view-only).

No authentication (unless extended later).

Not a replacement for professional trading software.

9. 🗓 Roadmap (MVP → Stretch)

MVP:

Dashboard with table + coin details

AI chatbot with CoinGecko data

React Query caching

Stretch Goals:

Prisma persistence (favorites)

News section

Dark mode toggle

PWA support
