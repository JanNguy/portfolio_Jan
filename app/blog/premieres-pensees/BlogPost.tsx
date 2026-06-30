"use client";

import LanguageSwitcher from "../../../components/LanguageSwitcher";
import MainFooter from "../../../components/MainFooter";
import MarkdownContent from "../../../components/MarkdownContent";
import Link from "next/link";

export default function BlogPost({ content }: { content: string }) {
    return (
        <div className="page">
            <LanguageSwitcher />
            <div className="content page-root pt-32">
                <Link href="/blog" className="times-normal text-neutral-400 hover:text-neutral-700 transition-colors duration-200 text-sm mb-8 inline-block">&larr; Blog</Link>
                <div className="max-w-prose">
                    <MarkdownContent content={content} />
                </div>
            </div>
            <MainFooter />
        </div>
    );
}
