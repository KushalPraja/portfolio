"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const applyTheme = (nextIsDark: boolean) => {
    const root = document.documentElement;
    const bg = nextIsDark ? "#1a1a1a" : "#efefef";

    root.classList.remove("dark", "light");
    root.classList.add(nextIsDark ? "dark" : "light");
    root.style.colorScheme = nextIsDark ? "dark" : "light";
    root.style.backgroundColor = bg;

    if (document.body) {
      document.body.style.backgroundColor = bg;
    }
  };

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      const nextIsDark =
        storedTheme === "dark" ||
        (storedTheme === null && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

      setIsDark(nextIsDark);
      applyTheme(nextIsDark);
    } catch {
      setIsDark(true);
      applyTheme(true);
    }
  }, []);

  useEffect(() => {
    applyTheme(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // no-op
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
