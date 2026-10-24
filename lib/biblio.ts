import snapshot from "@/data/biblio.json";
import { fetchBiblio, type BiblioTrack } from "./biblio-source";

/** Fréquence de relecture de la playlist (s) — doit suivre `revalidate` de la page. */
export const BIBLIO_REVALIDATE = 7200;

/**
 * Titres de la playlist, relus chez Apple au plus toutes les 2 h (ISR).
 * Si Apple change sa page ou ne répond pas, on sert la dernière capture
 * (`pnpm biblio:sync`) plutôt qu'une bibliothèque vide.
 */
export async function getBiblio(): Promise<BiblioTrack[]> {
    try {
        return await fetchBiblio({ next: { revalidate: BIBLIO_REVALIDATE } });
    } catch (error) {
        console.warn("[biblio] lecture Apple Music impossible, capture servie :", error);
        return snapshot as BiblioTrack[];
    }
}
