import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_BASE_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    const url = `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching coins:", error);
    return NextResponse.json(
      { error: "Failed to search coins" },
      { status: 500 }
    );
  }
}
