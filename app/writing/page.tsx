// this page is a server component that fetches the existing posts and passes them to the WritingContent component for rendering

import { getPosts } from "@/lib/posts";
import WritingContent from "@/components/writing-content";

export default function Writing() {
    const { posts, pages } = getPosts(1, 10);

    // Pass the fetched posts 
    return <WritingContent initialPosts={posts} totalPages={pages} />;
}
