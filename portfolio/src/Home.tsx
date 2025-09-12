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
                    <p>Born in Lyon, France to an engineer father and a nurse mother, I quickly developed an interest in computers.<br/> I am following the Grande École course at EPITECH and am pursuing an ever-greater future.</p>
                </div>
            </div>
            <footer className="h-[20vh] w-full flex flex-row flex-nowrap space-x-100 justify-center p-10">
                <div className="flex flex-col flex-nowrap space-y-2">
                    <a href="https://github.com/JanNguy"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5">Github</p></a>
                    <Link to="ContactPage" className="hover:underline"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5-xl">Contact</p></Link>
                </div>
                <div className="flex flex-col flex-nowrap space-y-2">
                    <Link to="ProjectsPage" className="hover:underline"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5">Projects</p></Link>
                    <Link to="/" className="hover:underline"><p className="text-xl leading-tight transition duration-150 ease-out hover:underline decoration-[0.25px] underline-offset-5">Home</p></Link>
                </div>
            </footer>
        </body>
    </>
  );
}


export default Home;
