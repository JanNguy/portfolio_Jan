import type { Metadata } from "next";
import CdLibrary from "@/components/CdLibrary";
import MainFooter from "@/components/MainFooter";
import SiteHeader from "@/components/SiteHeader";
import { getBiblio } from "@/lib/biblio";

export const metadata: Metadata = {
    title: "Biblio",
    description:
        "Ma bibliothèque de CD : la playlist Biblio, rangée sur une étagère. Tire un disque pour l'écouter.",
};

/** Cf. `BIBLIO_REVALIDATE` — Next exige ici une valeur littérale. */
export const revalidate = 7200;

export default async function BiblioRoute() {
    const tracks = await getBiblio();

    return (
        <div className="page">
            <SiteHeader />
            <main id="main">
                <CdLibrary tracks={tracks} />
            </main>
            <MainFooter />
        </div>
    );
}
