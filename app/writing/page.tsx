"use client";

import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import Footer from "@/components/footer";
import { getPosts } from "@/lib/posts";
import { useState } from "react";

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
}

export default function Writing() {
    const { isDark, toggleTheme } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const { posts: blogPosts, pages } = getPosts(currentPage, postsPerPage);

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-5xl mx-auto">
            {/* Header */}
            <header className="flex items-center justify-between mb-16">
                <h1 className={`text-xl md:text-2xl lg:text-3xl font-medium ${textPrimary}`}>
                    <Link href="/">kushal praja</Link>
                </h1>
                <div className="flex items-center gap-6">
                    <nav className={`flex items-center gap-6 text-sm`}>
                        <span aria-current="page" className={`${textPrimary} animate-underline underline underline-offset-2`}>Writing</span>
                    </nav>
                    <button
                        onClick={toggleTheme}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border ${border} ${textSecondary} ${isDark ? 'hover:bg-white/6 hover:text-white' : 'hover:bg-black/6 hover:text-black'}`}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Posts */}
            <section className="space-y-8">
                {blogPosts.map((post) => (
                    <Link key={post.slug} href={`/writing/${post.slug}`}>
                        <article className={`pb-8 border-b ${border} last:border-0 group cursor-pointer`}>
                            <div className="flex items-baseline justify-between gap-4 mb-2">
                                <h2 className={`text-base font-medium ${textPrimary} group-hover:underline underline-offset-2`}>{post.title}</h2>
                                <div className={`flex items-center gap-3 text-xs ${textMuted} shrink-0`}>
                                    <span>{post.readTime}</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                            <p className={`text-sm ${textSecondary} leading-relaxed`}>
                                {post.description}
                            </p>
                        </article>
                    </Link>
                ))}
            </section>

            {/* Pagination */}
            {pages > 1 && (
                <div className={`mt-12 flex items-center justify-center gap-4 pt-8 border-t ${border}`}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 text-sm rounded ${currentPage === 1
                                ? `${textMuted} cursor-not-allowed opacity-50`
                                : `${textSecondary} hover:${textPrimary}`
                            }`}
                    >
                        ← Previous
                    </button>
                    <span className={`text-sm ${textMuted}`}>
                        Page {currentPage} of {pages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(pages, p + 1))}
                        disabled={currentPage === pages}
                        className={`px-3 py-1 text-sm rounded ${currentPage === pages
                                ? `${textMuted} cursor-not-allowed opacity-50`
                                : `${textSecondary} hover:${textPrimary}`
                            }`}
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </main>
    );
}
