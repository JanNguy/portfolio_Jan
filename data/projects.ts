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
    slug: "sha-256",
    title: "sha-256",
    description: "Implémentation de l'algorithme SHA-256 en C.",
    link: "https://github.com/JanNguy/sha-256",
  },
  {
    slug: "tetra",
    title: "Tetra",
    description: "Application desktop pour créer et lancer des API mock en local.",
    link: "https://github.com/JanNguy/Tetra",
  },
  {
    slug: "alpaga",
    title: "Alpaga",
    description: "Interface web de chatbot local basée sur Ollama.",
    link: "https://github.com/JanNguy/alpaga",
  },
  {
    slug: "gameoflife",
    title: "GameOfLife",
    description: "Simulation multi-agents fondée sur des profils démographiques et des scénarios.",
    link: "https://github.com/JanNguy/GameOfLife",
  },
  {
    slug: "rag-implementation",
    title: "RAG-implementation",
    description: "Pipeline RAG minimal : PDF, embeddings Ollama et recherche dans Neo4j.",
    link: "https://github.com/JanNguy/RAG-implementation",
  },
  {
    slug: "mozart",
    title: "Mozart",
    description: "Assistant CLI qui route chaque requête vers le modèle d'IA le plus adapté.",
    link: "https://github.com/JanNguy/mozart",
  },
  {
    slug: "other",
    title: "Other",
    description: "Le reste de mon travail, sur GitHub.",
    link: "https://github.com/JanNguy",
  },
];
