"use client";

// this component renders the writing page with a list of blog posts and pagination
import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";

interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
}

interface WritingContentProps {
    initialPosts: PostMeta[];
    totalPages: number;
}

export default function WritingContent({ initialPosts, totalPages }: WritingContentProps) {
    const { isDark } = useTheme();
    const [blogPosts] = useState(initialPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages] = useState(totalPages);

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/55" : "text-[#0a0a0a]/55";
    const textMuted = isDark ? "text-white/35" : "text-[#0a0a0a]/35";

    return (
        <>
        <Header />
        <main className="min-h-screen px-6 pt-20 pb-12 max-w-xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Link href="/" className={`text-sm ${textMuted} hover:${textPrimary} transition-colors`} aria-label="Back">
                        ‹
                    </Link>
                    <h1 className={`text-lg font-bold tracking-tight ${textPrimary}`}>Notes</h1>
                </div>
                <p className={`text-sm leading-relaxed ${textSecondary}`}>
                    Welcome to my scratchpad. Expect many unfinished drafts and half-baked thoughts. It&#39;s kind of the point though I&#39;d say!
                </p>
            </div>

            {/* Posts */}
            <section className="space-y-2">
                {blogPosts.map((post) => (
                    <Link key={post.slug} href={`/writing/${post.slug}`}>
                        <article className="group cursor-pointer py-0.5">
                            <div className="flex items-baseline justify-between gap-4">
                                <h2 className={`text-[15px] font-normal leading-snug ${textPrimary} underline underline-offset-2 decoration-current/30`}>
                                    {post.title}
                                </h2>
                                <p className={`text-sm ${textMuted} shrink-0 tabular-nums`}>
                                    {post.date}
                                </p>
                            </div>
                        </article>
                    </Link>
                ))}
            </section>

            {/* Pagination */}
            {pages > 1 && (
                <div className={`mt-10 flex items-center justify-center gap-4 pt-6 border-t ${isDark ? "border-white/10" : "border-[#0a0a0a]/10"}`}>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`text-sm ${currentPage === 1 ? `${textMuted} cursor-not-allowed opacity-50` : `${textSecondary}`}`}
                    >
                        ←
                    </button>
                    <span className={`text-sm ${textMuted}`}>
                        {currentPage} / {pages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(pages, p + 1))}
                        disabled={currentPage === pages}
                        className={`text-sm ${currentPage === pages ? `${textMuted} cursor-not-allowed opacity-50` : `${textSecondary}`}`}
                    >
                        →
                    </button>
                </div>
            )}

            <div className="mt-12">
                <Footer />
            </div>
        </main>
        </>
    );
}
