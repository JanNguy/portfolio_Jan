import MainFooter from "@/components/MainFooter";
import SiteHeader from "@/components/SiteHeader";

/** Chrome commun à /blog et à toutes les notes. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">
            <SiteHeader />
            <main id="main">{children}</main>
            <MainFooter />
        </div>
    );
}
