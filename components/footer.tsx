"use client";

import { useTheme } from "@/lib/theme-context";

export default function Footer() {
    const { isDark } = useTheme();

    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <footer className={`mt-16 pt-8 border-t ${border}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className={`flex gap-4 text-xs ${textMuted}`}>
                    <a
                        href="mailto:k2prajap@uwaterloo.ca"
                        className="hover:text-white transition-colors"
                        aria-label="Email"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/KushalPraja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.184.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.14 20.164 22 16.413 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kushalpraja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="LinkedIn"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>
                    <a
                        href="https://x.com/KushalPraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="Twitter"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 9-0.5 11-5-2.25 1.5-5 1.5-7.5 0" />
                        </svg>
                    </a>
                </div>

                <div className={`text-xs ${textMuted}`}>
                    <span>© {new Date().getFullYear()} Kushal Prajapati</span>
                </div>
            </div>
        </footer>
    );
}
