"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";

export default function ConversationalMemory() {
    const { isDark, toggleTheme } = useTheme();

    const textPrimary = isDark ? "text-white" : "text-[#0a0a0a]";
    const textSecondary = isDark ? "text-white/60" : "text-[#0a0a0a]/60";
    const textMuted = isDark ? "text-white/40" : "text-[#0a0a0a]/40";
    const border = isDark ? "border-white/10" : "border-[#0a0a0a]/10";

    return (
        <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24 max-w-3xl mx-auto">
            {/* Header */}
            <header className="flex items-center justify-between mb-12">
                <nav className={`flex items-center gap-2 text-sm`}>
                    <Link href="/" className={`${textPrimary} underline underline-offset-2`}>Kushal Praja</Link>
                    <span className={textMuted}>/</span>
                    <Link href="/writing" className={`${textPrimary} underline underline-offset-2`}>Writing</Link>
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
            </header>

            {/* Article */}
            <article>
                {/* Meta */}
                <div className={`mb-8 text-xs ${textMuted}`}>
                    <span>January 2025</span>
                    <span className="mx-2">·</span>
                    <span>8 min read</span>
                </div>

                {/* Title */}
                <h1 className={`text-2xl md:text-3xl font-medium mb-6 ${textPrimary}`}>
                    Building Conversational Memory for AI Agents
                </h1>

                {/* Content */}
                <div className={`prose prose-sm md:prose-base ${isDark ? 'prose-invert' : ''} max-w-none`}>
                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        When building <a href="https://persona-eight-gamma.vercel.app/" target="_blank" rel="noopener noreferrer" className="animate-underline">Persona</a>, the hardest problem wasn&apos;t teaching an AI to answer support questions—it was making it remember. Users expect support agents to recall past conversations, understand context from weeks ago, and connect dots across multiple interactions. This is how I built a memory system that makes that possible.
                    </p>

                    <h2 className={`text-lg md:text-xl font-medium mt-8 mb-4 ${textPrimary}`}>
                        The Problem with Context Windows
                    </h2>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        Most AI chat systems naively dump entire conversation histories into the prompt. This works until it doesn&apos;t. With GPT-4&apos;s 128k token limit, you might think this is solved. But tokens are expensive, latency increases linearly with context size, and most importantly—stuffing everything into context makes the model worse at focusing on what matters.
                    </p>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        I needed a system that could:
                    </p>

                    <ul className={`list-disc list-inside space-y-2 text-sm md:text-base ${textSecondary} mb-6 ml-4`}>
                        <li>Remember thousands of past conversations</li>
                        <li>Retrieve only relevant context for the current query</li>
                        <li>Stay under 8k tokens to keep latency low</li>
                        <li>Work across multiple customers and agents</li>
                    </ul>

                    <h2 className={`text-lg md:text-xl font-medium mt-8 mb-4 ${textPrimary}`}>
                        Vectorizing Everything
                    </h2>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        The solution: turn every message into a vector embedding and store them in a vector database. When a user asks a question, embed it, find the most semantically similar past messages, and inject only those into context.
                    </p>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        I used OpenAI&apos;s <span className={`font-mono text-xs ${textPrimary}`}>text-embedding-3-small</span> model (1536 dimensions, $0.02/1M tokens) and MongoDB&apos;s vector search. Each message gets chunked into ~500 token segments with 50-token overlap to preserve context at boundaries.
                    </p>

                    <h2 className={`text-lg md:text-xl font-medium mt-8 mb-4 ${textPrimary}`}>
                        Chunking Strategy
                    </h2>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        The naive approach is to embed each message individually. But support conversations have structure: questions reference previous answers, issues span multiple messages, solutions build incrementally. Breaking these into atomic messages loses critical context.
                    </p>    
                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        Instead, I chunk by conversation turns with semantic boundaries:
                    </p>

                    <ul className={`list-disc list-inside space-y-2 text-sm md:text-base ${textSecondary} mb-6 ml-4`}>
                        <li>Group consecutive messages from the same speaker</li>
                        <li>Include the immediate previous message for context (Q&A pairs)</li>
                        <li>Split long monologues at sentence boundaries</li>
                        <li>Store metadata: timestamp, speaker role, conversation ID</li>
                    </ul>

                    <h2 className={`text-lg md:text-xl font-medium mt-8 mb-4 ${textPrimary}`}>
                        Retrieval Tradeoffs
                    </h2>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        The core tradeoff: accuracy vs latency. More retrieved chunks = better context but slower responses and higher costs. I settled on retrieving the top 5 most similar chunks, which gave me ~2k tokens of context. This keeps total prompt size under 6k tokens including the system prompt and current conversation.
                    </p>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        To improve accuracy without retrieving more:
                    </p>

                    <ul className={`list-disc list-inside space-y-2 text-sm md:text-base ${textSecondary} mb-6 ml-4`}>
                        <li><strong className={textPrimary}>Query rewriting:</strong> Expand the user&apos;s question with context from the current conversation before embedding</li>
                        <li><strong className={textPrimary}>Metadata filtering:</strong> Only search within the same customer&apos;s history</li>
                        <li><strong className={textPrimary}>Recency bias:</strong> Boost similarity scores for recent conversations (last 7 days get 1.2x multiplier)</li>
                    </ul>

                    <h2 className={`text-lg md:text-xl font-medium mt-8 mb-4 ${textPrimary}`}>
                        What I Learned
                    </h2>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        <strong className={textPrimary}>Embeddings drift.</strong> User questions at the start of a conversation are vague ("How do I reset my password?"). Questions 10 messages deep are specific ("When I click the blue button on the settings page you mentioned earlier, nothing happens"). Embedding both equally misses this nuance. I now track conversation depth and adjust retrieval—early questions get higher similarity thresholds.
                    </p>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        <strong className={textPrimary}>Hybrid search matters.</strong> Pure vector search fails for exact matches—product names, error codes, version numbers. I added a keyword filter that boosts chunks containing exact string matches from the query. This catches the edge cases where semantic similarity isn't enough.
                    </p>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        <strong className={textPrimary}>Prompt engineering still matters.</strong> Even with perfect retrieval, the model needs guidance on how to use memory. My system prompt explicitly tells it: "You have access to relevant past conversations below. Reference them when helpful, but don't force connections that aren't there."
                    </p>

                    <h2 className={`text-lg md:text-xl font-medium mt-8 mb-4 ${textPrimary}`}>
                        Results
                    </h2>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        The system now handles conversations across days and weeks. Response latency stayed under 2 seconds (including retrieval + LLM inference). Cost per message dropped 60% compared to stuffing full history into every prompt. Most importantly, support agents using Persona report that it "actually remembers things"—which was the entire point.
                    </p>

                    <p className={`text-sm md:text-base leading-relaxed ${textSecondary} mb-6`}>
                        If you're building something similar, my advice: start simple with top-k vector search, add metadata filters early, and obsess over chunking boundaries. The embedding model and database matter less than getting these fundamentals right.
                    </p>

                    <div className={`mt-12 pt-8 border-t ${border}`}>
                        <p className={`text-xs ${textMuted}`}>
                            <a href="https://github.com/KushalPraja/Persona" target="_blank" rel="noopener noreferrer" className="animate-underline">
                                View the Persona source code on GitHub
                            </a>
                        </p>
                    </div>
                </div>
            </article>

            {/* Footer */}
            <footer className={`mt-16 pt-8 border-t ${border}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className={`flex flex-wrap gap-x-6 gap-y-2 text-xs ${textMuted}`}>
                        <a href="mailto:k2prajap@uwaterloo.ca" className="underline underline-offset-2">Email</a>
                        <a href="https://github.com/KushalPraja" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">GitHub</a>
                        <a href="https://www.linkedin.com/in/kushalprajapa/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">LinkedIn</a>
                        <a href="https://x.com/KushalPraj" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Twitter</a>
                    </div>

                    <div className={`text-xs ${textMuted}`}>
                        <span>© {new Date().getFullYear()} Kushal Prajapati</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
