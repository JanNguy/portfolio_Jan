import MainFooter from "@/components/MainFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
    return (
        <div className="page">
            <SiteHeader />
            <main id="main" className="shell py-20 sm:py-28">
                <p className="eyebrow">Erreur 404</p>
                <h1 className="griffiths mt-5 text-6xl sm:text-7xl text-balance">
                    Cette page n&rsquo;existe pas
                </h1>
                <p className="times-normal mt-6 max-w-prose text-lg leading-relaxed text-neutral-700 text-pretty">
                    Le lien est peut-être périmé, ou l&rsquo;adresse mal recopiée.
                    Les notes et les projets, eux, sont toujours là.
                </p>
            </main>
            <MainFooter />
        </div>
    );
}
