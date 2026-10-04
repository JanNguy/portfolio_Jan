"use client";

import { useState } from "react";
import PortraitSpeech from "./PortraitSpeech";
import ProjectList from "./ProjectList";
import SiteNav from "./SiteNav";
import { projects } from "@/data/projects";

/**
 * Écran d'identité de l'accueil — seul contenu de la page.
 *
 * L'identité est en `absolute` dans une section de 100svh : le rendu au
 * chargement est celui d'avant, quand l'en-tête était `fixed`.
 */
export default function HomeHero() {
    const [showProjects, setShowProjects] = useState(false);

    return (
        <section className="home-hero" aria-labelledby="home-title">
            <div className="home-hero__identity">
                <h1 id="home-title" className="griffiths home-hero__name">
                    Jan Nguyen
                </h1>
                <p className="times-normal home-hero__subtitle">
                    Développeur full-stack &amp; étudiant à Epitech Lyon passionné par le bas
                    niveau, le web et l&rsquo;intelligence artificielle.
                </p>

                <SiteNav
                    variant="hero"
                    projects={{
                        open: showProjects,
                        onToggle: () => setShowProjects((value) => !value),
                    }}
                />

                <div className="project-reveal" data-open={showProjects}>
                    {/* Repliée, la liste fait 0px de haut mais resterait
                        atteignable au clavier : `inert` la sort de l'ordre de tabulation. */}
                    <div className="project-reveal__inner" inert={!showProjects}>
                        <ProjectList projects={projects} />
                    </div>
                </div>
            </div>

            <PortraitSpeech />
        </section>
    );
}
