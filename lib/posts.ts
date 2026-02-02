export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "understanding-cpp-build-systems",
        title: "I finally understood C++ build systems",
        description: "A deep dive into C++ build systems, demystifying CMake, Makefiles, and more.",
        date: "January 2026",
        readTime: "12 min",
    },
];

export function getPosts(page: number = 1, postsPerPage: number = 10): { posts: BlogPost[]; total: number; pages: number } {
    const total = blogPosts.length;
    const pages = Math.ceil(total / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const posts = blogPosts.slice(startIndex, endIndex);

    return { posts, total, pages };
}

export function getFeaturedPost(): BlogPost | null {
    return blogPosts[0] || null;
}
