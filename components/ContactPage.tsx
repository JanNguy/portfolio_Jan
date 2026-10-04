"use client";

import { useEffect, useRef, useState } from "react";
import {
    EMAIL,
    GITHUB_URL,
    LINKEDIN_URL,
    LOCATION,
    TIMEZONE,
    X_URL,
} from "@/data/site";

type Profile = {
    id: string;
    name: string;
    handle: string;
    url: string;
    image: string;
    caption: string;
    meta: string;
};

const PROFILES: Profile[] = [
    {
        id: "x",
        name: "X",
        handle: "@JanNguy74478827",
        url: X_URL,
        image: "/ppTwitter$.jpg",
        caption: "Jan",
        meta: "@JanNguy74478827",
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        handle: "jan-nguyen",
        url: LINKEDIN_URL,
        image: "/PPLinekdin.jpg",
        caption: "Jan Nguyen",
        meta: "Développeur free-lance · React & TypeScript",
    },
    {
        id: "github",
        name: "GitHub",
        handle: "JanNguy",
        url: GITHUB_URL,
        image: "https://avatars.githubusercontent.com/u/75522312?v=4",
        caption: "Jan",
        meta: "JanNguy",
    },
];

const PROFILE_BY_ID = new Map(PROFILES.map((profile) => [profile.id, profile]));

const PREVIEW_ID = "social-preview";

export default function ContactPage() {
    /** Ligne survolée ou focalisée au clavier — transitoire. */
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    /** Ligne verrouillée au clic ou au tap — persistante. */
    const [lockedId, setLockedId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Le verrou prime sur le survol : la ligne choisie ne s'efface pas
    // quand la souris repart ailleurs.
    const activeId = lockedId ?? hoveredId;
    const active = activeId ? PROFILE_BY_ID.get(activeId) : undefined;

    useEffect(() => {
        return () => {
            if (copyTimer.current) clearTimeout(copyTimer.current);
        };
    }, []);

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            if (copyTimer.current) clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            // Presse-papiers refusé (contexte non sécurisé, permission) :
            // l'adresse reste lisible et sélectionnable juste à côté.
        }
    }

    return (
        <div
            className="shell py-14 sm:py-20"
            onKeyDown={(event) => {
                if (event.key === "Escape") setLockedId(null);
            }}
        >
            <h1 className="griffiths text-6xl sm:text-7xl">Contact</h1>

            <p className="times-normal mt-6 max-w-prose text-lg leading-relaxed text-neutral-700 text-pretty">
                Une idée, un projet, une question&nbsp;? Écris-moi — je réponds
                volontiers, que ce soit pour un mandat ou juste pour discuter.
            </p>

            {/* ── Coordonnées ───────────────────────────────────────────── */}
            <dl className="mt-10 max-w-prose border-t border-black/10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-black/10 py-5">
                    <dt className="eyebrow w-28 shrink-0">Email</dt>
                    <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <a
                            href={`mailto:${EMAIL}`}
                            className="times-normal text-lg text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors duration-200 hover:decoration-neutral-900"
                        >
                            {EMAIL}
                        </a>
                        <button
                            type="button"
                            onClick={copyEmail}
                            className="times-normal cursor-pointer border-0 bg-transparent p-0 text-sm text-neutral-500 transition-colors duration-200 hover:text-black"
                        >
                            {copied ? "copié" : "copier"}
                        </button>
                        <span role="status" className="sr-only">
                            {copied ? "Adresse copiée dans le presse-papiers." : ""}
                        </span>
                    </dd>
                </div>

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-black/10 py-5">
                    <dt className="eyebrow w-28 shrink-0">Localisation</dt>
                    <dd className="times-normal text-lg text-neutral-900">
                        {LOCATION}{" "}
                        <span className="text-neutral-500">· {TIMEZONE}</span>
                    </dd>
                </div>
            </dl>

            <p className="eyebrow mt-14">Sur internet</p>
            <p className="times-normal mt-3 max-w-prose text-neutral-600 text-pretty">
                Survole une ligne, ou sélectionne-la, pour en voir un aperçu.
            </p>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
                {/* Aperçu — placé avant la liste sur mobile pour rester dans le
                    champ de vision au moment du tap. */}
                <div
                    id={PREVIEW_ID}
                    aria-live="polite"
                    className="order-1 lg:order-2 lg:sticky lg:top-8"
                >
                    {active ? (
                        <div className="flex items-start gap-5 border-t border-black/10 pt-6">
                            <img
                                src={active.image}
                                alt=""
                                width={96}
                                height={96}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                className="h-20 w-20 shrink-0 rounded-full object-cover lg:h-24 lg:w-24"
                            />
                            <div className="min-w-0">
                                <p className="griffiths text-2xl">{active.caption}</p>
                                <p className="times-normal mt-1 text-neutral-500">
                                    {active.meta}
                                </p>
                                <a
                                    href={active.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="times-normal mt-3 inline-block text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors duration-200 hover:decoration-neutral-900"
                                >
                                    Ouvrir le profil ↗
                                </a>
                            </div>
                        </div>
                    ) : (
                        <p className="times-normal border-t border-black/10 pt-6 text-neutral-400 italic lg:pt-6">
                            Aucun réseau sélectionné.
                        </p>
                    )}
                </div>

                {/* ── Réseaux ──────────────────────────────────────────── */}
                <ul className="order-2 m-0 list-none border-t border-black/10 p-0 lg:order-1">
                    {PROFILES.map((profile) => {
                        const isActive = activeId === profile.id;

                        return (
                            <li key={profile.id} className="border-b border-black/10">
                                <button
                                    type="button"
                                    aria-expanded={isActive}
                                    aria-controls={PREVIEW_ID}
                                    onMouseEnter={() => setHoveredId(profile.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onFocus={() => setHoveredId(profile.id)}
                                    onBlur={() => setHoveredId(null)}
                                    onClick={() =>
                                        setLockedId((current) =>
                                            current === profile.id ? null : profile.id,
                                        )
                                    }
                                    className={`flex w-full cursor-pointer items-baseline justify-between gap-4 border-0 bg-transparent px-2 py-5 text-left transition-colors duration-200 ${
                                        isActive ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
                                    }`}
                                >
                                    <span className="min-w-0">
                                        <span className="griffiths block text-2xl text-neutral-900">
                                            {profile.name}
                                        </span>
                                        <span className="times-normal block text-neutral-500">
                                            {profile.handle}
                                        </span>
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`times-normal shrink-0 text-neutral-400 transition-transform duration-200 ${
                                            isActive ? "translate-x-1 text-neutral-900" : ""
                                        }`}
                                    >
                                        ↗
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
