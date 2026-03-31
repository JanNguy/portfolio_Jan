export type Project = {
  slug: string;
  repo: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  stack: string;
  preview: string;
  size: "feature" | "wide" | "standard";
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "alpaga",
    repo: "alpaga",
    title: "Alpaga",
    year: "2025",
    summary: "Local chatbot web app focused on fast iteration and direct interaction.",
    description:
      "Alpaga is a local-first chatbot interface built to iterate quickly on conversation flows and model behavior. The project focuses on a direct UX loop: launch fast, test prompts, adjust interaction patterns, and refine without heavy setup.",
    stack: "TypeScript",
    preview: "https://opengraph.githubassets.com/1/JanNguy/alpaga",
    size: "feature",
    githubUrl: "https://github.com/JanNguy/alpaga",
  },
  {
    slug: "deepsearch",
    repo: "DeepSearch",
    title: "DeepSearch",
    year: "2025",
    summary: "LLM-driven search engine built for structured research workflows.",
    description:
      "DeepSearch explores how LLMs can support research-oriented querying with better structure than a basic keyword flow. The goal is to combine retrieval and language reasoning so exploration feels clearer, especially when navigating multiple related sources.",
    stack: "Python",
    preview: "https://opengraph.githubassets.com/1/JanNguy/DeepSearch",
    size: "wide",
    githubUrl: "https://github.com/JanNguy/DeepSearch",
  },
  {
    slug: "codeinterprete",
    repo: "codeInterprete",
    title: "codeInterprete",
    year: "2025",
    summary: "Multi-language code interpreter and executor with a modular Rust core.",
    description:
      "codeInterprete is a modular execution environment designed to run and evaluate code across languages from a single core. The architecture emphasizes isolation, predictable execution, and extensibility for adding new language runtimes.",
    stack: "Rust",
    preview: "https://opengraph.githubassets.com/1/JanNguy/codeInterprete",
    size: "feature",
    githubUrl: "https://github.com/JanNguy/codeInterprete",
  },
  {
    slug: "reactlib",
    repo: "ReactLib",
    title: "ReactLib",
    year: "2025",
    summary: "Personal React component library used to test reusable UI primitives.",
    description:
      "ReactLib is a personal design-and-code playground for building reusable UI primitives with consistent behavior and styling. It helps validate component APIs, state handling patterns, and visual consistency before reusing them in larger apps.",
    stack: "TypeScript",
    preview: "https://opengraph.githubassets.com/1/JanNguy/ReactLib",
    size: "standard",
    githubUrl: "https://github.com/JanNguy/ReactLib",
  },
  {
    slug: "sha-256",
    repo: "sha-256",
    title: "sha-256",
    year: "2026",
    summary: "Compact SHA-256 implementation written in C.",
    description:
      "sha-256 is a compact implementation of the SHA-256 algorithm in C, focused on clarity and correctness. It is intended as a low-level exercise to better understand hashing internals, bitwise operations, and deterministic output validation.",
    stack: "C",
    preview: "https://opengraph.githubassets.com/1/JanNguy/sha-256",
    size: "standard",
    githubUrl: "https://github.com/JanNguy/sha-256",
  },
  {
    slug: "epiutils",
    repo: "EpiUtils",
    title: "EpiUtils",
    year: "2025",
    summary: "Browser extension project focused on daily workflow enhancements.",
    description:
      "EpiUtils is a browser extension project built around practical workflow improvements for everyday use. It focuses on lightweight utilities that remove repetitive friction and make frequent actions faster inside the browser.",
    stack: "CSS",
    preview: "https://opengraph.githubassets.com/1/JanNguy/EpiUtils",
    size: "wide",
    githubUrl: "https://github.com/JanNguy/EpiUtils",
  },
];
