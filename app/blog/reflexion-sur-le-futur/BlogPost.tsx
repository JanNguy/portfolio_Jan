"use client";

import { useState, useEffect } from "react";
import MainFooter from "../../../components/MainFooter";
import MarkdownContent from "../../../components/MarkdownContent";
import CommentsPanel from "../../../components/CommentsPanel";
import Link from "next/link";
import { usePathname } from "next/navigation";

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\u00e0-\u00fc]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function extractHeadings(content: string): string[] {
    return (content.match(/^## (.+)$/gm) || []).map((h) => h.replace(/^## /, ""));
}

export default function BlogPost({ content }: { content: string }) {
    const headings = extractHeadings(content);
    const pathname = usePathname();
    const postId = (pathname?.split("/").filter(Boolean).pop() ?? "notes")
        .replace(/[^a-z0-9-]+/gi, "-")
        .slice(0, 120);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const ids = headings.map(slugify);
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
        );

        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [headings]);

    return (
        <div className="page">
            {headings.length > 0 && (
                <nav className="hidden lg:flex fixed left-8 top-0 z-40 w-56 h-screen flex-col py-32">
                    <Link
                        href="/blog"
                        className="times-normal text-neutral-400 hover:text-neutral-700 transition-colors duration-200 text-sm mb-8 inline-block"
                    >
                        &larr; Notes
                    </Link>
                    <ul className="space-y-1 border-l border-neutral-200 pl-4 list-none p-0">
                        {headings.map((h) => {
                            const id = slugify(h);
                            return (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .getElementById(id)
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                        }}
                                        className={`times-normal text-sm block py-1.5 transition-colors duration-200 border-l -ml-4 pl-4 ${
                                            activeId === id
                                                ? "text-neutral-900 border-neutral-900 font-medium"
                                                : "text-neutral-400 border-transparent hover:text-neutral-700 hover:border-neutral-400"
                                        }`}
                                    >
                                        {h}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}

            <div className="content">
                <div className="pt-32 pb-24 px-4 sm:px-8 lg:pl-72">
                    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-start">
                        <article className="min-w-0 max-w-prose mx-auto lg:mx-0">
                            <MarkdownContent content={content} />
                        </article>
                        <div className="min-w-0 lg:sticky lg:top-28">
                            <CommentsPanel postId={postId} />
                        </div>
                    </div>
                </div>
            </div>
            <MainFooter />
        </div>
    );
}
