"use client";

import { useI18n } from "./i18n";

export type Project = {
    name: string;
    description: string;
    link?: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
    const { t } = useI18n();

    return (
        <div className="mt-4 sm:mt-6" style={{ maxWidth: "36ch" }}>
            <div className="flex flex-col gap-0">
                {projects.map((project, i) => (
                    <div
                        key={project.name}
                        className="group py-2.5 sm:py-3"
                        style={{
                            borderBottom:
                                i < projects.length - 1
                                    ? "1px solid rgba(0,0,0,0.08)"
                                    : "none",
                            animation: `projectFadeIn 400ms ${i * 80}ms both ease-out`,
                        }}
                    >
                        {project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="times-normal text-[0.9rem] sm:text-[1rem] text-neutral-900 hover:text-neutral-500 transition-colors duration-300 leading-tight"
                                style={{ textDecoration: "none" }}
                            >
                                {project.name}
                                <span
                                    className="text-neutral-300 ml-1.5 group-hover:text-neutral-500 transition-colors duration-300"
                                    style={{ fontSize: "0.7rem" }}
                                >
                                    ↗
                                </span>
                            </a>
                        ) : (
                            <p className="times-normal text-[0.9rem] sm:text-[1rem] text-neutral-900 leading-tight">
                                {project.name}
                            </p>
                        )}
                        {project.description && (
                            <p className="times-normal text-neutral-400 mt-0.5 leading-relaxed text-[0.75rem] sm:text-[0.8rem]">
                                {project.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes projectFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
