"use client";

import { useState } from "react";
import HeroHeader from "../components/HeroHeader";
import PortraitSpeech from "../components/PortraitSpeech";
import MainFooter from "../components/MainFooter";

const PROJECTS = [
    { name: "Alpaga", description: "Application basé de chatbot local sur Ollama", link: "https://github.com/JanNguy/alpaga" },
    { name: "ProductSnap", description: "Application SaaS de génération d'image ciblé e-commerçants" },
    { name: "sha-256", description: "Implémentation de l'algorithme sha-256 en C", link: "https://github.com/JanNguy/sha-256" },
    { name: "FastStart", description: "Initieur de project Bash pour tout types de projets", link: "https://github.com/JanNguy/FastStart" },
    { name: "Other", description: "", link: "https://github.com/JanNguy" },
];

export default function HomePage() {
    const [showProjects, setShowProjects] = useState(false);

    return (
        <div className="page">
            <HeroHeader
                showProjects={showProjects}
                projects={PROJECTS}
                onProjectsClick={() => setShowProjects((v) => !v)}
            />
            <main className="content page-root">
                <PortraitSpeech />
            </main>
            <MainFooter />
        </div>
    );
}