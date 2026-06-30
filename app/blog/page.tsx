"use client";

import LanguageSwitcher from "../../components/LanguageSwitcher";
import MainFooter from "../../components/MainFooter";
import NavItem from "../../components/NavItem";
import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="page">
            <LanguageSwitcher />
            <div className="content page-root pt-32">
                <Link href="/" className="times-normal text-neutral-400 hover:text-neutral-700 transition-colors duration-200 text-sm mb-8 inline-block">&larr; Back</Link>
                <h1 className="griffiths text-7xl sm:text-8xl mb-12">Blog</h1>

                <div className="max-w-prose space-y-6">
                    <p className="times-normal text-neutral-700 text-lg leading-relaxed">
                        Bienvenue sur mon blog. Ici vous pouvez lire de tout ce qui me passe par la tête.
                    </p>

                    <ul className="space-y-4 list-none p-0">
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
