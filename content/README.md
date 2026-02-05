# Writing / Blog System

This portfolio uses a **file-based MDX blog system** that makes adding new posts incredibly easy.

## How to Add a New Post

1. **Create a new `.mdx` file** in the `content/posts/` directory
2. **Name the file** using kebab-case (e.g., `my-awesome-post.mdx`) — this becomes the URL slug
3. **Add frontmatter** at the top of the file with required metadata
4. **Write your content** in Markdown below the frontmatter

### Frontmatter Template

```mdx
---
title: "Your Post Title"
description: "A brief description for previews and SEO"
date: "2026-02-05"
tags: ["tag1", "tag2"]
featured: false
---

Your markdown content goes here...
```

### Required Fields

| Field | Description |
|-------|-------------|
| `title` | The post title (displayed on the page) |
| `description` | Short description for listings and SEO |
| `date` | Publication date in `YYYY-MM-DD` format |

### Optional Fields

| Field | Description |
|-------|-------------|
| `tags` | Array of tags for categorization |
| `featured` | Set to `true` to feature on the homepage |

## Supported Markdown Features

- **Headings** (`#`, `##`, `###`, `####`)
- **Paragraphs**
- **Bold** (`**text**`) and *italic* (`*text*`)
- **Links** (`[text](url)`)
- **Inline code** (`` `code` ``)
- **Code blocks** (triple backticks)
- **Unordered lists** (`-` or `*`)
- **Ordered lists** (`1.`, `2.`, etc.)
- **Blockquotes** (`>`)
- **Horizontal rules** (`---`)

## File Structure

```
content/
└── posts/
    ├── my-first-post.mdx
    ├── understanding-cpp-build-systems.mdx
    └── another-post.mdx
```

## URL Mapping

The filename directly maps to the URL:

- `content/posts/my-post.mdx` → `/writing/my-post`
- `content/posts/hello-world.mdx` → `/writing/hello-world`

## Features

- **Automatic read time calculation** — no manual entry needed
- **Date sorting** — posts are automatically sorted newest first
- **Featured posts** — mark any post as featured to highlight on homepage
- **Tags** — organize posts by topic (future: tag filtering)
- **SEO** — automatic meta tags from frontmatter

## Development

Posts are read at build time (SSG), so:
- New posts require a rebuild to appear
- In development, hot reload works for content changes

## Example Post

```mdx
---
title: "Getting Started with TypeScript"
description: "A beginner's guide to TypeScript and why you should use it."
date: "2026-02-01"
tags: ["typescript", "javascript", "programming"]
---

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## Why TypeScript?

TypeScript adds optional static typing to JavaScript, which helps catch errors early...

## Getting Started

First, install TypeScript:

\`\`\`bash
npm install -g typescript
\`\`\`

Then create your first TypeScript file...
```
