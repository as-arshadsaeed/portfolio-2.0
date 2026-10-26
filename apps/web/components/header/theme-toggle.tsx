"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  className?: string;
}

export default function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-colors duration-300",
        className,
      )}
    >
      <Sun
        className={clsx(
          "absolute h-5 w-5 transition-all duration-500",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        )}
      />

      <Moon
        className={clsx(
          "absolute h-5 w-5 transition-all duration-500",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}
