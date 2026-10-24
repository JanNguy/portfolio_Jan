/**
 * Lecture de la playlist Apple Music « Biblio ».
 *
 * Apple n'expose pas les playlists de bibliothèque sans jeton développeur :
 * on lit donc le JSON que la page publique embarque (`serialized-server-data`),
 * puis on complète chaque titre via l'API iTunes Lookup (extrait 30 s, année…).
 *
 * Aucun import : ce module est partagé par Next (`lib/biblio.ts`) et par le
 * script de capture `scripts/sync-biblio.ts`, exécuté directement par Node.
 */

export const BIBLIO_PLAYLIST_URL =
    "https://music.apple.com/fr/playlist/biblio/pl.u-06oxDjxIY4mxK77";

export type BiblioTrack = {
    id: string;
    title: string;
    artist: string;
    album: string;
    year: number | null;
    genre: string | null;
    durationMs: number;
    /** Gabarit Apple : `{w}`, `{h}` et `{f}` à remplacer (cf. `artworkSrc`). */
    artwork: string;
    /** Couleurs dominantes de la pochette, calculées par Apple (hex sans `#`). */
    bgColor: string;
    textColor: string;
    previewUrl: string | null;
    url: string;
};

const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

export function artworkSrc(template: string, size: number): string {
    return template
        .replace("{w}", String(size))
        .replace("{h}", String(size))
        .replace("{f}", "jpg");
}

type Json = Record<string, unknown>;

const asObject = (value: unknown): Json =>
    value && typeof value === "object" ? (value as Json) : {};

const asString = (value: unknown): string =>
    typeof value === "string" ? value : "";

function parseTracks(html: string) {
    const match = html.match(
        /<script[^>]*id="serialized-server-data"[^>]*>([\s\S]*?)<\/script>/,
    );
    if (!match) throw new Error("Données de playlist introuvables dans la page.");

    const root = asObject(JSON.parse(match[1]));
    const page = asObject(asObject((root.data as unknown[] | undefined)?.[0]).data);
    const sections = (page.sections as unknown[] | undefined) ?? [];
    const trackList = sections
        .map(asObject)
        .find((section) => section.itemKind === "trackLockup");
    if (!trackList) throw new Error("Liste de titres introuvable.");

    return ((trackList.items as unknown[] | undefined) ?? []).map((raw) => {
        const item = asObject(raw);
        const descriptor = asObject(item.contentDescriptor);
        const artwork = asObject(asObject(item.artwork).dictionary);
        const album = asObject((item.tertiaryLinks as unknown[] | undefined)?.[0]);

        return {
            id: asString(asObject(descriptor.identifiers).storeAdamID),
            title: asString(item.title),
            artist: asString(item.artistName),
            album: asString(album.title),
            durationMs: typeof item.duration === "number" ? item.duration : 0,
            artwork: asString(artwork.url),
            bgColor: asString(artwork.bgColor) || "1a1a1a",
            textColor: asString(artwork.textColor1) || "f5f5f5",
            url: asString(descriptor.url),
        };
    });
}

type LookupResult = {
    trackId?: number;
    previewUrl?: string;
    collectionName?: string;
    releaseDate?: string;
    primaryGenreName?: string;
};

export async function fetchBiblio(init: RequestInit = {}): Promise<BiblioTrack[]> {
    const pageResponse = await fetch(BIBLIO_PLAYLIST_URL, {
        ...init,
        headers: { "User-Agent": USER_AGENT, "Accept-Language": "fr-FR,fr" },
    });
    if (!pageResponse.ok) throw new Error(`Apple Music : HTTP ${pageResponse.status}`);

    const tracks = parseTracks(await pageResponse.text()).filter((track) => track.id);
    if (tracks.length === 0) throw new Error("Playlist vide.");

    const lookupUrl = `https://itunes.apple.com/lookup?country=fr&entity=song&id=${tracks
        .map((track) => track.id)
        .join(",")}`;
    const lookupResponse = await fetch(lookupUrl, init);
    if (!lookupResponse.ok) throw new Error(`iTunes Lookup : HTTP ${lookupResponse.status}`);

    const { results = [] } = (await lookupResponse.json()) as { results?: LookupResult[] };
    const byId = new Map(results.map((result) => [String(result.trackId), result]));

    return tracks.map((track) => {
        const extra = byId.get(track.id) ?? {};
        const year = extra.releaseDate ? new Date(extra.releaseDate).getFullYear() : NaN;

        return {
            ...track,
            album: track.album || extra.collectionName || "",
            year: Number.isFinite(year) ? year : null,
            genre: extra.primaryGenreName ?? null,
            previewUrl: extra.previewUrl ?? null,
        };
    });
}
