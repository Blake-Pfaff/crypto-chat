import { CoinMarketData } from "@/types/crypto";
import { Text } from "@/components/ui/Text";

interface CoinCardProps {
  coin: CoinMarketData;
  onClick?: () => void;
}

export function CoinCard({ coin, onClick }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <Text as="h3" size="lg" weight="semibold">
              {coin.name}
            </Text>
            <Text size="sm" color="secondary">
              {coin.symbol.toUpperCase()}
            </Text>
          </div>
        </div>
        <Text size="lg" weight="bold">
          ${coin.current_price.toLocaleString()}
        </Text>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Text size="sm" color="secondary">
            Market Cap
          </Text>
          <Text size="sm" weight="medium">
            ${coin.market_cap.toLocaleString()}
          </Text>
        </div>
        <div className="text-right">
          <Text size="sm" color="secondary">
            24h Change
          </Text>
          <Text
            size="sm"
            weight="medium"
            color={isPositive ? "success" : "danger"}
          >
            {isPositive ? "+" : ""}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </div>
      </div>
    </div>
  );
}
