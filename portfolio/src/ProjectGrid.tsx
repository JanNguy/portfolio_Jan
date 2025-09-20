import { useState } from "react";
import { motion } from "motion/react";
import "./App.css";

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
        title: "BlockApp",
        pathImg: "/blockImg.png",
        description: "My first react project. Its a simple moving blocks project",
        url: `${baseUrl}/blockFristApp`,
    },
    {
        id: 2,
        title: "DeepSearch",
        pathImg: "/DeepSearch.jpeg",
        description: "A Deepseek-R1 based deepsearch function made for an 4hours Hackathon.",
        url: "https://github.com/JanNguy/DeepSearch",
    },
    {
        id: 3,
        title: "FastStart",
        pathImg: "/FastStart.png",
        description: "A C project luncher for with custom header and start patterns.",
        url: "https://github.com/JanNguy/FastStart",
    },
    {
        id: 4,
        title: "cross-easy-trial",
        pathImg: "/Crossoverfreetrial.png",
        description: "A script to bypass the end of the free trial indefinitely",
        url: "https://github.com/JanNguy/cross-easy-trial",
    },
];

function ProjectCard({ title, pathImg, description, url }: ProjectBase) {
    return (
        <div className="flex-none overflow-hidden p-5 h-[60vh] w-[40vh] border rounded-2xl border-stone-600 flex flex-col">
            <div className="h-[40%] w-full border flex items-center justify-center">
                <img className="max-h-full max-w-full object-contain" src={pathImg} alt={title} />
            </div>
            <div className="h-[60%] mt-2 flex flex-col justify-between overflow-hidden">
                <div className="overflow-hidden">
                    <p className="text-2xl font-bold truncate">{title}</p>
                    <p className="overflow-hidden text-ellipsis line-clamp-3">{description}</p>
                </div>
                <a href={url} target="_blank" rel="noreferrer" className="font-bold hover:underline">
                    Voir
                </a>
            </div>
        </div>
    );
}

function ProjectsGrid() {
    const [index, setIndex] = useState(0);
    const count = projects.length;
    const cardWvh = 40;
    const gapVh = 2;

    function next() {
        setIndex((i) => (i + 1) % count);
    }

    function prev() {
        setIndex((i) => (i - 1 + count) % count);
    }

    return (
        <div className="w-full flex items-center justify-center gap-5">
            <p onClick={prev} className="cursor-pointer select-none my-auto text-2xl font-bold transition duration-150 ease-out hover:-translate-x-1">
                &lt;
            </p>

            <div className="relative h-[60vh] w-[40vh] overflow-hidden mx-auto">
                <motion.div
                    className="flex gap-[2vh]"
                    animate={{ x: `-${index * (cardWvh + gapVh)}vh` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ width: `${count * cardWvh + (count - 1) * gapVh}vh` }}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="flex-none w-[40vh]">
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </motion.div>
            </div>

            <p onClick={next} className="cursor-pointer select-none my-auto text-2xl font-bold transition duration-150 ease-out hover:translate-x-1">
                &gt;
            </p>
        </div>
    );
}

export default ProjectsGrid;
