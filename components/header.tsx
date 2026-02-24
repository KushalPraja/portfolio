"use client";

import { useTheme } from "@/lib/theme-context";

export default function Header() {
    const { isDark, toggleTheme } = useTheme();

    const textSecondary = isDark ? "text-white/50" : "text-[#0a0a0a]/50";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <header className="fixed top-6 right-6 z-50">
            <button
                onClick={toggleTheme}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${border} ${textSecondary} ${isDark ? "hover:bg-white/6 hover:text-white" : "hover:bg-black/6 hover:text-black"} transition-colors`}
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <svg suppressHydrationWarning aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                ) : (
                    <svg suppressHydrationWarning aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                )}
            </button>
        </header>
    );
}
