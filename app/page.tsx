import HomeHero from "@/components/HomeHero";
import MainFooter from "@/components/MainFooter";

export default function HomePage() {
    return (
        <div className="page">
            <main id="main">
                <HomeHero />
            </main>

            <MainFooter />
        </div>
    );
}
