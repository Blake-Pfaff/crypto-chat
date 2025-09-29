"use client";
import { useState } from "react";
import { useMarketData } from "@/hooks/useCryptoQuery";
import { CoinCard } from "@/components/CoinCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Text } from "@/components/ui/Text";
import { Dropdown } from "@/components/ui/Dropdown";

const PER_PAGE_OPTIONS = [
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
  { value: 100, label: "100 per page" },
];

export default function Home() {
  const [perPage, setPerPage] = useState(25);
  const { data: coins, isLoading, error } = useMarketData(1, perPage);

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
        <div className="flex justify-end mb-8">
          <Dropdown
            options={PER_PAGE_OPTIONS}
            value={perPage}
            onChange={(value) => setPerPage(Number(value))}
            className="w-48"
          />
        </div>
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
