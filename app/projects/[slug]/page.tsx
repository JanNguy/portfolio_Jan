type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [];
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-20 sm:px-10">
      <h1 className="text-3xl font-semibold tracking-tight">Project</h1>
      <p className="mt-4 text-sm text-zinc-400">Slug courant: {slug}</p>
      <p className="mt-2 text-sm text-zinc-500">Contenu supprime pour repartir sur une base vierge.</p>
    </main>
  );
}
