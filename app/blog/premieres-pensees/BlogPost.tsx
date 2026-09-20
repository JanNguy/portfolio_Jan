"use client";

import MainFooter from "../../../components/MainFooter";
import MarkdownContent from "../../../components/MarkdownContent";
import CommentsPanel from "../../../components/CommentsPanel";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogPost({ content }: { content: string }) {
    const pathname = usePathname();
    const postId = (pathname?.split("/").filter(Boolean).pop() ?? "notes")
        .replace(/[^a-z0-9-]+/gi, "-")
        .slice(0, 120);

    return (
        <div className="page">
            <div className="content page-root page-root--wide pt-32">
                <Link href="/blog" className="times-normal text-neutral-400 hover:text-neutral-700 transition-colors duration-200 text-sm mb-8 inline-block">&larr; Notes</Link>
                <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-start">
                    <article className="min-w-0 max-w-prose">
                        <MarkdownContent content={content} />
                    </article>
                    <div className="min-w-0 lg:sticky lg:top-28">
                        <CommentsPanel postId={postId} />
                    </div>
                </div>
            </div>
            <MainFooter />
        </div>
    );
}
