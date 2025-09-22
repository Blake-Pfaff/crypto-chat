"use client";

import { useMarketData } from "@/hooks/useCryptoQuery";

export default function Home() {
  const { data: coins, isLoading, error } = useMarketData(1, 10);

  if (isLoading)
    return (
      <div className="min-h-screen bg-blue-500 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">LOADING...</h1>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">ERROR!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-500 p-8">
      <h1 className="text-6xl font-bold text-white mb-8">CRYPTO DATA WORKS!</h1>
      <div className="grid gap-4">
        {coins?.slice(0, 5).map((coin) => (
          <div key={coin.id} className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h2>
            <p className="text-lg">${coin.current_price.toLocaleString()}</p>
            <p
              className={
                coin.price_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
