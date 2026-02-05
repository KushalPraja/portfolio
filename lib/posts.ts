import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Path to the content directory
const POSTS_PATH = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
    title: string;
    description: string;
    date: string;
    tags?: string[];
}

export interface Post {
    slug: string;
    frontmatter: PostFrontmatter;
    content: string;
    readTime: string;
}

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags?: string[];
}

/**
 * Get all MDX files from the posts directory
 */
function getPostFiles(): string[] {
    if (!fs.existsSync(POSTS_PATH)) {
        return [];
    }
    return fs.readdirSync(POSTS_PATH).filter((file) => file.endsWith(".mdx"));
}

/**
 * Format date for display (e.g., "January 2026")
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readTime: `${Math.ceil(stats.minutes)} min`,
    };
}

/**
 * Get all posts metadata (for listing pages)
 */
export function getAllPostsMeta(): PostMeta[] {
    const files = getPostFiles();

    const posts = files
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(POSTS_PATH, file);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContents);
            const stats = readingTime(content);

            return {
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                readTime: `${Math.ceil(stats.minutes)} min`,
                tags: data.tags,
            } as PostMeta;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

/**
 * Get paginated posts
 */
export function getPosts(
    page: number = 1,
    postsPerPage: number = 10
): { posts: PostMeta[]; total: number; pages: number } {
    const allPosts = getAllPostsMeta();
    const total = allPosts.length;
    const pages = Math.ceil(total / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    // Format dates for display
    const posts = allPosts.slice(startIndex, endIndex).map((post) => ({
        ...post,
        date: formatDate(post.date),
    }));

    return { posts, total, pages };
}

/**
 * Get all post slugs (for static generation)
 */
export function getAllPostSlugs(): string[] {
    const files = getPostFiles();
    return files.map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
    const allPosts = getAllPostsMeta();
    return allPosts
        .filter((post) => post.tags?.includes(tag))
        .map((post) => ({
            ...post,
            date: formatDate(post.date),
        }));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
    const allPosts = getAllPostsMeta();
    const tagSet = new Set<string>();

    allPosts.forEach((post) => {
        post.tags?.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
}
