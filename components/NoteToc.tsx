"use client";

import { useEffect, useState } from "react";
import { useLenis } from "./LenisProvider";
import type { Heading } from "@/lib/headings";

/**
 * Sommaire d'une note.
 *
 * Posé en `sticky` dans la première colonne de la grille, et non en `fixed` :
 * une barre figée à gauche recouvrirait l'en-tête et forcerait un décalage
 * magique du contenu.
 */
export default function NoteToc({ headings }: { headings: Heading[] }) {
    const [activeId, setActiveId] = useState("");
    const lenis = useLenis();

    useEffect(() => {
        const elements = headings
            .map(({ id }) => document.getElementById(id))
            .filter((element): element is HTMLElement => element !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                }
            },
            { rootMargin: "-88px 0px -60% 0px", threshold: 0.1 },
        );

        for (const element of elements) observer.observe(element);
        return () => observer.disconnect();
    }, [headings]);

    return (
        <nav aria-label="Sommaire" className="hidden xl:sticky xl:top-8 xl:block">
            <p className="eyebrow mb-4">Sommaire</p>
            <ul className="m-0 list-none border-l border-black/10 p-0 pl-4">
                {headings.map(({ id, label }) => {
                    const active = activeId === id;

                    return (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                aria-current={active ? "true" : undefined}
                                onClick={(event) => {
                                    const target = document.getElementById(id);
                                    if (!target) return;

                                    event.preventDefault();

                                    if (lenis) {
                                        lenis.scrollTo(target);
                                    } else {
                                        target.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }

                                    window.history.replaceState(null, "", `#${id}`);
                                }}
                                className={`times-normal -ml-4 block border-l py-1.5 pl-4 transition-colors duration-200 ${
                                    active
                                        ? "border-neutral-900 text-neutral-900"
                                        : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-900"
                                }`}
                            >
                                {label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
