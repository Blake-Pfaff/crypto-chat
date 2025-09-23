import { NextRequest, NextResponse } from "next/server";
import { COINGECKO_BASE_URL } from "@/lib/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const url = `${COINGECKO_BASE_URL}/coins/${id}`;

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
    console.error("Error fetching coin details:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin details" },
      { status: 500 }
    );
  }
}
