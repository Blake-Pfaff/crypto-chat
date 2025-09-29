"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Text } from "./ui/Text";
import { CoinMarketData } from "@/types/crypto";
import { useCoinDetails } from "@/hooks/useCryptoQuery";
import { CoinModalProps } from "./ui/types";

export function CoinModal({ coin, isOpen, onClose }: CoinModalProps) {
  const { data: coinDetails, isLoading } = useCoinDetails(coin?.id || "");

  if (!coin) return null;

  const isPositive = (coin.price_change_percentage_24h ?? 0) > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <Text as="h2" size="2xl" weight="bold">
                    {coin.name}
                  </Text>
                  <Text color="secondary">
                    {coin.symbol.toUpperCase()} • Rank #{coin.market_cap_rank}
                  </Text>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hover:cursor-pointer hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100%-120px)]">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Price Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                  >
                    <div>
                      <Text size="sm" color="secondary" className="mb-2">
                        Current Price
                      </Text>
                      <Text size="4xl" weight="bold">
                        ${coin.current_price?.toLocaleString() ?? "N/A"}
                      </Text>
                      <div className="flex items-center space-x-2 mt-2">
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <Text
                          color={isPositive ? "success" : "danger"}
                          weight="medium"
                        >
                          {isPositive ? "+" : ""}
                          {coin.price_change_percentage_24h?.toFixed(2) ??
                            "N/A"}
                          % (24h)
                        </Text>
                      </div>
                    </div>

                    {/* Market Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <Text size="sm" color="secondary" className="mb-1">
                          Market Cap
                        </Text>
                        <Text weight="semibold">
                          ${coin.market_cap?.toLocaleString() ?? "N/A"}
                        </Text>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <Text size="sm" color="secondary" className="mb-1">
                          24h Volume
                        </Text>
                        <Text weight="semibold">
                          ${coin.total_volume?.toLocaleString() ?? "N/A"}
                        </Text>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <Text size="sm" color="secondary" className="mb-1">
                          Circulating Supply
                        </Text>
                        <Text weight="semibold">
                          {coin.circulating_supply?.toLocaleString() ?? "N/A"}
                        </Text>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <Text size="sm" color="secondary" className="mb-1">
                          Total Supply
                        </Text>
                        <Text weight="semibold">
                          {coin.total_supply?.toLocaleString() ?? "N/A"}
                        </Text>
                      </div>
                    </div>
                  </motion.div>

                  {/* Description & Links */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    {coinDetails?.description?.en && (
                      <div>
                        <Text size="lg" weight="semibold" className="mb-3">
                          About {coin.name}
                        </Text>
                        <Text color="secondary" className="leading-relaxed">
                          {coinDetails.description.en.slice(0, 300)}...
                        </Text>
                      </div>
                    )}

                    {/* Chart Placeholder */}
                    <div>
                      <Text size="lg" weight="semibold" className="mb-3">
                        Price Chart (7 days)
                      </Text>
                      <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                        <Text color="secondary">Chart coming soon...</Text>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
