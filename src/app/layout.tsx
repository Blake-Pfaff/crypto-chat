import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description:
    "Interactive crypto dashboard with AI chatbot for real-time cryptocurrency data and insights",
  keywords: [
    "cryptocurrency",
    "crypto",
    "dashboard",
    "bitcoin",
    "ethereum",
    "AI",
    "chatbot",
    "market data",
  ],
  authors: [{ name: "Blake Pfaff" }],
  creator: "Blake Pfaff",
  publisher: "Blake Pfaff",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/icon-192", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  themeColor: "#F7931A",
  colorScheme: "light dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
