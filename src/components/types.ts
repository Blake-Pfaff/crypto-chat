import { CoinMarketData } from "@/types/crypto";

export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

// Text Component Types
export interface TextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "muted";
  className?: string;
}

// Pagination Types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Loading Spinner Types
export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface CoinModalProps {
  coin: import("@/types/crypto").CoinMarketData | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface CoinCardProps {
  coin: CoinMarketData;
  onClick?: () => void;
}

export interface PriceData {
  time: string;
  price: number;
  timestamp: number;
}

export interface PriceChartProps {
  data: number[];
  coinName: string;
  currentPrice: number;
  isPositive: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "muted";
export type SizeVariant =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";
export type WeightVariant =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
