// this page handles the rendering of individual blog posts based on their slug
// fetches the post data and passes it to the PostContent component for display

import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import PostContent from "./post-content";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
    };
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.frontmatter.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <PostContent
            title={post.frontmatter.title}
            date={formattedDate}
            readTime={post.readTime}
            content={post.content}
            tags={post.frontmatter.tags}
        />
    );
}
