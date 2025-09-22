import { useQuery } from "@tanstack/react-query";
import { coinGeckoApi, apiEndpoints } from "@/lib/api";
import type { CoinMarketData, CoinDetails } from "@/types/crypto";

// Custom hook for market data
export function useMarketData(page = 1, perPage = 50) {
  return useQuery({
    queryKey: ["marketData", page, perPage],
    queryFn: async (): Promise<CoinMarketData[]> => {
      const response = await coinGeckoApi.get(
        apiEndpoints.getMarketData(page, perPage)
      );
      return response.data;
    },
  });
}

// Custom hook for coin details
export function useCoinDetails(coinId: string) {
  return useQuery({
    queryKey: ["coinDetails", coinId],
    queryFn: async (): Promise<CoinDetails> => {
      const response = await coinGeckoApi.get(
        apiEndpoints.getCoinDetails(coinId)
      );
      return response.data;
    },
    enabled: !!coinId,
  });
}
