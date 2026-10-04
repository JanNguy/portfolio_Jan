/**
 * Extraction des titres d'un document Markdown.
 *
 * `slugify` est partagé avec `MarkdownContent` : les identifiants générés pour
 * la table des matières et ceux posés sur les `<h2>` rendus doivent venir de la
 * même fonction, sinon les ancres pointent dans le vide.
 */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9à-ü]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type Heading = {
  id: string;
  label: string;
};

/** Retire le titre de niveau 1 initial : il est rendu par la page, pas par le corps. */
export function stripLeadingTitle(markdown: string): string {
  return markdown.replace(/^#\s+.*(\r?\n)+/, "");
}

/** Les sections de niveau 2, dans l'ordre du document. */
export function extractHeadings(markdown: string): Heading[] {
  const matches = markdown.match(/^##\s+(.+)$/gm) ?? [];

  return matches.map((line) => {
    const label = line.replace(/^##\s+/, "").trim();
    return { id: slugify(label), label };
  });
}
