/**
 * Source unique des projets, affichés dans la liste rapide du hero.
 */

export type Project = {
  /** Identifiant stable, utilisé comme clé de liste. */
  slug: string;
  title: string;
  /** Description courte, affichée sous le titre. */
  description: string;
  /** Absent = projet sans lien public : la ligne n'est pas cliquable. */
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "alpaga",
    title: "Alpaga",
    description: "Application de chatbot local basée sur Ollama.",
    link: "https://github.com/JanNguy/alpaga",
  },
  {
    slug: "productsnap",
    title: "ProductSnap",
    description: "Application SaaS de génération d'images ciblée e-commerçants.",
  },
  {
    slug: "sha-256",
    title: "sha-256",
    description: "Implémentation de l'algorithme SHA-256 en C.",
    link: "https://github.com/JanNguy/sha-256",
  },
  {
    slug: "faststart",
    title: "FastStart",
    description: "Initiateur de projet Bash pour tout type de projets.",
    link: "https://github.com/JanNguy/FastStart",
  },
  {
    slug: "other",
    title: "Other",
    description: "Le reste de mon travail, sur GitHub.",
    link: "https://github.com/JanNguy",
  },
];
