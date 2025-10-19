import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="fixed top-4 left-0 right-0 z-50 px-4">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-2xl border border-black/10 bg-white/75 px-8 shadow-sm backdrop-blur-lg">
                <div className="flex items-center gap-10">
                    <Link
                        to="/"
                        className="group relative font-medium text-gray-700 transition-colors duration-300 hover:text-gray-950"
                    >
                        Home
                        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-gray-950 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </Link>
                    <Link
                        to="/ProjectsPage"
                        className="group relative font-medium text-gray-700 transition-colors duration-300 hover:text-gray-950"
                    >
                        Projects
                        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-gray-950 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </Link>
                </div>

                <div className="flex items-center">
                    <Link
                        to="/ContactPage"
                        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
