"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

type Project = {
  title: string;
  description: string;
  tech: string[];
  status: string;
  live?: string;
  github?: string;
  gradient: string;
};

const projects: Project[] = [
  {
    title: "Assurance Plateforme",
    description:
      "A full-stack insurance management platform with online declaration, real-time dossier tracking, AI-assisted decision making, risk scoring, and role-based dashboards for clients and managers.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "Python"],
    status: "Live",
    live: "https://claims-plateform.vercel.app/",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    title: "Coffee Shop Website",
    description:
      "A responsive coffee shop showcase website featuring a clean menu layout, full product listing with categories, and a modern UI — built to deliver a smooth browsing experience on all devices.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "Live",
    live: "https://coffee-shop-seven-alpha.vercel.app/",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Inventory Management System",
    description:
      "Full-stack inventory management app with CRUD operations, real-time stock tracking, and role-based access control.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    status: "In Progress",
    live: "https://inv-managment.vercel.app/",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Freelance Invoice",
    description:
      "A tool for freelancers to create and manage professional invoices — add clients, itemize services, calculate totals and taxes, and export ready-to-send PDFs.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    github: "https://github.com/Ismail2830/Freelance-invoice",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

const statusColor: Record<string, string> = {
  Live: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -12 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 16 },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  // raw pointer position within the card (-0.5 → 0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // springy 3D tilt derived from pointer position
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  });

  // spotlight follows the cursor across the card surface
  const glowX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glow = useMotionTemplateGlow(glowX, glowY);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 1000 }}
      className="[transform-style:preserve-3d]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        className={`relative card-glass rounded-2xl p-6 bg-gradient-to-br ${project.gradient} transition-shadow duration-300 group overflow-hidden hover:shadow-2xl hover:shadow-accent/20`}
      >
        {/* cursor-following spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glow }}
        />

        {/* animated gradient border sheen on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:linear-gradient(120deg,transparent,rgba(162,155,254,0.15),transparent)] bg-[length:200%_100%] group-hover:animate-[sheen_1.2s_ease-in-out]" />

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="p-2 rounded-lg bg-accent/10 border border-accent/20"
            >
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </motion.div>
            <span className={`text-xs font-mono px-2 py-1 rounded-full border ${statusColor[project.status]}`}>
              {project.status === "Live" && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse align-middle" />
              )}
              {project.status}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="text-xs font-mono px-2 py-1 bg-white/5 text-gray-300 rounded-md border border-white/10"
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.live && (
              <a
                target="_blank"
                href={project.live}
                className="flex items-center gap-2 text-sm font-mono text-accent hover:text-accent-light transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                target="_blank"
                href={project.github}
                className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.297 24 12 24 5.37 18.627 0 12 0z" />
                </svg>
                Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Builds the radial-gradient spotlight string from live x/y motion values. */
function useMotionTemplateGlow(x: MotionValue<string>, y: MotionValue<string>) {
  return useTransform(
    [x, y],
    ([xv, yv]: string[]) =>
      `radial-gradient(circle at ${xv} ${yv}, rgba(108,99,255,0.25), transparent 60%)`
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-accent text-sm mb-3 tracking-widest uppercase">03. Work</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
