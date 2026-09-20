import { NextResponse } from "next/server";
import { ensureSchema, getDb, type Comment, type CommentRow } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_PSEUDO = 60;
const MAX_BODY = 2000;
const MAX_POST_ID = 120;

// Anti-spam : au plus N commentaires par IP glissante, sur toute la base.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
// Plafond global par note pour éviter une croissance infinie.
const MAX_PER_POST = 400;

/** Nettoie une entrée libre : types forcés, caractères de contrôle retirés, trim, longueur bornée. */
function sanitize(value: unknown, max: number): string {
    if (typeof value !== "string") return "";
    const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
    return cleaned.slice(0, max);
}

function sanitizePseudo(value: unknown): string {
    const cleaned = sanitize(value, MAX_PSEUDO).replace(/\s+/g, " ").trim();
    return cleaned || "Anonyme";
}

/** Première IP de `x-forwarded-for` (Vercel), sinon `x-real-ip`. Jamais introduite dans une requête SQL brute. */
function getIp(req: Request): string {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = (forwarded ?? req.headers.get("x-real-ip") ?? "unknown")
        .split(",")[0]
        .trim()
        .slice(0, 64);
    return ip || "unknown";
}

function getUserAgent(req: Request): string {
    return (req.headers.get("user-agent") ?? "").slice(0, 255);
}

function toComment(row: { id: number | bigint | null; post_id?: string | null; pseudo?: string | null; body?: string | null; created_at?: string | null }): Comment {
    return {
        id: Number(row.id),
        postId: row.post_id ?? "notes",
        pseudo: row.pseudo ?? "Anonyme",
        body: row.body ?? "",
        createdAt: row.created_at ?? "",
    };
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const postId = sanitize(searchParams.get("post"), MAX_POST_ID) || "notes";
    const rawLimit = Number.parseInt(searchParams.get("limit") ?? "100", 10);
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 200) : 100;

    const db = getDb();
    try {
        await ensureSchema();

        const [list, count] = await Promise.all([
            db.execute({
                sql: `
                    SELECT id, post_id, pseudo, body, created_at
                    FROM comments
                    WHERE post_id = ?
                    ORDER BY created_at ASC, id ASC
                    LIMIT ?
                `,
                args: [postId, limit],
            }),
            db.execute({
                sql: `SELECT COUNT(*) AS c FROM comments WHERE post_id = ?`,
                args: [postId],
            }),
        ]);

        const rows = list.rows as unknown as CommentRow[];

        return NextResponse.json({
            count: Number(count.rows[0]?.c ?? 0),
            comments: rows.map(toComment),
        });
    } catch (error) {
        console.error("[comments] GET failed:", error);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    let payload: unknown;
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
    }
    const data = (payload ?? {}) as Record<string, unknown>;

    // Honeypot : champ caché que les robots remplissent. On ignore la requête
    // en renvoyant un faux succès pour ne pas leur révéler le piège.
    const honeypot = typeof data.website === "string" ? data.website.trim() : "";
    if (honeypot !== "") {
        return NextResponse.json({ ok: true, comment: null });
    }

    const postId = sanitize(data.postId, MAX_POST_ID) || "notes";
    const pseudo = sanitizePseudo(data.pseudo);
    const body = sanitize(data.body, MAX_BODY);

    if (!body) {
        return NextResponse.json({ error: "Ton commentaire est vide." }, { status: 400 });
    }

    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const createdAt = new Date().toISOString();

    const db = getDb();
    try {
        await ensureSchema();

        // Fenêtre anti-spam : même IP = au plus RATE_MAX commentaires récents.
        const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
        const recent = await db.execute({
            sql: `SELECT COUNT(*) AS c FROM comments WHERE ip = ? AND created_at > ?`,
            args: [ip, since],
        });
        if (Number(recent.rows[0]?.c ?? 0) >= RATE_MAX) {
            return NextResponse.json(
                { error: "Trop de commentaires en peu de temps. Repasse dans quelques minutes." },
                { status: 429 },
            );
        }

        const total = await db.execute({
            sql: `SELECT COUNT(*) AS c FROM comments WHERE post_id = ?`,
            args: [postId],
        });
        if (Number(total.rows[0]?.c ?? 0) >= MAX_PER_POST) {
            return NextResponse.json(
                { error: "La discussion est fermée pour cette note." },
                { status: 429 },
            );
        }

        const inserted = await db.execute({
            sql: `
                INSERT INTO comments (post_id, pseudo, body, ip, user_agent, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
            args: [postId, pseudo, body, ip, userAgent, createdAt],
        });

        return NextResponse.json(
            {
                ok: true,
                comment: toComment({
                    id: inserted.lastInsertRowid ?? 0,
                    post_id: postId,
                    pseudo,
                    body,
                    created_at: createdAt,
                }),
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("[comments] POST failed:", error);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
}
