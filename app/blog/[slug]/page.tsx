import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { getNote, notes } from "@/data/notes";

type NotePageProps = {
    params: Promise<{ slug: string }>;
};

/** Seules les notes déclarées dans `data/notes.ts` existent. */
export function generateStaticParams() {
    return notes.map((note) => ({ slug: note.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
    const { slug } = await params;
    const note = getNote(slug);

    if (!note) return {};

    return { title: note.title, description: note.summary };
}

export default async function NotePage({ params }: NotePageProps) {
    const { slug } = await params;

    // Le slug vient de l'URL et finit dans un chemin de fichier : on ne lit
    // que les notes connues, jamais un chemin construit depuis l'entrée.
    if (!getNote(slug)) notFound();

    return <BlogPost slug={slug} />;
}
