import { Link } from "react-router-dom";
import "./App.css";

function NavBar() {
  return (
    <div className="bg-white/80 backdrop-blur-sm flex justify-start fixed items-center h-16 w-[calc(100%-2rem)] rounded-2xl border border-gray-200/50 m-4 shadow-sm z-50">
        <ul className="flex flex-row items-center gap-8 list-none text-left mx-8 w-full">
            <li>
                <Link to="/">
                    <p className="text-base font-medium text-gray-900 transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-4 hover:text-gray-600">
                    Home
                    </p>
                </Link>
            </li>
            <li>
                <Link to="ProjectsPage">
                    <p className="text-base font-medium text-gray-900 transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-4 hover:text-gray-600">
                    Projects
                    </p>
                </Link>
            </li>
            <li className="ml-auto">
                <Link to="ContactPage">
                    <p className="text-base font-medium text-gray-900 transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-4 hover:text-gray-600">
                    Contact
                    </p>
                </Link>
            </li>
        </ul>
    </div>
  );
}

export default NavBar;
