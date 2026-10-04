"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLAYLIST_URL } from "@/data/site";

/** Style unique des liens de navigation, partagé par le hero et la barre. */
export const SITE_LINK_CLASS =
    "times-normal text-[0.95rem] text-neutral-600 hover:text-black hover:underline underline-offset-4 transition-colors duration-200";

const ACTIVE_CLASS = "text-black underline underline-offset-4";
const DOT_CLASS = "times-normal select-none text-neutral-300";

type SiteNavProps = {
    variant?: "hero" | "bar";
    /** Présent uniquement sur l'accueil : « Projects » ouvre la liste rapide. */
    projects?: { open: boolean; onToggle: () => void };
};

export default function SiteNav({ variant = "bar", projects }: SiteNavProps) {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/blog" ? pathname.startsWith("/blog") : pathname === href;

    const separator = (
        <li aria-hidden="true">
            <span className={DOT_CLASS}>·</span>
        </li>
    );

    return (
        <nav aria-label="Navigation principale">
            <ul
                className={`m-0 flex list-none flex-wrap items-center gap-x-1 gap-y-1 p-0 ${
                    variant === "hero" ? "mt-6" : ""
                }`}
            >
                <li>
                    {projects ? (
                        <button
                            type="button"
                            className={`${SITE_LINK_CLASS} cursor-pointer border-0 bg-transparent p-0`}
                            aria-expanded={projects.open}
                            aria-controls="projets-rapides"
                            onClick={projects.onToggle}
                        >
                            Projects
                        </button>
                    ) : (
                        <Link className={SITE_LINK_CLASS} href="/">
                            Projects
                        </Link>
                    )}
                </li>

                {separator}

                <li>
                    <Link
                        className={`${SITE_LINK_CLASS} ${isActive("/contact") ? ACTIVE_CLASS : ""}`}
                        href="/contact"
                        aria-current={isActive("/contact") ? "page" : undefined}
                    >
                        Contact
                    </Link>
                </li>

                {separator}

                <li>
                    <Link
                        className={`${SITE_LINK_CLASS} ${isActive("/blog") ? ACTIVE_CLASS : ""}`}
                        href="/blog"
                        aria-current={isActive("/blog") ? "page" : undefined}
                    >
                        Notes
                    </Link>
                </li>

                {separator}

                <li>
                    <a
                        className={SITE_LINK_CLASS}
                        href={PLAYLIST_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Playlist
                    </a>
                </li>
            </ul>
        </nav>
    );
}
