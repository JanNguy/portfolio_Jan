import { createClient, type Client } from "@libsql/client";
import path from "path";

/**
 * Couche SQLite des commentaires.
 *
 * - En local (aucune env var) : base fichier `data/comments.db`, créée au vol.
 * - En production (Vercel) : base SQLite hébergée (Turso / libSQL) via
 *   `TURSO_URL` + `TURSO_AUTH_TOKEN`. Sans cela, le disque Vercel étant
 *   éphémère, les commentaires ne persisteraient pas — on logue un avertissement.
 *
 * Toutes les requêtes passent par des paramètres liés (`?`), jamais par
 * concaténation de chaîne : la couche est immunisée contre l'injection SQL.
 */

const SCHEMA: string[] = [
    `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id TEXT NOT NULL,
        pseudo TEXT NOT NULL,
        body TEXT NOT NULL,
        ip TEXT NOT NULL,
        user_agent TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_comments_post ON comments (post_id, created_at)`,
    `CREATE INDEX IF NOT EXISTS idx_comments_ip ON comments (ip, created_at)`,
];

type CommentRow = {
    id: number | bigint;
    post_id: string | null;
    pseudo: string | null;
    body: string | null;
    user_agent: string | null;
    ip: string | null;
    created_at: string | null;
};

export type Comment = {
    id: number;
    postId: string;
    pseudo: string;
    body: string;
    createdAt: string;
};

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

export function getDb(): Client {
    if (client) return client;

    const remoteUrl = process.env.TURSO_URL?.trim();
    if (remoteUrl) {
        client = createClient({
            url: remoteUrl,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
    } else {
        if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
            // Vercel : pas de TURSO_URL configurée → on tombe sur un fichier
            // éphémère. Les commentaires ne survivront pas aux cold starts.
            console.warn(
                "[comments] TURSO_URL manquante sur Vercel : persistence non garantie. Voir .env.example.",
            );
        }
        const file = path.join(process.cwd(), "data", "comments.db");
        client = createClient({ url: `file:${file}` });
    }

    return client;
}

/** Applique le schéma une seule fois (idempotent). */
export function ensureSchema(): Promise<void> {
    const db = getDb();
    if (!schemaReady) {
        schemaReady = (async () => {
            for (const statement of SCHEMA) {
                await db.execute(statement);
            }
        })().catch((error) => {
            schemaReady = null;
            throw error;
        });
    }
    return schemaReady;
}

export type { CommentRow };
