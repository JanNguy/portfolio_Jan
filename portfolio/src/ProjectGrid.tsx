import { useRef } from "react";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import "./App.css";

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;
function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    );

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
        );
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
        );
        } else if (
        scrollXProgress.getPrevious() === 0 ||
        scrollXProgress.getPrevious() === 1
        ) {
        animate(
            maskImage,
            `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
        );
        }
    });

    return maskImage;
}

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
    <div className="p-5 h-[60vh] w-[40vh] border rounded-2xl border-stone-600 flex flex-col">
      <div className="h-[40%] w-full border flex items-center justify-center">
        <img className="max-h-full w-auto object-contain" src={pathImg} alt={title} />
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

export interface ProjectsGridProps {
  ids?: number[];
  limit?: number;
  query?: string;
}

function ProjectsGrid({ ids, limit, query }: ProjectsGridProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollXProgress } = useScroll({ container: ref });
    const maskImage = useScrollOverflowMask(scrollXProgress);

    let list = projects.slice();

    if (ids?.length) {
        const set = new Set(ids);
        list = list.filter((p) => set.has(p.id));
    }

    if (query && query.trim()) {
        const q = query.toLowerCase();
        list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
    }

    if (typeof limit === "number") {
        list = list.slice(0, Math.max(0, limit));
    }

    return (
        <section className="w-full px-4">
        <motion.div
            ref={ref}
            style={{ maskImage, WebkitMaskImage: maskImage }}
            className="max-w-115 flex gap-5 justify-center overflow-x-auto pb-4 snap-x snap-mandatory"
        >
            <div className="shrink-0 basis-[10vw]" />
            {list.map((project) => (
            <div key={project.id} className="flex-shrink-0 min-w-[45vh] snap-center">
                <ProjectCard {...project} />
            </div>
            ))}
        </motion.div>
        </section>
  );
}

export default ProjectsGrid;
