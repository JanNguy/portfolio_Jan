/**
 * Source unique des notes.
 *
 * Le `slug` est aussi le `postId` des commentaires stockés en base : le
 * changer orphelinerait les commentaires déjà publiés. Il doit rester
 * identique au nom du dossier sous `app/blog/`.
 *
 * L'ordre du tableau est l'ordre d'affichage (du plus récent au plus ancien).
 */

export type Note = {
  slug: string;
  title: string;
  /** Date ISO, pour l'attribut `dateTime`. */
  date: string;
  /** Même date, déjà mise en forme pour l'affichage. */
  dateLabel: string;
  summary: string;
};

export const notes: Note[] = [
  {
    slug: "le-bibliothecaire",
    title: "Le bibliothécaire",
    date: "2026-09-20",
    dateLabel: "20 septembre 2026",
    summary:
      "Sur la mémoire, la continuité de l'identité et ce qui reste de nous quand tout le reste change.",
  },
  {
    slug: "reflexion-sur-le-futur",
    title: "Réflexion sur le futur",
    date: "2026-07-01",
    dateLabel: "1er juillet 2026",
    summary:
      "Comment je me positionne face à la technologie, au système dans lequel j'évolue et à ce que je veux construire.",
  },
  {
    slug: "premieres-pensees",
    title: "Premières Pensées",
    date: "2026-06-30",
    dateLabel: "30 juin 2026",
    summary:
      "Pourquoi j'ouvre cet espace, et ce que ça change d'écrire en sachant que quelqu'un lira.",
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
