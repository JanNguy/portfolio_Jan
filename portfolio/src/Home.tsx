import { Link } from "react-router-dom";

function Home() {
  return (
    <>
        <body className="bg-white">
            <div className="flex flex-row flex-nowrap w-full h-screen">
                <div className="flex-1 h-screen border-1 border-dotted flex flex-col justify-center items-center">
                    <p className="edwarian text-9xl">Jan Nguyen</p>
                    <p className="edwarian text-5xl">French developer</p>
                </div>
                <div className="bg-white flex justify-end fixed top-0 right-0 items-center h-full w-auto border-solid border-1 border-black">
                    <ul className="mr-6 space-y-3 list-none text-right">
                        <li>
                        <Link className="navBar" to="/">
                            <p className="text-1xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight transition duration-150 ease-out hover:translate-x-1 no-underline hover:underline decoration-[0.25px] underline-offset-5">
                            Home
                            </p>
                        </Link>
                        </li>
                        <li>
                        <Link className="navBar" to="ContactPage">
                            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight transition duration-150 ease-out hover:translate-x-1 no-underline hover:underline decoration-[0.25px] hover:underline-offset-5">
                            Contact
                            </p>
                        </Link>
                        </li>
                        <li>
                        <Link className="navBar" to="IndexPage">
                            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight transition duration-150 ease-out hover:translate-x-1 no-underline hover:underline decoration-[0.25px] underline-offset-5">
                            Projects
                            </p>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="h-screen bg-gray-100 flex justify-center items-center"> {/* mettre en fond un effet 3D de nuage ou quelque chose du genre à effet de particle */}
                <div className="flex flex-col text-left justify-center bg-slate-100 rounded w-150 align-middle h-50">
                    <p className="text-4xl">Who I am?</p>
                    <p>A french student at Epitech Lyon.<br/> I am a deep dreamer. Passionate and tinkerer, I love experimenting in new areas.</p>
                </div>
            </div>
        </body>
    </>
  );
}


export default Home;
