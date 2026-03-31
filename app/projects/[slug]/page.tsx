import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-6 sm:pt-10">
      <Link href="/#projects" className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-zinc-200">
        Back to projects
      </Link>

      <header className="mt-8 border-b border-zinc-900 pb-10 sm:mt-10 sm:pb-12">
        <h1 className="text-4xl font-semibold tracking-[-0.045em] text-zinc-100 sm:text-6xl md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">{project.year}</p>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-300">{project.summary}</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3 sm:p-4">
          <Image
            src={project.preview}
            alt={`${project.title} preview`}
            fill
            className="object-contain object-center"
            sizes="(min-width: 1280px) 60vw, 100vw"
            priority
          />
        </div>

        <aside className="space-y-8">
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Stack</h2>
            <p className="mt-3 text-sm text-zinc-300">{project.stack}</p>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.description}</p>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Links</h2>
            <div className="mt-3 flex flex-col gap-3 text-sm">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-zinc-300 transition hover:text-zinc-100"
              >
                GitHub repository
                <span
                  aria-hidden="true"
                  className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-300"
                >
                  -&gt;
                </span>
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 transition hover:text-zinc-100"
                >
                  Live project
                </a>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
