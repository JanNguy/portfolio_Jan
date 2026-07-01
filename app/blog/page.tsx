"use client";

import MainFooter from "../../components/MainFooter";
import NavItem from "../../components/NavItem";
import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="page">
            <div className="content page-root pt-32">
                <Link href="/" className="times-normal text-neutral-400 hover:text-neutral-700 transition-colors duration-200 text-sm mb-8 inline-block">&larr; Back</Link>
                <h1 className="griffiths text-7xl sm:text-8xl mb-12">Notes</h1>

                <div className="max-w-prose space-y-6">
                    <p className="times-normal text-neutral-700 text-lg leading-relaxed">
                        Bienvenue sur mes notes. Ici vous pouvez lire de tout ce qui me passe par la tête.
                    </p>

                    <ul className="space-y-4 list-none p-0">
                        <NavItem
                            name="Réflexion sur le futur"
                            description="Mes pensées sur ce que le futur nous réserve."
                            href="/blog/reflexion-sur-le-futur"
                        />
                        <NavItem
                            name="Premières Pensées"
                            description="Mes premières réflexions sur ce blog."
                            href="/blog/premieres-pensees"
                        />
                    </ul>
                </div>
            </div>
            <MainFooter />
        </div>
    );
}
