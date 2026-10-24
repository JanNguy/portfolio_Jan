/**
 * Capture la playlist dans `data/biblio.json` — le repli utilisé quand Apple
 * ne répond pas au moment du rendu. Lancer avec `pnpm biblio:sync`.
 */

import { writeFile } from "node:fs/promises";
import { fetchBiblio } from "../lib/biblio-source.ts";

const target = new URL("../data/biblio.json", import.meta.url);
const tracks = await fetchBiblio();

await writeFile(target, `${JSON.stringify(tracks, null, 2)}\n`);

const withoutPreview = tracks.filter((track) => !track.previewUrl).length;
console.log(
    `${tracks.length} titres écrits dans data/biblio.json` +
        (withoutPreview ? ` (${withoutPreview} sans extrait)` : ""),
);
