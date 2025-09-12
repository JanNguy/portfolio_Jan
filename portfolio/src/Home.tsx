import { Link } from "react-router-dom";

function Home() {

  return (
    <>
        <body className="bg-white">
            <div className="flex flex-row flex-nowrap w-full h-screen">
                <div className="bg-white flex justify-start fixed items-center h-[7vh] w-full border-solid border-1 border-black"> {/*apparait en scrollant quand l'affichage est sur la 2eme "page". Quand chaque li est hover une "preview se lance & add event listener sur si la section est hover pour affihcer un point avant" */}
                    <ul className="flex flex-row space-x-10 list-none text-lef mx-auto mt-2">
                        <li>
                        <Link to="/">
                            <p className="text-xl pb-4 leading-tight transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] underline-offset-5">
                                Home {/*reset la pos à la "page 1" */}
                            </p>
                        </Link>
                        </li>
                        <li>
                        <Link to="ContactPage">
                            <p className= "text-xl pb-4 leading-tight transition duration-150 ease-out hover:translate-x-1 hover:-translate-y-1 no-underline hover:underline decoration-[0.25px] hover:underline-offset-5">
                                Contact
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
                    </ul>
                </div>
                <div className="flex-1 h-screen border-1 border-dotted flex flex-col justify-center items-center">
                    <p className="edwarian text-[12rem]">Jan Nguyen</p>
                </div>
            </div>
            <div className="h-screen bg-gray-100 flex justify-center items-center w-auto"> {/* mettre en fond un effet 3D de nuage ou quelque chose du genre à effet de particle */}
                <div className="h-[70vh] bg-gray-100 flex justify-center w-auto flex-col items-start">
                    <p className="montHeavy text-7xl">Who I am?</p>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700">
                        Born in Lyon, France, to an engineer father and a nurse mother, I quickly developed an interest in computers.<br/>
                        My journey started on Discord playing Minecraft <a className="hover:text-blue-400 underline-none hover:underline"href="https://youtu.be/ynm_qSv8K1o">[Here]</a> and now I am striving to make a name for myself in computer science.<br/>
                        I am currently enrolled in the Grande École program at EPITECH, pursuing a promising future in the field.
                    </p>
                </div>
            </div>
            {/* <footer className="h-[20vh] w-full flex flex-row flex-nowrap space-x-100 justify-center p-10">
                <div className="flex flex-col flex-nowrap space-y-2">
                    <a href="https://github.com/JanNguy"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5">Github</p></a>
                    <Link to="ContactPage" className="hover:underline"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5-xl">Contact</p></Link>
                </div>
                <div className="flex flex-col flex-nowrap space-y-2">
                    <Link to="ProjectsPage" className="hover:underline"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5">Projects</p></Link>
                    <Link to="/" className="hover:underline"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5">Home</p></Link>
                </div>
            </footer> */}
            <footer className="bg-white border-t border-gray-200">
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
                        <div className="flex justify-center text-gray-900 sm:justify-start">
                            <p className="text-2xl font-bold">Jan Nguyen</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8">
                            <Link to="/" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                Home
                            </Link>
                            <Link to="/ProjectsPage" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                Projects
                            </Link>
                            <a href="https://github.com/JanNguy" target="_blank" rel="noopener noreferrer" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                Github
                            </a>
                            <Link to="/ContactPage" className={"text-base text-gray-500 transition hover:text-gray-900"}>
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <p className="text-center text-sm text-gray-500">
                            © {new Date().getFullYear()} Jan Nguyen. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </body>
    </>
  );
}


export default Home;
