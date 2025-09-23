// API Configuration
export const COINGECKO_BASE_URL =
  process.env.COINGECKO_API_URL || "https://api.coingecko.com/api/v3";
// You can add other constants here too
export const DEFAULT_PAGE_SIZE = 50;
export const API_TIMEOUT = 10000;
export const CACHE_TIME = {
  MARKET_DATA: 1000 * 60 * 5, // 5 minutes
  COIN_DETAILS: 1000 * 60 * 10, // 10 minutes
} as const;
