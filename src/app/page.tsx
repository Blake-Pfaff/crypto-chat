"use client";

import { useMarketData } from "@/hooks/useCryptoQuery";
import { CoinCard } from "@/components/CoinCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Text } from "@/components/ui/Text";

export default function Home() {
  const { data: coins, isLoading, error } = useMarketData(1, 10);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <Text size="2xl" weight="bold" color="danger">
          Failed to load crypto data
        </Text>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <Text as="h1" size="4xl" weight="bold" className="mb-8 text-center">
          Crypto Dashboard
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins?.map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              onClick={() => console.log("Navigate to", coin.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
