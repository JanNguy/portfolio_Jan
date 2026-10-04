import fs from "fs";
import path from "path";
import Link from "next/link";
import CommentsPanel from "./CommentsPanel";
import MarkdownContent from "./MarkdownContent";
import NoteToc from "./NoteToc";
import { getNote } from "@/data/notes";
import { extractHeadings, stripLeadingTitle } from "@/lib/headings";

/**
 * Gabarit unique de toutes les notes.
 *
 * Le contenu vit toujours dans `app/blog/<slug>/content.md` ; le titre affiché
 * vient de `data/notes.ts` et le `#` initial du Markdown est retiré pour ne pas
 * le doubler. `slug` sert aussi de `postId` aux commentaires — le changer
 * orphelinerait ceux déjà en base.
 */
export default function BlogPost({ slug }: { slug: string }) {
    const note = getNote(slug);
    const raw = fs.readFileSync(
        path.join(process.cwd(), "app", "blog", slug, "content.md"),
        "utf-8",
    );

    const headings = extractHeadings(raw);
    const hasToc = headings.length >= 2;

    return (
        <article className="shell py-14 sm:py-20">
            <Link
                href="/blog"
                className="times-normal text-sm text-neutral-500 underline-offset-4 transition-colors duration-200 hover:text-black hover:underline"
            >
                ← Notes
            </Link>

            <header className="mt-10">
                <h1 className="griffiths text-5xl sm:text-6xl text-balance">{note?.title}</h1>
                {note && (
                    <time
                        dateTime={note.date}
                        className="times-normal mt-4 block text-sm tabular-nums text-neutral-500"
                    >
                        {note.dateLabel}
                    </time>
                )}
            </header>

            <div
                className={`mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14 ${
                    hasToc ? "xl:grid-cols-[9rem_minmax(0,1fr)_minmax(0,20rem)]" : ""
                }`}
            >
                {hasToc && <NoteToc headings={headings} />}

                <div className="min-w-0 max-w-prose">
                    <MarkdownContent content={stripLeadingTitle(raw)} />
                </div>

                <div className="min-w-0 lg:sticky lg:top-8">
                    <CommentsPanel postId={slug} />
                </div>
            </div>
        </article>
    );
}
