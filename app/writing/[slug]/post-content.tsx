"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReactMarkdown from "react-markdown";

interface PostContentProps {
    title: string;
    date: string;
    readTime: string;
    content: string;
    tags?: string[];
}

export default function PostContent({ title, date, content }: PostContentProps) {
    const { isDark } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/55" : "text-[#0a0a0a]/55";
    const textMuted = isDark ? "text-white/35" : "text-[#0a0a0a]/35";
    const codeBg = isDark ? "bg-white/5" : "bg-black/5";

    return (
        <>
        <Header />
        <main className="min-h-screen px-6 pt-20 pb-12 max-w-xl mx-auto">

            {/* Back arrow + Title */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-1">
                    <Link href="/writing" className={`text-sm ${textMuted} hover:${textPrimary} transition-colors`} aria-label="Back">
                        ‹
                    </Link>
                    <h1 className={`text-lg font-bold tracking-tight ${textPrimary}`}>{title}</h1>
                </div>
                <p className={`text-sm ${textMuted}`}>{date}</p>
            </div>

            {/* Post Content */}
            <article className={`${textSecondary} leading-relaxed space-y-5 text-[15px]`}>
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className={`text-xl font-medium ${textPrimary} mt-8 mb-3`}>{children}</h1>,
                        h2: ({ children }) => <h2 className={`text-lg font-medium ${textPrimary} mt-8 mb-3`}>{children}</h2>,
                        h3: ({ children }) => <h3 className={`text-base font-medium ${textPrimary} mt-6 mb-2`}>{children}</h3>,
                        p: ({ children }) => <p className="mb-4">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc ml-5 mb-4 space-y-1.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-5 mb-4 space-y-1.5">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className={`${textPrimary} animate-underline`}>
                                {children}
                            </a>
                        ),
                        code: ({ className, children }) => {
                            const isBlock = className?.includes("language-");
                            return isBlock ? (
                                <code className={`block ${codeBg} p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4`}>{children}</code>
                            ) : (
                                <code className={`${codeBg} ${textPrimary} px-1.5 py-0.5 rounded text-sm font-mono`}>{children}</code>
                            );
                        },
                        pre: ({ children }) => <pre className="mb-4">{children}</pre>,
                        blockquote: ({ children }) => (
                            <blockquote className={`border-l-2 ${isDark ? "border-white/15" : "border-black/15"} pl-4 italic ${textMuted}`}>
                                {children}
                            </blockquote>
                        ),
                        hr: () => <hr className={`my-6 ${isDark ? "border-white/10" : "border-black/10"}`} />,
                        strong: ({ children }) => <strong className={`font-semibold ${textPrimary}`}>{children}</strong>,
                        img: ({ src, alt }) => {
                            if (!src) return null;
                            const isVideo = typeof src === "string" && /\.(mp4|webm|ogg)$/i.test(src);
                            
                            if (isVideo) {
                                return (
                                    <span className="block my-6">
                                        <video src={src} controls className="w-full rounded-lg" preload="metadata">
                                            {alt && alt}
                                        </video>
                                    </span>
                                );
                            }
                            
                            return (
                                <span className="block my-6">
                                    <img src={src} alt={alt || ""} className="w-full rounded-lg" />
                                </span>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>

            <div className="mt-12">
                <Footer />
            </div>
        </main>
        </>
    );
}
