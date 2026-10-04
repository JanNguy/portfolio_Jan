import Link from "next/link";
import SiteNav from "./SiteNav";

/**
 * En-tête des pages intérieures (notes, contact) : wordmark + navigation.
 * Posé dans le flux — il défile avec la page plutôt que de la recouvrir.
 */
export default function SiteHeader() {
    return (
        <header className="shell">
            <div className="site-header">
                <Link href="/" className="griffiths site-header__wordmark">
                    Jan Nguyen
                </Link>
                <SiteNav variant="bar" />
            </div>
        </header>
    );
}
