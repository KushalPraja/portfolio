"use client";

import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
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
    const { isDark } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const { posts: blogPosts, pages } = getPosts(currentPage, postsPerPage);

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-5xl mx-auto">
            <Header currentPage="writing" />

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
