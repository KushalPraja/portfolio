"use client";

import { useTheme } from "@/lib/theme-context";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    const { isDark } = useTheme();

    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <footer className={`mt-16 pt-8 border-t ${border}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className={`flex gap-4 ${textMuted}`}>
                    <a
                        href="mailto:k2prajap@uwaterloo.ca"
                        className="group"
                        aria-label="Email"
                    >
                        <Mail size={18} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                    <a
                        href="https://github.com/KushalPraja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        aria-label="GitHub"
                    >
                        <Github size={18} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kushalpraja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={18} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                    <a
                        href="https://x.com/KushalPraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        aria-label="Twitter"
                    >
                        <Twitter size={18} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                </div>

                <div className={`text-xs ${textMuted}`}>
                    <span>© {new Date().getFullYear()} Kushal Prajapati</span>
                </div>
            </div>
        </footer>
    );
}
