import type { Metadata } from "next";
import NoteList from "@/components/NoteList";
import { notes } from "@/data/notes";

export const metadata: Metadata = {
    title: "Notes",
    description: "Réflexions personnelles sur la technologie, le futur et ce que je construis.",
};

export default function BlogPage() {
    return (
        <div className="shell py-14 sm:py-20">
            <h1 className="griffiths text-6xl sm:text-7xl">Notes</h1>
            <p className="times-normal mt-6 max-w-prose text-lg leading-relaxed text-neutral-700 text-pretty">
                Bienvenue sur mes notes. Ici vous pouvez lire de tout ce qui me passe par la tête.
            </p>

            <div className="mt-12 sm:mt-14">
                <NoteList notes={notes} />
            </div>
        </div>
    );
}
