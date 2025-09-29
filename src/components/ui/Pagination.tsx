"use client";

import { Text } from "./Text";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../types";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;

    const centerPages = Array.from(
      { length: delta * 2 + 1 },
      (_, i) => currentPage - delta + i
    ).filter((page) => page > 1 && page < totalPages);

    const pages = [
      1,
      ...(currentPage - delta > 2 ? ["..."] : []),
      ...centerPages,
      ...(currentPage + delta < totalPages - 1 ? ["..."] : []),
      ...(totalPages > 1 ? [totalPages] : []),
    ];

    return pages.filter(
      (page, index, arr) => arr.findIndex((p) => p === page) === index
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all duration-200 cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <button
          key={`${page}-${index}`} // Better key for mixed types
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page !== "number"}
          className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : typeof page === "number"
              ? "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              : "border-transparent cursor-default"
          }`}
          aria-label={
            typeof page === "number" ? `Go to page ${page}` : undefined
          }
        >
          <Text
            size="sm"
            color={page === currentPage ? "primary" : "secondary"}
            className={page === currentPage ? "text-white" : ""}
          >
            {page}
          </Text>
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all duration-200 cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );
}
