# Immersive Developer Portfolio

An introspective portfolio built as an interactive experience, not a traditional sectioned website.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Analytics + Speed Insights

## Experience Principles

- Calm dark visual language with soft contrast
- Progressive reveal (fade + blur + drift)
- Exploratory flow and generous spacing
- GPU-friendly motion only
- Optional immersion mode for stronger ambient background movement
- Soft custom cursor on pointer devices

## Run Locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```

## Commentaires des notes

Chaque note (`/blog/*`) affiche les commentaires à droite du texte.

- **Base SQLite** via `@libsql/client` (dialecte SQLite, requêtes paramétrées → immunisées contre l'injection SQL).
- **Local** : aucune config — un fichier `data/comments.db` est créé au premier commentaire (non commité, voir `.gitignore`).
- **Production (Vercel)** : le disque est éphémère, il faut une base SQLite hébergée. Crée une base libre chez [Turso](https://turso.tech) puis renseigne les variables d'environnement (localement via `.env.local`, et dans le panneau Vercel) :

  ```
  TURSO_URL=libsql://...
  TURSO_AUTH_TOKEN=...
  ```

- **Pas de login** : le visiteur choisit un pseudo. Chaque commentaire stocke en base une trace (IP, user-agent, horodatage UTC) pour la modération.
- **Anti-spam** : un champ honeypot invisible, une limitation de débit (5 commentaires / 10 min par IP) et un plafond de 400 commentaires par note.
