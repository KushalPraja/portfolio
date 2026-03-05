"use client";

// this component renders the writing page with a list of blog posts and pagination
import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

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
    const articleHover = isDark ? "hover:bg-white/5" : "hover:bg-black/5";

    return (
        <>
            <Header />
            <main className="min-h-screen pl-10 pr-6 sm:px-6 pt-20 pb-12 max-w-xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-2 relative">
                        <Link
                            href="/"
                            className={`absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 ${textMuted} hover:${textPrimary} transition-colors p-1`}
                            aria-label="Back"
                        >
                            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                        </Link>
                        <h1 className={`text-lg font-bold tracking-tight ${textPrimary}`}>Writing</h1>
                    </div>
                    <p className={`text-sm leading-relaxed ${textSecondary}`}>
                        A place where I document my projects, experiments, and the skills I’m building.
                    </p>
                </div>

                {/* Posts */}
                <section className="space-y-2">
                    {blogPosts.map((post) => (
                        <Link key={post.slug} href={`/writing/${post.slug}`}>
                        <article className={`group cursor-pointer py-1 mt-2 rounded-sm transition-colors ${articleHover}`}>
                                <div className="flex items-baseline justify-between gap-4 px-3">
                                    <h2 className={`text-[15px] font-normal leading-snug ${textPrimary} transition-colors` }>
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
