import { Link } from "react-router-dom";
import "./App.css";

function NavBar() {
  return (
    <div className="bg-gray-100/85 flex justify-start fixed items-center h-[6vh] w-[98%] rounded-xl border-solid border-1 border-zinc-300 m-5">
        <ul className="flex flex-row items-center gap-10 list-none text-left m-7 w-full pl-15 pr-5">
            <li>
                <Link to="/">
                    <p className="text-xl leading-tight transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-5">
                    Home
                    </p>
                </Link>
            </li>
            <li>
                <Link to="AboutMe">
                    <p className="text-xl leading-tight transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] hover:underline-offset-5">
                    About me
                    </p>
                </Link>
            </li>
            <li>
                <Link to="ProjectsPage">
                    <p className="text-xl leading-tight transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-5">
                    Projects
                    </p>
                </Link>
            </li>
            <li className="ml-auto">
                <Link to="ContactPage">
                    <p className="text-xl leading-tight transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-5">
                    Contact
                    </p>
                </Link>
            </li>
        </ul>
    </div>
  );
}

export default NavBar;
