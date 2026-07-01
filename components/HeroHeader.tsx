"use client";

import Link from "next/link";
import ProjectList, { type Project } from "./ProjectList";

const NAV_LINK_CLASS =
    "times-normal text-[0.9rem] sm:text-[1rem] text-neutral-500 hover:text-neutral-900 hover:underline transition-colors duration-200 cursor-pointer";

export default function HeroHeader({
    showProjects,
    projects,
    onProjectsClick,
}: {
    showProjects: boolean;
    projects: Project[];
    onProjectsClick?: () => void;
}) {
    return (
        <div className="hero-header">
            <p className="griffiths hero-header-name">Jan Nguyen</p>
            <p className="times-normal hero-header-subtitle">
                Développeur full-stack & étudiant à Epitech Lyon passionné par le bas niveau, le web et l'intelligence artificielle.
            </p>
            <ul
                className="flex items-center gap-1 mt-6 list-none p-0"
                style={{ position: "relative", top: "0.5rem" }}
            >
                <li>
                    <p className={NAV_LINK_CLASS} onClick={onProjectsClick}>Projects</p>
                </li>
                <li>
                    <span className="times-normal text-neutral-300 mx-1 select-none">·</span>
                </li>
                <li>
                    <Link href="/contact">
                        <p className={NAV_LINK_CLASS}>Contact</p>
                    </Link>
                </li>
                <li>
                    <span className="times-normal text-neutral-300 mx-1 select-none">·</span>
                </li>
                <li>
                    <Link href="/blog">
                        <p className={NAV_LINK_CLASS}>Notes</p>
                    </Link>
                </li>
                <li>
                    <span className="times-normal text-neutral-300 mx-1 select-none">·</span>
                </li>
                <li>
                    <a
                        href="https://open.spotify.com/playlist/0refPTgAoFlDIZo2wTgSYR?si=704fbeb7c10f4514"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className={NAV_LINK_CLASS}>Playlist</p>
                    </a>
                </li>
            </ul>

            {showProjects && <ProjectList projects={projects} />}
        </div>
    );
}
