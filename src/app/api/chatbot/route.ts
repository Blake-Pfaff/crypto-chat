import { NextRequest, NextResponse } from "next/server";

// Type for CoinGecko API responses
type CoinGeckoMarketData = {
  name: string;
  symbol: string;
  id: string;
  current_price: number;
  market_cap?: number;
  price_change_percentage_24h?: number;
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get crypto context if coins are mentioned
    const cryptoContext = await getCryptoContext(message);

    // First check if it's a market analysis question
    const marketAnalysis = await handleMarketAnalysisQuestion(message);
    if (marketAnalysis) {
      return NextResponse.json({ response: marketAnalysis });
    }

    // Generate AI response using free Hugging Face API
    const response = await generateFreeAIResponse(message, cryptoContext);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}

// Free AI using Hugging Face
async function generateFreeAIResponse(
  message: string,
  cryptoContext: string
): Promise<string> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    return getSmartRuleBasedResponse(message, cryptoContext);
  }

  try {
    // Create context-aware prompt
    const prompt = cryptoContext
      ? `Context: ${cryptoContext}\n\nUser: ${message}\nCrypto Assistant:`
      : `User: ${message}\nCrypto Assistant:`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 150,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
          },
        }),
      }
    );

    const data = await response.json();

    if (data && data[0]?.generated_text) {
      // Extract just the assistant's response
      const fullResponse = data[0].generated_text;
      const assistantResponse = fullResponse
        .split("Crypto Assistant:")
        .pop()
        ?.trim();
      return (
        assistantResponse || getSmartRuleBasedResponse(message, cryptoContext)
      );
    } else {
      return getSmartRuleBasedResponse(message, cryptoContext);
    }
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return getSmartRuleBasedResponse(message, cryptoContext);
  }
}

// Enhanced rule-based fallback with live data
function getSmartRuleBasedResponse(
  message: string,
  cryptoContext: string
): string {
  const lowerMessage = message.toLowerCase();

  // If we have crypto context (live data), use it
  if (cryptoContext && cryptoContext !== "No specific coins mentioned.") {
    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("much") ||
      lowerMessage.includes("cost")
    ) {
      return `Based on current market data:\n${cryptoContext}\n\nCrypto prices are constantly changing due to market demand, news, and trading activity. Always check multiple sources before making decisions!`;
    }
  }

  // Intelligent responses based on context
  if (lowerMessage.includes("bitcoin") || lowerMessage.includes("btc")) {
    return cryptoContext
      ? `${cryptoContext}\n\nBitcoin is the first and largest cryptocurrency, often called "digital gold" due to its store of value properties and limited supply of 21 million coins.`
      : 'Bitcoin (BTC) is the first cryptocurrency, created by Satoshi Nakamoto in 2009. It\'s decentralized, has a limited supply of 21 million coins, and is often considered "digital gold."';
  }

  if (lowerMessage.includes("ethereum") || lowerMessage.includes("eth")) {
    return cryptoContext
      ? `${cryptoContext}\n\nEthereum is a blockchain platform that enables smart contracts and decentralized applications (dApps). It's the foundation for most DeFi protocols and NFTs.`
      : "Ethereum (ETH) is a blockchain platform that enables smart contracts and decentralized applications. It's the second-largest cryptocurrency and powers most DeFi and NFT projects.";
  }

  // More intelligent responses...
  return "I'm here to help with crypto questions! Ask me about specific coins, prices, blockchain technology, or market trends. I can provide current market data and educational information.";
}

// Get live crypto data with smart coin detection
async function getCryptoContext(message: string): Promise<string> {
  const coinMentions = await extractCoinMentions(message);

  if (coinMentions.length === 0) {
    return "No specific coins mentioned.";
  }

  try {
    const coinData = await Promise.all(
      coinMentions.map(async (coinId) => {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
        );
        const data = await response.json();
        return { coinId, data: data[coinId] };
      })
    );

    let context = "";
    coinData.forEach(({ coinId, data }) => {
      if (data) {
        const name =
          coinId.charAt(0).toUpperCase() + coinId.slice(1).replace(/-/g, " ");
        context += `${name}: $${data.usd} (24h: ${
          data.usd_24h_change?.toFixed(2) || "N/A"
        }%)\n`;
      }
    });

    return context || "Unable to fetch current crypto data.";
  } catch (error) {
    return "Unable to fetch current crypto data.";
  }
}

// Smart coin detection using CoinGecko search API
async function extractCoinMentions(message: string): Promise<string[]> {
  const lowerMessage = message.toLowerCase();

  // First check common coins for fast response (most frequent queries)
  const commonCoins: { [key: string]: string } = {
    bitcoin: "bitcoin",
    btc: "bitcoin",
    ethereum: "ethereum",
    eth: "ethereum",
    dogecoin: "dogecoin",
    doge: "dogecoin",
    cardano: "cardano",
    ada: "cardano",
    solana: "solana",
    sol: "solana",
    tron: "tron",
    trx: "tron",
    binancecoin: "binancecoin",
    bnb: "binancecoin",
    ripple: "ripple",
    xrp: "ripple",
  };

  const mentions: string[] = [];

  // Check common coins first (fast path)
  Object.keys(commonCoins).forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, "i");
    if (regex.test(lowerMessage)) {
      const coinId = commonCoins[key];
      if (!mentions.includes(coinId)) {
        mentions.push(coinId);
      }
    }
  });

  // If we found common coins, return them
  if (mentions.length > 0) {
    return mentions;
  }

  // Smart detection: Extract potential coin names and search CoinGecko
  const potentialCoins = await findPotentialCoins(message);
  return potentialCoins;
}

// Find potential coins using CoinGecko search API
async function findPotentialCoins(message: string): Promise<string[]> {
  try {
    // Extract words that could be coin names (2+ characters, not common words)
    const words = message
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(
        (word) =>
          word.length >= 2 &&
          ![
            "the",
            "and",
            "for",
            "are",
            "but",
            "not",
            "you",
            "all",
            "can",
            "had",
            "her",
            "was",
            "one",
            "our",
            "out",
            "day",
            "get",
            "has",
            "him",
            "his",
            "how",
            "man",
            "new",
            "now",
            "old",
            "see",
            "two",
            "who",
            "boy",
            "did",
            "its",
            "let",
            "put",
            "say",
            "she",
            "too",
            "use",
            "what",
            "much",
            "price",
            "coin",
            "crypto",
            "trading",
            "worth",
            "value",
            "cost",
            "buy",
            "sell",
          ].includes(word)
      );

    const coinIds: string[] = [];

    // Search each potential word
    for (const word of words.slice(0, 3)) {
      // Limit to first 3 potential coins to avoid too many API calls
      try {
        const searchResponse = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
            word
          )}`,
          {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(2000), // 2 second timeout
          }
        );

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();

          // Check if we found exact matches in coins
          if (searchData.coins && searchData.coins.length > 0) {
            const exactMatch = searchData.coins.find(
              (coin: { name: string; symbol: string; id: string }) =>
                coin.name.toLowerCase() === word ||
                coin.symbol.toLowerCase() === word ||
                coin.id.toLowerCase() === word
            );

            if (exactMatch && !coinIds.includes(exactMatch.id)) {
              coinIds.push(exactMatch.id);
            }
          }
        }
      } catch (error) {
        // Skip this word if search fails
        continue;
      }
    }

    return coinIds;
  } catch (error) {
    console.error("Smart coin detection error:", error);
    return [];
  }
}

// Handle market analysis questions
async function handleMarketAnalysisQuestion(
  message: string
): Promise<string | null> {
  const lowerMessage = message.toLowerCase();

  // Lowest price questions
  if (
    lowerMessage.includes("least") ||
    lowerMessage.includes("cheapest") ||
    lowerMessage.includes("lowest price")
  ) {
    return await getCheapestCoins();
  }

  // Highest price questions
  if (
    lowerMessage.includes("most expensive") ||
    lowerMessage.includes("highest price") ||
    lowerMessage.includes("priciest")
  ) {
    return await getMostExpensiveCoins();
  }

  // Best/worst performers
  if (
    lowerMessage.includes("best perform") ||
    lowerMessage.includes("biggest gain") ||
    lowerMessage.includes("top gainer")
  ) {
    return await getTopPerformers("gainers");
  }

  if (
    lowerMessage.includes("worst perform") ||
    lowerMessage.includes("biggest loss") ||
    lowerMessage.includes("top loser")
  ) {
    return await getTopPerformers("losers");
  }

  // Market cap questions
  if (
    lowerMessage.includes("largest") ||
    lowerMessage.includes("biggest market cap") ||
    lowerMessage.includes("top crypto")
  ) {
    return await getTopMarketCap();
  }

  return null; // No market analysis question detected
}

// Get cheapest coins
async function getCheapestCoins(): Promise<string> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_asc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return "I couldn't fetch the current market data. Please try again later.";
    }

    const cheapest = data.slice(0, 5); // Top 5 cheapest
    let response_text =
      "Here are the 5 cheapest cryptocurrencies by price:\n\n";

    cheapest.forEach((coin: CoinGeckoMarketData, index: number) => {
      const price =
        coin.current_price < 0.01
          ? coin.current_price.toFixed(6)
          : coin.current_price.toFixed(4);
      const change = coin.price_change_percentage_24h?.toFixed(2) || "N/A";
      response_text += `${index + 1}. ${
        coin.name
      } (${coin.symbol.toUpperCase()}): $${price} (24h: ${change}%)\n`;
    });

    response_text +=
      "\n💡 Remember: Low price doesn't mean good investment! Always research market cap, use case, and project fundamentals.";

    return response_text;
  } catch (error) {
    return "Sorry, I couldn't fetch the current market data. Please try again later.";
  }
}

// Get most expensive coins
async function getMostExpensiveCoins(): Promise<string> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return "I couldn't fetch the current market data. Please try again later.";
    }

    const expensive = data.slice(0, 5);
    let response_text =
      "Here are the 5 most expensive cryptocurrencies by price:\n\n";

    expensive.forEach((coin: CoinGeckoMarketData, index: number) => {
      const price = coin.current_price.toLocaleString();
      const change = coin.price_change_percentage_24h?.toFixed(2) || "N/A";
      response_text += `${index + 1}. ${
        coin.name
      } (${coin.symbol.toUpperCase()}): $${price} (24h: ${change}%)\n`;
    });

    response_text +=
      "\n💡 High price per coin doesn't always mean better investment! Market cap is more important than individual coin price.";

    return response_text;
  } catch (error) {
    return "Sorry, I couldn't fetch the current market data. Please try again later.";
  }
}

// Get top performers (gainers/losers)
async function getTopPerformers(type: "gainers" | "losers"): Promise<string> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return "I couldn't fetch the current market data. Please try again later.";
    }

    // Sort by 24h change
    const sorted = data
      .filter(
        (coin: CoinGeckoMarketData) => coin.price_change_percentage_24h !== null
      )
      .sort((a: CoinGeckoMarketData, b: CoinGeckoMarketData) => {
        const aChange = a.price_change_percentage_24h || 0;
        const bChange = b.price_change_percentage_24h || 0;
        return type === "gainers" ? bChange - aChange : aChange - bChange;
      })
      .slice(0, 5);

    const title = type === "gainers" ? "biggest gainers" : "biggest losers";
    let response_text = `Here are today's top 5 ${title} (24h):\n\n`;

    sorted.forEach((coin: CoinGeckoMarketData, index: number) => {
      const price =
        coin.current_price < 1
          ? coin.current_price.toFixed(4)
          : coin.current_price.toFixed(2);
      const change = (coin.price_change_percentage_24h || 0).toFixed(2);
      const emoji = type === "gainers" ? "📈" : "📉";
      response_text += `${index + 1}. ${
        coin.name
      } (${coin.symbol.toUpperCase()}): $${price} ${emoji} ${change}%\n`;
    });

    response_text += `\n💡 High volatility can mean high risk! Always research before investing.`;

    return response_text;
  } catch (error) {
    return "Sorry, I couldn't fetch the current market data. Please try again later.";
  }
}

// Get top market cap coins
async function getTopMarketCap(): Promise<string> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      return "I couldn't fetch the current market data. Please try again later.";
    }

    const top = data.slice(0, 5);
    let response_text =
      "Here are the top 5 cryptocurrencies by market cap:\n\n";

    top.forEach((coin: CoinGeckoMarketData, index: number) => {
      const price =
        coin.current_price < 1
          ? coin.current_price.toFixed(4)
          : coin.current_price.toFixed(2);
      const marketCap = ((coin.market_cap || 0) / 1000000000).toFixed(1); // Convert to billions
      const change = coin.price_change_percentage_24h?.toFixed(2) || "N/A";
      response_text += `${index + 1}. ${
        coin.name
      } (${coin.symbol.toUpperCase()}): $${price}\n   Market Cap: $${marketCap}B (24h: ${change}%)\n\n`;
    });

    response_text +=
      "💡 Market cap = Price × Circulating Supply. It's a better measure of a crypto's total value than just price per coin.";

    return response_text;
  } catch (error) {
    return "Sorry, I couldn't fetch the current market data. Please try again later.";
  }
}
