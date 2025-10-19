import { useState } from "react";
import { motion } from "motion/react";
import "../css/App.css";

const baseUrl = window.location.origin;

export interface ProjectBase {
    id: number;
    title: string;
    pathImg: string;
    description: string;
    url: string;
}

const projects: ProjectBase[] = [
    {
        id: 1,
        title: "Alpaga",
        pathImg: "/alpaga.png",
        description:
            "Alpaga is a local UX for Ollama. The goal is to provide a clean interface, conversation history and real‑time listing of your locally available Ollama models.",
        url: `${baseUrl}/blockFristApp`,
    },
    {
        id: 2,
        title: "BlockApp",
        pathImg: "/blockImg.png",
        description:
            "My first react project. Its a simple moving blocks project",
        url: `${baseUrl}/blockFristApp`,
    },
    {
        id: 3,
        title: "DeepSearch",
        pathImg: "/DeepSearch.jpeg",
        description:
            "A Deepseek-R1 based deepsearch function made for an 4hours Hackathon.",
        url: "https://github.com/JanNguy/DeepSearch",
    },
    {
        id: 4,
        title: "FastStart",
        pathImg: "/FastStart.png",
        description:
            "A C project luncher for with custom header and start patterns.",
        url: "https://github.com/JanNguy/FastStart",
    },
    {
        id: 5,
        title: "cross-easy-trial",
        pathImg: "/Crossoverfreetrial.png",
        description:
            "A script to bypass the end of the free trial indefinitely",
        url: "https://github.com/JanNguy/cross-easy-trial",
    },
];

function ProjectCard({ title, pathImg, description, url }: ProjectBase) {
    return (
        <div className="flex-none overflow-hidden p-3 sm:p-5 h-[50vh] sm:h-[60vh] w-[70vw] sm:w-[40vh] border rounded-2xl border-stone-600 flex flex-col">
            <div className="h-[40%] w-full border flex items-center justify-center">
                <img
                    className="max-h-full max-w-full object-contain"
                    src={pathImg}
                    alt={title}
                />
            </div>
            <div className="h-[60%] mt-2 flex flex-col justify-between overflow-hidden">
                <div className="overflow-hidden">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                        {title}
                    </p>
                    <p className="text-sm sm:text-base overflow-hidden text-ellipsis line-clamp-3">
                        {description}
                    </p>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold hover:underline text-sm sm:text-base"
                >
                    Voir
                </a>
            </div>
        </div>
    );
}

function ProjectsGrid() {
    const [index, setIndex] = useState(0);
    const count = projects.length;

    function next() {
        setIndex((i) => (i + 1) % count);
    }

    function prev() {
        setIndex((i) => (i - 1 + count) % count);
    }

    return (
        <div className="w-full flex items-center justify-center gap-2 sm:gap-5 px-4">
            <p
                onClick={prev}
                className="cursor-pointer select-none my-auto text-xl sm:text-2xl font-bold transition duration-150 ease-out hover:-translate-x-1"
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
            </p>

            <div className="relative h-[50vh] sm:h-[60vh] w-[70vw] sm:w-[40vh] overflow-hidden mx-auto">
                <motion.div
                    className="flex gap-4 sm:gap-[2vh]"
                    animate={{
                        x:
                            window.innerWidth < 640
                                ? `-${index * (70 + 4)}vw`
                                : `-${index * (40 + 2)}vh`,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        width:
                            window.innerWidth < 640
                                ? `${count * 70 + (count - 1) * 4}vw`
                                : `${count * 40 + (count - 1) * 2}vh`,
                    }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="flex-none w-[70vw] sm:w-[40vh]"
                        >
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </motion.div>
            </div>

            <p
                onClick={next}
                className="cursor-pointer select-none my-auto text-xl sm:text-2xl font-bold transition duration-150 ease-out hover:translate-x-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                </svg>
            </p>
        </div>
    );
}

export default ProjectsGrid;
