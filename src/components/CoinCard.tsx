import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { CoinCardProps } from "./types";

export function CoinCard({ coin, onClick }: CoinCardProps) {
  const isPositive = (coin.price_change_percentage_24h ?? 0) > 0;

  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1 mr-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <Text as="h3" size="lg" weight="semibold" className="truncate">
              {coin.name}
            </Text>
            <Text size="sm" color="secondary" className="truncate">
              {coin.symbol.toUpperCase()}
            </Text>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Text size="lg" weight="bold">
            ${coin.current_price?.toLocaleString() ?? "N/A"}
          </Text>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="min-w-0 flex-1 mr-4">
          <Text size="sm" color="secondary">
            Market Cap
          </Text>
          <Text size="sm" weight="medium" className="truncate">
            ${coin.market_cap?.toLocaleString() ?? "N/A"}
          </Text>
        </div>
        <div className="text-right flex-shrink-0">
          <Text size="sm" color="secondary">
            24h Change
          </Text>
          <Text
            size="sm"
            weight="medium"
            color={isPositive ? "success" : "danger"}
          >
            {isPositive ? "+" : ""}
            {coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
          </Text>
        </div>
      </div>
    </div>
  );
}
