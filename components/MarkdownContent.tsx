import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/headings";
import type { ReactNode } from "react";

function extractText(node: ReactNode): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && typeof node === "object" && "props" in node) {
        return extractText((node as { props: { children?: ReactNode } }).props.children);
    }
    return "";
}

export default function MarkdownContent({ content }: { content: string }) {
    return (
        <div className="times-normal text-neutral-700 text-lg leading-relaxed">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="griffiths text-4xl sm:text-5xl mb-6">{children}</h1>
                    ),
                    // Même `slugify` que celui utilisé par le sommaire, sinon les ancres cassent.
                    h2: ({ children }) => (
                        <h2
                            id={slugify(extractText(children))}
                            className="griffiths text-3xl sm:text-4xl mt-12 mb-4 scroll-mt-8"
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="griffiths text-2xl sm:text-3xl mt-9 mb-3">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-neutral-700 text-lg leading-relaxed mb-5 text-pretty">
                            {children}
                        </p>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors duration-200 hover:decoration-neutral-900"
                        >
                            {children}
                        </a>
                    ),
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>,
                    li: ({ children }) => <li className="text-neutral-700 leading-relaxed">{children}</li>,
                    code: ({ children }) => (
                        <code className="text-neutral-700 text-sm bg-black/5 px-1.5 py-0.5 rounded">
                            {children}
                        </code>
                    ),
                    pre: ({ children }) => (
                        <pre className="bg-black/[0.04] border border-black/10 rounded-lg p-4 overflow-x-auto mb-5 text-sm">
                            {children}
                        </pre>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-black/20 pl-5 italic text-neutral-500 mb-5">
                            {children}
                        </blockquote>
                    ),
                    hr: () => <hr className="border-black/10 my-10" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
