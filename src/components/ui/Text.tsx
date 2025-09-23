import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children: ReactNode;
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

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const weightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const colorClasses = {
  primary: "text-gray-900 dark:text-gray-100",
  secondary: "text-gray-600 dark:text-gray-400",
  success: "text-green-600 dark:text-green-400",
  danger: "text-red-600 dark:text-red-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  muted: "text-gray-500 dark:text-gray-500",
};

export function Text({
  children,
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "primary",
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
