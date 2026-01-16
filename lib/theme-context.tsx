"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with dark mode as default
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage after mounting
  useEffect(() => {
    setMounted(true);

    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== null) {
        const newIsDark = storedTheme === "dark";
        setIsDark(newIsDark);

        // Immediately update the DOM
        document.documentElement.classList.toggle("dark", newIsDark);
        document.documentElement.classList.toggle("light", !newIsDark);
      } else if (window.matchMedia) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(prefersDark.matches);
        document.documentElement.classList.toggle("dark", prefersDark.matches);
        document.documentElement.classList.toggle("light", !prefersDark.matches);

        // Listen for system theme changes and update if user has not set a preference
        const handleChange = (e: MediaQueryListEvent) => {
          try {
            if (localStorage.getItem("theme") === null) {
              setIsDark(e.matches);
              document.documentElement.classList.toggle("dark", e.matches);
              document.documentElement.classList.toggle("light", !e.matches);
            }
          } catch (err) {
            console.error("Error handling prefers-color-scheme change:", err);
          }
        };

        // modern browsers support addEventListener on MediaQueryList
        prefersDark.addEventListener("change", handleChange);

        // cleanup will remove listener below
      } else {
        // Fallback: default to dark
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
    } catch (error) {
      console.error("Failed to read theme:", error);
      // On error, ensure dark mode
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }, [isDark, mounted]);

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
