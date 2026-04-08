"use client";

import { useCallback, useState } from "react";
import RightVisual from "@/components/RightVisual";
import Link from "next/link";

export default function HomePage() {
    const [stage, setStage] = useState(0);
    const handleStageChange = useCallback((nextStage: number) => {
        setStage(nextStage);
    }, []);

  return (
        <div className="page">
            <RightVisual onStageChange={handleStageChange} />
            <main className="content page-root">
        <nav className="nav-shell top-nav" aria-label="Main navigation">
            <div className="nav-inner">
                <ul className="nav-list">
                    <li>
                        <Link href="/" className="nav-link" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link href="/projects/alpaga" className="nav-link">Projects</Link>
                    </li>
                </ul>
                <a href="mailto:jan.nguyen694@icloud.com" className="nav-link">Get in touch</a>
            </div>
        </nav>
        <section className="hero">
            <div className="hero-inner">
                <p className="hero-title">
                    <span className={`hero-word ${stage === 1 ? "hero-word--active" : ""}`}>Build</span><br/>
                    <span className={`hero-word ${stage === 2 ? "hero-word--active" : ""}`}>Optimise</span><br/>
                    <span className={`hero-word ${stage === 3 ? "hero-word--active" : ""}`}>Restart</span>
                </p>
            </div>
        </section>
            </main>
        </div>
  );
}