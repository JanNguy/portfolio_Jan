import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Waves from "../components/WavesHome"
import "../css/App.css"

function Home() {
    return (
        <>
            <div className="relative min-h-screen overflow-hidden bg-white">
                <div className="pointer-events-none absolute inset-0 z-0">
                    <Waves
                        lineColor="rgba(30, 41, 59, 0.45)"
                        backgroundColor="transparent"
                        waveSpeedX={0.018}
                        waveSpeedY={0.01}
                        waveAmpX={28}
                        waveAmpY={14}
                        friction={0.92}
                        tension={0}
                        maxCursorMove={0}
                        xGap={14}
                        yGap={32}
                    />
                </div>

                <div className="relative z-10">
                    <NavBar />

                    <section className="flex w-full h-[90vh]">
                        <div className="flex w-full h-full items-center justify-center px-6 mx-auto">
                            <div className="max-w-4xl w-full">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <p className="text-gray-600 font-medium text-sm tracking-wide uppercase">
                                            Full Stack Developer
                                        </p>

                                        <h1 className="montHeavy text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-900">
                                            Hi, I'm{" "}
                                            <span className="relative inline-block group align-middle">
                                                <span className="text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                                                    Jan
                                                </span>
                                                <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-gray-900 transition-all duration-500 ease-out group-hover:w-full" />
                                            </span>
                                        </h1>
                                    </div>

                                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                                        I craft modern web applications that
                                        blend performance, design and user
                                        experience.
                                    </p>

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <Link
                                            to="/ProjectsPage"
                                            className="inline-flex items-center gap-2 bg-gray-900 px-6 py-3 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors duration-200"
                                        >
                                            View Projects
                                        </Link>
                                        <Link
                                            to="/ContactPage"
                                            className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg text-gray-900 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                                        >
                                            Get In Touch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="min-h-screen bg-gray-50 flex justify-center items-center w-auto">
                <div className="max-w-4xl w-full px-8 py-16 flex flex-col items-start space-y-12">
                    <h1 className="montHeavy text-6xl md:text-7xl text-gray-900 leading-tight">
                        Who am I?
                    </h1>
                    <div className="space-y-8 max-w-3xl">
                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light">
                            Born in Lyon, France, to an engineer father and a
                            nurse mother, I quickly developed an interest in
                            computers.
                        </p>
                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light">
                            I started on Discord playing Minecraft{" "}
                            <a
                                className="text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200 underline decoration-1 underline-offset-4"
                                href="https://youtu.be/ynm_qSv8K1o"
                            >
                                [Here]
                            </a>{" "}
                            and now I am striving to make a name for myself in
                            computer science.
                        </p>
                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light">
                            I am currently enrolled in the Grande École program
                            at EPITECH, pursuing a promising future in the
                            field.
                        </p>
                    </div>
                </div>
            </div>

            <footer>
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
                        <div className="flex justify-center text-gray-900 sm:justify-start">
                            <p className="text-2xl font-bold">Jan Nguyen</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8">
                            <Link
                                to="/"
                                className="text-base text-gray-500 transition hover:text-gray-900"
                            >
                                Home
                            </Link>
                            <Link
                                to="/ProjectsPage"
                                className="text-base text-gray-500 transition hover:text-gray-900"
                            >
                                Projects
                            </Link>
                            <a
                                href="https://github.com/JanNguy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base text-gray-500 transition hover:text-gray-900"
                            >
                                Github
                            </a>
                            <Link
                                to="/ContactPage"
                                className="text-base text-gray-500 transition hover:text-gray-900"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <p className="text-center text-sm text-gray-500"></p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;
