import { Link } from "react-router-dom";
import ProjectsGrid from "../components/ProjectGrid";

function PageFooter() {
    const links = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/ProjectsPage" },
        { name: "Github", path: "https://github.com/JanNguy", external: true },
        { name: "Contact", path: "/ContactPage" },
    ];

    return (
        <footer className="w-full border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-xl font-semibold text-gray-900">
                        Jan Nguyen
                    </p>
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {links.map((link) =>
                            link.external ? (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                                >
                                    {link.name}
                                </Link>
                            ),
                        )}
                    </nav>
                </div>
                <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Jan Nguyen. Tous
                        droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function ProjectsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-12">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span>Retour</span>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center pb-24 -mx-4 sm:mx-0 w-screen sm:w-auto overflow-hidden">
                        <ProjectsGrid />
                    </div>
                </div>
            </main>

            <PageFooter />
        </div>
    );
}

export default ProjectsPage;
