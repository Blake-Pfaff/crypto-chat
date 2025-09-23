import axios from "axios";

export const coinGeckoApi = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const apiEndpoints = {
  getMarketData: (page = 1, perPage = 50) =>
    `/coins?page=${page}&per_page=${perPage}`,
  getCoinDetails: (id: string) => `/coin/${id}`, // Note: /coin/ not /coins/
  searchCoins: (query: string) => `/search?q=${encodeURIComponent(query)}`,
} as const;
