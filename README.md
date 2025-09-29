# Crypto Dashboard with AI Chatbot

A modern, feature-rich cryptocurrency dashboard with an intelligent AI chatbot that provides real-time market data, detailed coin insights, and smart crypto analysis. Built with Next.js 15, TypeScript, and powered by CoinGecko API.

## ✨ Key Features

### 📊 **Real-Time Market Data**

- Live cryptocurrency prices, market caps, and 24h changes
- Paginated coin listings with customizable items per page (10, 25, 50, 100)
- Smart pagination with intuitive navigation
- Real-time price updates and market statistics

### 🔍 **Interactive Coin Details**

- Click any coin card to view detailed information in a modal
- Comprehensive coin data including current price, market cap, 24h change
- Rich coin descriptions and market statistics
- Smooth animations powered by Framer Motion

### 📈 **Advanced Price Charts**

- Interactive price charts with Recharts
- Multiple time periods: 1 day, 7 days, 30 days, 90 days, 1 year
- Customizable data points: 50, 100, 200, 365 points
- Smart time formatting and custom tooltips
- Responsive chart design that adapts to modal width

### 🤖 **Intelligent AI Chatbot**

- **Smart Coin Recognition**: Automatically detects ANY cryptocurrency without manual configuration
- **Market Analysis**: Ask about cheapest coins, most expensive, top gainers/losers, market leaders
- **Live Data Integration**: Real-time price data for mentioned cryptocurrencies
- **Free AI Integration**: Uses Hugging Face API for intelligent responses
- **Rule-based Fallback**: Smart responses even without AI API
- **Context-Aware**: Provides relevant crypto education and market insights

### 🎨 **Modern UI/UX**

- Responsive design built with Tailwind CSS
- Reusable component architecture (Text, Dropdown, Pagination, CoinCard)
- Loading states and error handling
- Smooth animations and transitions
- Mobile-friendly interface

### ⚡ **Performance Optimized**

- Built on Next.js 15 with App Router
- TanStack Query for intelligent caching and data synchronization
- API route proxying to avoid CORS issues
- Optimized bundle size and fast loading times

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS + Tailwind Merge
- **State Management**: TanStack Query (React Query) for server state
- **API**: CoinGecko API (free tier) with Next.js API routes
- **AI**: Hugging Face Inference API (free tier)
- **Charts**: Recharts for interactive price charts
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Utils**: clsx for conditional classes

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

4. Set up environment variables (optional):

```bash
cp .env.example .env.local
# Add your API keys for enhanced features:
# HUGGINGFACE_API_KEY=your_huggingface_key_here (for AI chatbot)
# COINGECKO_API_KEY=your_coingecko_key_here (for higher rate limits)
```

**Note**: The app works perfectly without any API keys! The chatbot has intelligent fallbacks, and CoinGecko's free tier is used by default.

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
crypto-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with QueryProvider
│   │   ├── page.tsx              # Main dashboard with coin grid
│   │   └── api/
│   │       ├── coins/route.ts    # CoinGecko market data proxy
│   │       ├── coin/[id]/route.ts # Individual coin data proxy
│   │       ├── search/route.ts   # Coin search proxy
│   │       └── chatbot/route.ts  # AI chatbot with smart coin detection
│   ├── components/
│   │   ├── CoinCard.tsx          # Individual coin display cards
│   │   ├── CoinModal.tsx         # Detailed coin info modal
│   │   ├── PriceChart.tsx        # Interactive price charts
│   │   ├── Chatbot/
│   │   │   ├── ChatBox.tsx       # Chat interface container
│   │   │   ├── ChatInput.tsx     # Message input with validation
│   │   │   └── ChatMessage.tsx   # Individual chat messages
│   │   ├── ui/
│   │   │   ├── Text.tsx          # Reusable typography component
│   │   │   ├── Dropdown.tsx      # Reusable select component
│   │   │   ├── Pagination.tsx    # Smart pagination component
│   │   │   ├── LoadingSpinner.tsx # Loading states
│   │   │   └── types.ts          # Shared UI component types
│   │   └── types.ts              # Component type definitions
│   ├── hooks/
│   │   └── useCryptoQuery.ts     # React Query hooks for crypto data
│   ├── lib/
│   │   ├── api.ts                # Axios configuration
│   │   ├── constants.ts          # App constants
│   │   ├── queryClient.ts        # React Query client setup
│   │   └── utils.ts              # Utility functions (cn, etc.)
│   ├── providers/
│   │   └── QueryProvider.tsx     # React Query provider wrapper
│   └── types/
│       └── crypto.ts             # Cryptocurrency data types
└── public/                       # Static assets
```

## 🚀 How to Use

### 💬 **AI Chatbot Examples**

The chatbot can handle various types of crypto questions:

**Market Analysis:**

- _"What coin trades for the least?"_ → Shows 5 cheapest cryptocurrencies
- _"What are the biggest gainers today?"_ → Top 5 gainers with percentages
- _"Which coins are most expensive?"_ → Top 5 highest-priced coins
- _"What are the largest cryptocurrencies?"_ → Top 5 by market cap

**Specific Coin Questions:**

- _"How much is Bitcoin trading for?"_ → Live BTC price and 24h change
- _"Tell me about Ethereum"_ → ETH price + educational information
- _"What's the price of TRON?"_ → Live TRON data (works with ANY coin!)

**Educational Questions:**

- _"What is blockchain?"_ → Crypto education and explanations
- _"How does DeFi work?"_ → Detailed explanations with context

### 📊 **Dashboard Features**

1. **Browse Coins**: View paginated list of cryptocurrencies
2. **Customize View**: Select 10, 25, 50, or 100 coins per page
3. **Coin Details**: Click any coin card to open detailed modal
4. **Price Charts**: View interactive charts with multiple time periods
5. **Chat**: Click the chat button to ask the AI questions

### 🎯 **Key Interactions**

- **Coin Cards**: Hover effects, click to open modal
- **Pagination**: Navigate through thousands of cryptocurrencies
- **Charts**: Interactive tooltips, time period selection
- **Chat**: Real-time responses with live market data

## 🔧 Development

### **Architecture Highlights**

- **Component-Driven**: Reusable UI components with consistent design
- **Type-Safe**: Full TypeScript coverage with proper interfaces
- **Performance**: React Query caching, optimized re-renders
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: ARIA labels, keyboard navigation, semantic HTML

### **Key Development Features**

- **Hot Reload**: Instant updates during development
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton components and spinners
- **API Proxying**: CORS-free API calls through Next.js routes
- **Smart Caching**: Intelligent data fetching and caching strategies

## 📜 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript compiler checks

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use existing component patterns
- Add proper error handling
- Include loading states
- Write descriptive commit messages
- Test your changes thoroughly

## 🚀 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/crypto-dashboard)

1. Connect your GitHub repository to Vercel
2. Set environment variables (optional):
   - `HUGGINGFACE_API_KEY` for enhanced AI responses
   - `COINGECKO_API_KEY` for higher rate limits
3. Deploy automatically on every push

### **Other Platforms**

- **Netlify**: Works out of the box with Next.js
- **Railway**: Easy deployment with database support
- **Docker**: Dockerfile included for containerized deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CoinGecko** for providing free cryptocurrency data
- **Hugging Face** for free AI inference
- **Vercel** for Next.js and hosting platform
- **Tailwind CSS** for the amazing utility-first CSS framework

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**
