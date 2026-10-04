import Link from "next/link";
import type { Note } from "@/data/notes";

/** Liste de notes partagée par l'accueil (« Dernières notes ») et /blog. */
export default function NoteList({ notes }: { notes: Note[] }) {
    return (
        <ul className="m-0 list-none p-0">
            {notes.map((note) => (
                <li key={note.slug} className="border-t border-black/10">
                    <Link href={`/blog/${note.slug}`} className="group block py-6 no-underline">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <h3 className="griffiths text-xl text-neutral-900 transition-colors duration-300 group-hover:text-neutral-500 sm:text-2xl">
                                {note.title}
                            </h3>
                            <time
                                dateTime={note.date}
                                className="times-normal shrink-0 text-sm tabular-nums text-neutral-500"
                            >
                                {note.dateLabel}
                            </time>
                        </div>
                        <p className="times-normal mt-1.5 max-w-prose text-[0.95rem] leading-relaxed text-neutral-600">
                            {note.summary}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
