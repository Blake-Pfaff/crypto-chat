import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const coinGeckoApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiEndpoints = {
  getMarketData: (page = 1, perPage = 50) =>
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=24h`,
  getCoinDetails: (id: string) => `/coins/${id}`,
  searchCoins: (query: string) => `/search?query=${query}`,
} as const;
