"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const layoutPattern = [
    "md:col-span-5 lg:col-span-7",
    "md:col-span-3 md:mt-8 lg:col-span-5",
    "md:col-span-3 lg:col-span-4",
    "md:col-span-5 lg:col-span-8",
    "md:col-span-4 md:mt-6 lg:col-span-5",
    "md:col-span-4 lg:col-span-7",
  ];

  const sizePattern: Record<Project["size"], string> = {
    feature: "md:min-h-[520px]",
    wide: "md:min-h-[430px]",
    standard: "md:min-h-[400px]",
  };

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-8 md:gap-x-12 md:gap-y-16 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-20">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          className={`surface-elevated group block rounded-2xl border p-5 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:border-zinc-400 md:p-6 ${layoutPattern[index % layoutPattern.length]} ${sizePattern[project.size]}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={`/projects/${project.slug}`} className="block">
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-700/90 bg-[#0b0b0b] md:mb-7">
              <Image
                src={project.preview}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-center transition duration-300 group-hover:scale-[1.015]"
                sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>

            <div className="mb-5 flex items-start justify-between gap-4">
              <h3 className="text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f3f3f3] md:text-[1.95rem]">
                {project.title}
              </h3>
              <span className="pt-1 text-[10px] tracking-[0.2em] text-zinc-400">{project.year}</span>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-300 md:text-[0.95rem]">{project.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2 text-[10px] tracking-[0.05em] text-zinc-400">
              <span className="rounded-full border border-zinc-600 px-2.5 py-1">{project.stack}</span>
              <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-zinc-500">{project.repo}</span>
            </div>

            <p className="mt-7 text-[11px] tracking-[0.12em] text-zinc-500 transition duration-300 group-hover:text-zinc-300">
              View project
            </p>
          </Link>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[11px] tracking-[0.12em] text-zinc-400 transition duration-300 hover:text-zinc-200"
          >
            GitHub
          </a>
        </motion.article>
      ))}
    </div>
  );
}
