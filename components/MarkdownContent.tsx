"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }: { content: string }) {
    return (
        <div className="times-normal text-neutral-700 text-lg leading-relaxed space-y-4">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="griffiths text-5xl sm:text-6xl mt-12 mb-6">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="griffiths text-3xl sm:text-4xl mt-10 mb-4">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="griffiths text-2xl sm:text-3xl mt-8 mb-3">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className="times-normal text-neutral-700 text-lg leading-relaxed mb-4">{children}</p>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-700 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700 transition-colors duration-200"
                        >
                            {children}
                        </a>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="times-normal text-neutral-700 text-lg leading-relaxed">{children}</li>
                    ),
                    code: ({ children }) => (
                        <code className="text-neutral-500 text-sm bg-neutral-100 px-1.5 py-0.5 rounded">{children}</code>
                    ),
                    pre: ({ children }) => (
                        <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 overflow-x-auto mb-4">{children}</pre>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-neutral-300 pl-4 italic text-neutral-500 mb-4">{children}</blockquote>
                    ),
                    hr: () => <hr className="border-neutral-200 my-8" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
