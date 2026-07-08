import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, statusColor } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Ismail Ait Rehail`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="relative min-h-screen py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-accent hover:text-accent-light transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
          <span className={`text-xs font-mono px-2 py-1 rounded-full border ${statusColor[project.status]}`}>
            {project.status === "Live" && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse align-middle" />
            )}
            {project.status}
          </span>
        </div>

        <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-1 bg-white/5 text-gray-300 rounded-md border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        {project.live && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.live}
            className="inline-flex items-center gap-2 text-sm font-mono text-accent hover:text-accent-light transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        )}

        {/* Video showcase */}
        <div className="mt-4">
          <h2 className="text-lg font-bold text-white mb-4">Demo Video</h2>
          {project.video ? (
            <video
              controls
              className="w-full rounded-2xl border border-white/10 bg-black"
              src={project.video}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 aspect-video w-full rounded-2xl border border-dashed border-white/15 bg-white/5 text-gray-500">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-mono">Video coming soon</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
