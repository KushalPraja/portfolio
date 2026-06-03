"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

export default function Footer() {
    const { isDark } = useTheme();

    const textSecondary = isDark ? "text-white/30" : "text-[#1a1a1a]/40";
    const linkHover = isDark ? "hover:text-white/70" : "hover:text-[#1a1a1a]/80";

    return (
        <footer className={`flex gap-6 text-[12px] tracking-wide uppercase font-light ${textSecondary}`}>
            <Link href="/writing" className={`${linkHover} transition-colors duration-300`}>Writing</Link>
            <a href="https://x.com/KushalPraj" target="_blank" rel="noopener noreferrer" className={`${linkHover} transition-colors duration-300`}>Twitter</a>
            <a href="https://github.com/KushalPraja" target="_blank" rel="noopener noreferrer" className={`${linkHover} transition-colors duration-300`}>GitHub</a>
        </footer>
    );
}
