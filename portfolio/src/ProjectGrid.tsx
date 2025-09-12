import { useMemo } from "react";
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
        pathImg: "/linkedin-logo.svg",
        description: "My first react project. Its a simple moving blocks project",
        url: `${baseUrl}/blockFristApp`,
    },
    {
        id: 2,
        title: "DeepSearch",
        pathImg: "/linkedin-logo.svg",
        description: "A Deepseek-R1 based deepsearch function made for an 4hours Hackathon.",
        url: "https://github.com/JanNguy/DeepSearch",
    },
    {
        id: 3,
        title: "FastStart",
        pathImg: "/linkedin-logo.svg",
        description: "A C project luncher for with custom header and start patterns.",
        url: "https://github.com/JanNguy/FastStart",
    },
    {
        id: 4,
        title: "cross-easy-trial",
        pathImg: "/linkedin-logo.svg",
        description: "A script to bypass the end of the free trial indefinitely",
        url: "https://github.com/JanNguy/cross-easy-trial",
    },
];

function ProjectCard({ title, pathImg, description, url }: ProjectBase) {
    return (
        <div className="p-5 h-[60vh] w-[40vh] border border-stone-600 rounded flex flex-col">
            <div className="h-[40%] w-full border flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src={pathImg} alt={title} />
            </div>
            <div className="h-[60%] mt-2 flex flex-col justify-between">
                <div>
                    <p className="text-3xl font-bold">{title}</p>
                    <p>{description}</p>
                </div>
                <a href={url} target="_blank" rel="noreferrer" className="font-bold hover:underline">
                    Voir
                </a>
            </div>
        </div>
    );
}

type ProjectsGridProps = {
    selectedId?: number;
    selectedIds?: number[];
};

function ProjectsGrid({ selectedId, selectedIds }: ProjectsGridProps) {
    const items = useMemo(() => {
        if (selectedIds && selectedIds.length > 0) {
            return projects.filter(p => selectedIds.includes(p.id));
        }
        if (selectedId != null) {
            return projects.filter(p => p.id === selectedId);
        }
        return projects;
    }, [selectedId, selectedIds]);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map(p => (
                <ProjectCard key={p.id} {...p} />
            ))}
        </section>
    );
}

export default ProjectsGrid;
