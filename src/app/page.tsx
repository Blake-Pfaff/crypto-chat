"use client";

import { useState } from "react";
import { useMarketData } from "@/hooks/useCryptoQuery";
import { CoinCard } from "@/components/CoinCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Text } from "@/components/ui/Text";
import { Dropdown } from "@/components/ui/Dropdown";
import { Pagination } from "@/components/ui/Pagination";
import type { CoinMarketData } from "@/types/crypto";
import { CoinModal } from "@/components/CoinModal";
import { ChatBox } from "@/components/Chatbot/ChatBox";
import { MessageCircle } from "lucide-react";

const PER_PAGE_OPTIONS = [
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
  { value: 100, label: "100 per page" },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [selectedCoin, setSelectedCoin] = useState<CoinMarketData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { data: coins, isLoading, error } = useMarketData(currentPage, perPage);
  const totalPages = Math.min(Math.ceil(13000 / perPage), 100);

  const handlePerPageChange = (value: string | number) => {
    setPerPage(Number(value));
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center p-8">
          <Text size="2xl" weight="bold" color="danger" className="mb-4">
            Failed to load crypto data
          </Text>
          <Text color="secondary">
            Please check your connection and try again
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Text as="h1" size="5xl" weight="bold" className="mb-4">
            Crypto Dashboard
          </Text>
          <Text size="lg" color="secondary">
            Real-time cryptocurrency market data and insights
          </Text>
        </div>

        {/* Controls Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div>
                <Text size="sm" color="secondary" className="mb-1">
                  Current Page
                </Text>
                <Text size="lg" weight="semibold">
                  {currentPage} of {totalPages.toLocaleString()}
                </Text>
              </div>
              <div>
                <Text size="sm" color="secondary" className="mb-1">
                  Showing Coins
                </Text>
                <Text size="lg" weight="semibold">
                  {coins?.length || 0} coins
                </Text>
              </div>
              <div>
                <Text size="sm" color="secondary" className="mb-1">
                  Total Available
                </Text>
                <Text size="lg" weight="semibold">
                  13,000+ coins
                </Text>
              </div>
            </div>

            {/* Per Page Selector */}
            <div className="flex items-center gap-3">
              <Text size="sm" color="secondary" className="whitespace-nowrap">
                Show:
              </Text>
              <Dropdown
                options={PER_PAGE_OPTIONS}
                value={perPage}
                onChange={handlePerPageChange}
                className="w-36"
              />
            </div>
          </div>
        </div>

        {/* Coin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {coins
            ?.filter((coin) => coin !== null)
            .map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onClick={() => {
                  setSelectedCoin(coin);
                  setIsModalOpen(true);
                }}
              />
            ))}
        </div>

        {/* Pagination Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Page Info */}
            <Text color="secondary">
              Showing {(currentPage - 1) * perPage + 1} to{" "}
              {Math.min(currentPage * perPage, 13000)} of 13,000+
              cryptocurrencies
            </Text>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Text size="sm" color="secondary">
            Data provided by CoinGecko • Updated every 5 minutes
          </Text>
        </div>
      </div>
      {CoinModal && (
        <CoinModal
          coin={selectedCoin}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 left-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
