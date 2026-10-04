import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

/** La liste rapide ouverte par le bouton « Projects » du hero. */
export default function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <div id="projets-rapides" className="mt-4 sm:mt-5" style={{ maxWidth: "36ch" }}>
            {projects.map((project, index) => (
                <div
                    key={project.slug}
                    className="project-row py-2.5 sm:py-3"
                    style={
                        {
                            "--row-index": index,
                            borderBottom:
                                index < projects.length - 1 ? "1px solid var(--rule)" : "none",
                        } as CSSProperties
                    }
                >
                    {project.link ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="times-normal group inline-block text-[0.95rem] leading-tight text-neutral-900 no-underline transition-colors duration-300 hover:text-neutral-500"
                        >
                            {project.title}
                            <span
                                className="ml-1.5 text-[0.7rem] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    ) : (
                        <p className="times-normal text-[0.95rem] leading-tight text-neutral-900">
                            {project.title}
                        </p>
                    )}

                    <p className="times-normal mt-0.5 text-[0.8rem] leading-relaxed text-neutral-500">
                        {project.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
