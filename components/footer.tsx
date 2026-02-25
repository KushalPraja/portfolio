"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

export default function Footer() {
    const { isDark } = useTheme();

    const textSecondary = isDark ? "text-white/50" : "text-[#0a0a0a]/50";
    const linkHover = isDark ? "hover:text-white" : "hover:text-[#0a0a0a]";

    return (
        <footer className={`flex gap-4 text-[15px] pt-4 ${textSecondary}`}>
            <Link href="/writing" className={`animate-underline ${linkHover} transition-colors`}>Writing</Link>
            <a href="https://x.com/KushalPraj" target="_blank" rel="noopener noreferrer" className={`animate-underline ${linkHover} transition-colors`}>Twitter</a>
            <a href="https://github.com/KushalPraja" target="_blank" rel="noopener noreferrer" className={`animate-underline ${linkHover} transition-colors`}>GitHub</a>
        </footer>
    );
}
