import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import MainFooter from "@/components/MainFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Écris-moi : jan.nguyen694@icloud.com — Lyon, France. Retrouve-moi aussi sur X, LinkedIn et GitHub.",
};

export default function ContactRoute() {
    return (
        <div className="page">
            <SiteHeader />
            <main id="main">
                <ContactPage />
            </main>
            <MainFooter />
        </div>
    );
}
