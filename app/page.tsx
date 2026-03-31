"use client";

import { motion } from "framer-motion";
import ProjectShowcase from "@/components/project-showcase";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <motion.header
        className="mb-20 pt-8 sm:pt-12 md:mb-24"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="hero-name text-6xl font-semibold tracking-[-0.055em] text-[#f5f5f5] sm:text-8xl md:text-9xl lg:text-[11rem]"
          data-text="Jan Nguyen"
        >
          <span className="hero-name__offset" aria-hidden>
            Jan Nguyen
          </span>
          <span className="hero-name__main">Jan Nguyen</span>
        </h1>
        <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-[#888] sm:text-xs">
          Developer
        </p>
        <span className="mt-7 block text-xs uppercase tracking-[0.16em] text-zinc-400">
          Available for selected collaborations
        </span>
      </motion.header>

      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectShowcase projects={projects} />
      </motion.section>
    </>
  );
}
