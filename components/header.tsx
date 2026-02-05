"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

interface HeaderProps {
    currentPage?: "home" | "writing" | "post";
}

export default function Header({ currentPage = "home" }: HeaderProps) {
    const { isDark, toggleTheme } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <header className="flex items-center justify-between mb-16">
            <h1 className={`text-xl md:text-2xl lg:text-3xl font-medium ${textPrimary}`}>
                <Link href="/">
                    kushal praja
                </Link>
            </h1>
            <div className="flex items-center gap-6">
                <nav className={`flex items-center gap-6 text-sm`}>
                    {currentPage === "home" && (
                        <Link href="/writing" className={`${textPrimary} animate-underline`}>Writing</Link>
                    )}
                    {(currentPage === "writing" || currentPage === "post") && (
                        <Link href="/writing" className={`${textPrimary} animate-underline ${currentPage === "writing" ? "underline underline-offset-2" : ""}`}>Writing</Link>
                    )}
                </nav>
                <button
                    onClick={toggleTheme}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border ${border} ${textSecondary} ${isDark ? 'hover:bg-white/6 hover:text-white' : 'hover:bg-black/6 hover:text-black'}`}
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <svg suppressHydrationWarning aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                    ) : (
                        <svg suppressHydrationWarning aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
}
