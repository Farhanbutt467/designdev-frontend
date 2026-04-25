"use client";

import { useTheme } from "next-themes";
import { useMode } from "@/context/app.context";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const { setMode } = useMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("w-10 h-10", className)} />;
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setMode(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-11 h-6 rounded-full border border-border transition-all duration-300 focus:outline-none flex items-center px-1 bg-background hover:border-theme",
        className
      )}
      aria-label="Toggle Theme"
    >
      <div
        className={cn(
          "absolute w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center shadow-sm z-10",
          theme === "dark"
            ? "translate-x-5 bg-text-2 text-text"
            : "translate-x-0 bg-text text-text-2"
        )}
      >
        {theme === "dark" ? (
          <FaMoon className="w-2.5 h-2.5" />
        ) : (
          <FaSun className="w-2.5 h-2.5" />
        )}
      </div>
      <div className="flex justify-between w-full px-1 pointer-events-none opacity-20">
        <FaSun className="w-2.5 h-2.5" />
        <FaMoon className="w-2.5 h-2.5" />
      </div>
    </button>
  );
};

export default ThemeToggle;
