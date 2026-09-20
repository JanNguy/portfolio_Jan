"use client";

import { useEffect, useRef, useState } from "react";

const MAX_PSEUDO = 60;
const MAX_BODY = 2000;

type CommentItem = {
    id: number;
    postId: string;
    pseudo: string;
    body: string;
    createdAt: string;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
});

function formatDate(iso: string): string {
    try {
        return DATE_FORMATTER.format(new Date(iso));
    } catch {
        return "";
    }
}

function readStoredPseudo(): string {
    try {
        return window.localStorage.getItem("comments-pseudo") ?? "";
    } catch {
        return "";
    }
}

function storePseudo(pseudo: string): void {
    try {
        window.localStorage.setItem("comments-pseudo", pseudo);
    } catch {
        /* stockage indisponible : on ignore */
    }
}

export default function CommentsPanel({ postId }: { postId: string }) {
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [count, setCount] = useState(0);
    const [pseudo, setPseudo] = useState("");
    const [body, setBody] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    const listRef = useRef<HTMLUListElement>(null);

    async function loadComments() {
        try {
            const res = await fetch(`/api/comments?post=${encodeURIComponent(postId)}&limit=200`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("http " + res.status);
            const data = (await res.json()) as { comments: CommentItem[]; count: number };
            setComments(data.comments ?? []);
            setCount(typeof data.count === "number" ? data.count : data.comments.length);
        } catch (err) {
            console.error("[comments] load failed:", err);
            setError("Impossible de charger les commentaires pour le moment.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setPseudo(readStoredPseudo());
        void loadComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedBody = body.trim();
        if (!trimmedBody || submitting) return;

        setSubmitting(true);
        setError(null);
        setNotice(null);

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postId,
                    pseudo: pseudo.trim(),
                    body: trimmedBody,
                    website: honeypot, // champ anti-robot, invisible à l'écran
                }),
            });

            const data = (await res.json().catch(() => null)) as { error?: string; comment?: CommentItem } | null;

            if (!res.ok) {
                setError(data?.error ?? "Une erreur est survenue. Réessaie.");
                return;
            }

            storePseudo(pseudo.trim());
            setBody("");
            setNotice("Commentaire publié.");
            await loadComments();
            listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        } catch {
            setError("Impossible d'envoyer le commentaire. Réessaie.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section id="commentaires" aria-label="Commentaires" className="border-t border-neutral-200 pt-8 sm:pt-10">
            <div className="flex items-baseline gap-3">
                <h2 className="griffiths text-3xl sm:text-4xl text-neutral-900">Commentaires</h2>
                {count > 0 && (
                    <span className="font-sans text-sm text-neutral-400 tabular-nums">
                        · {count}
                    </span>
                )}
            </div>

            {/* ── Formulaire ─────────────────────────────────────────────── */}
            <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Veuillez ne pas remplir ce champ</label>
                    <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                    />
                </div>

                <label className="block">
                    <span className="mb-1 block font-sans text-xs font-medium uppercase tracking-wider text-neutral-400">
                        Pseudo
                    </span>
                    <input
                        type="text"
                        value={pseudo}
                        onChange={(e) => {
                            setPseudo(e.target.value);
                            setError(null);
                            setNotice(null);
                        }}
                        maxLength={MAX_PSEUDO}
                        placeholder="Anonyme"
                        className="times-normal w-full rounded-none border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus:ring-0"
                    />
                </label>

                <label className="block">
                    <span className="mb-1 block font-sans text-xs font-medium uppercase tracking-wider text-neutral-400">
                        Commentaire
                    </span>
                    <textarea
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value);
                            setError(null);
                            setNotice(null);
                        }}
                        maxLength={MAX_BODY}
                        rows={4}
                        required
                        placeholder="Écris ici ta réflexion…"
                        className="times-normal w-full resize-y rounded-none border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-base leading-relaxed text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus:ring-0"
                    />
                    <span className="mt-1 block font-sans text-right text-xs tabular-nums text-neutral-400">
                        {body.length}/{MAX_BODY}
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={submitting || !body.trim()}
                    className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {submitting ? "Envoi…" : "Publier"}
                </button>

                {error && (
                    <p role="alert" className="times-normal text-sm text-red-600">
                        {error}
                    </p>
                )}
                {notice && !error && (
                    <p role="status" className="times-normal text-sm text-neutral-500">
                        {notice}
                    </p>
                )}
            </form>

            {/* ── Liste ───────────────────────────────────────────────────── */}
            <div className="mt-10 border-t border-neutral-200 pt-6">
                {loading ? (
                    <p className="times-normal text-sm text-neutral-400 italic">Chargement des commentaires…</p>
                ) : comments.length === 0 ? (
                    <p className="times-normal text-sm text-neutral-400 italic">
                        Aucun commentaire pour l&rsquo;instant. Sois le premier à réagir.
                    </p>
                ) : (
                    <>
                        <ul ref={listRef} className="list-none space-y-0 p-0">
                            {comments.map((comment) => (
                                <li key={comment.id} className="border-b border-neutral-100 py-4 last:border-b-0 last:pb-0 first:pt-0">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                        <p className="font-sans text-sm font-medium text-neutral-900">
                                            {comment.pseudo}
                                        </p>
                                        <time
                                            dateTime={comment.createdAt}
                                            className="font-sans text-xs text-neutral-400 tabular-nums"
                                        >
                                            {formatDate(comment.createdAt)}
                                        </time>
                                    </div>
                                    <p className="times-normal mt-1.5 text-[15px] leading-relaxed text-neutral-700 whitespace-pre-wrap">
                                        {comment.body}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {count > comments.length && (
                            <p className="pt-3 font-sans text-xs text-neutral-400">
                                {count - comments.length} autre{count - comments.length > 1 ? "s" : ""} commentaire
                                {count - comments.length > 1 ? "s" : ""} déjà posté{count - comments.length > 1 ? "s" : ""}…
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
