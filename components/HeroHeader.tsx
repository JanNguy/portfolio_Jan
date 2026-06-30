"use client";

import Link from "next/link";
import { useI18n } from "./i18n";
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
    const { t } = useI18n();

    return (
        <div className="hero-header">
            <p className="griffiths hero-header-name">Jan Nguyen</p>
            <p className="times-normal hero-header-subtitle">
                {t("home.subtitle")}
            </p>
            <ul
                className="flex items-center gap-1 mt-6 list-none p-0"
                style={{ position: "relative", top: "0.5rem" }}
            >
                <li>
                    <p className={NAV_LINK_CLASS} onClick={onProjectsClick}>{t("nav.projects")}</p>
                </li>
                <li>
                    <span className="times-normal text-neutral-300 mx-1 select-none">·</span>
                </li>
                <li>
                    <Link href="/contact">
                        <p className={NAV_LINK_CLASS}>{t("nav.contact")}</p>
                    </Link>
                </li>
                <li>
                    <span className="times-normal text-neutral-300 mx-1 select-none">·</span>
                </li>
                <li>
                    <Link href="/blog">
                        <p className={NAV_LINK_CLASS}>{t("nav.blog")}</p>
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
                        <p className={NAV_LINK_CLASS}>{t("nav.playlist")}</p>
                    </a>
                </li>
            </ul>

            {showProjects && <ProjectList projects={projects} />}
        </div>
    );
}
