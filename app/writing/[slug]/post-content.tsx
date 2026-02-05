"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ReactMarkdown from "react-markdown";

interface PostContentProps {
    title: string;
    date: string;
    readTime: string;
    content: string;
    tags?: string[];
}

export default function PostContent({ title, date, readTime, content, tags }: PostContentProps) {
    const { isDark } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const codeBg = isDark ? "bg-white/5" : "bg-black/5";

    return (
        <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-3xl mx-auto">
            <Header currentPage="post" />

            {/* Post Header */}
            <div className="mb-12">
                <Link href="/writing" className={`text-sm ${textMuted} underline underline-offset-2`}>
                    ← Back to writing
                </Link>
                <h1 className={`text-2xl md:text-3xl font-medium ${textPrimary} mt-6 mb-3`}>{title}</h1>
                <div className={`flex items-center gap-4 text-sm ${textMuted}`}>
                    <span>{date}</span>
                    <span>•</span>
                    <span>{readTime} read</span>
                </div>
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag) => (
                            <span key={tag} className={`px-2 py-1 text-xs rounded ${codeBg} ${textSecondary}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Content */}
            <article className={`${textSecondary} leading-relaxed space-y-6`}>
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className={`text-2xl font-medium ${textPrimary} mt-10 mb-4`}>{children}</h1>,
                        h2: ({ children }) => <h2 className={`text-xl font-medium ${textPrimary} mt-10 mb-4`}>{children}</h2>,
                        h3: ({ children }) => <h3 className={`text-lg font-medium ${textPrimary} mt-8 mb-3`}>{children}</h3>,
                        p: ({ children }) => <p className="mb-4">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer" className={`${textPrimary} underline underline-offset-2`}>
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
                            <blockquote className={`border-l-2 ${isDark ? "border-white/20" : "border-black/20"} pl-4 italic ${textMuted}`}>
                                {children}
                            </blockquote>
                        ),
                        hr: () => <hr className={`my-8 ${isDark ? "border-white/10" : "border-black/10"}`} />,
                        strong: ({ children }) => <strong className={`font-semibold ${textPrimary}`}>{children}</strong>,
                        img: ({ src, alt }) => {
                            if (!src) return null;
                            const isVideo = typeof src === "string" && /\.(mp4|webm|ogg)$/i.test(src);
                            
                            if (isVideo) {
                                return (
                                    <span className="block my-6">
                                        <video
                                            src={src}
                                            controls
                                            className="w-full rounded-lg"
                                            preload="metadata"
                                        >
                                            {alt && alt}
                                        </video>
                                        {alt && <span className={`block text-sm ${textMuted} mt-2 text-center italic`}>{alt}</span>}
                                    </span>
                                );
                            }
                            
                            // Regular image
                            return (
                                <span className="block my-6">
                                    <img
                                        src={src}
                                        alt={alt || ""}
                                        className="w-full rounded-lg shadow-sm"
                                    />
                                    {alt && <span className={`block text-sm ${textMuted} mt-2 text-center italic`}>{alt}</span>}
                                </span>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>

            <Footer />
        </main>
    );
}
