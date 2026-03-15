"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-[#1A1A18]/20 dark:border-white/20 bg-white/80 dark:bg-black/60 backdrop-blur-md hover:scale-110 transition-all shadow-sm"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm9-9h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM5 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zm11.95-6.36-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.41zM6.05 17.95l-1.41 1.41a1 1 0 0 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.41zm12.32 1.41-1.41-1.41a1 1 0 0 0-1.41 1.41l1.41 1.41a1 1 0 0 0 1.41-1.41zM6.05 6.05 4.64 4.64a1 1 0 0 0-1.41 1.41l1.41 1.41a1 1 0 0 0 1.41-1.41z"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#1A1A18]">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      )}
    </button>
  );
}