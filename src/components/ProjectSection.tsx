"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { projects, statusColor, type Project } from "@/data/projects";

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

const DESCRIPTION_CLAMP = 180;

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const isLong = project.description.length > DESCRIPTION_CLAMP;

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
        role="link"
        tabIndex={0}
        aria-label={`View ${project.title} details`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => router.push(`/projects/${project.slug}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/projects/${project.slug}`);
          }
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        className={`relative card-glass rounded-2xl p-6 bg-gradient-to-br ${project.gradient} transition-shadow duration-300 group overflow-hidden hover:shadow-2xl hover:shadow-accent/20 cursor-pointer`}
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
          <p className="text-gray-400 text-sm mb-2 leading-relaxed">
            {isLong && !expanded
              ? `${project.description.slice(0, DESCRIPTION_CLAMP).trimEnd()}…`
              : project.description}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              className="mb-4 text-xs font-mono text-accent hover:text-accent-light transition-colors"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}

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
                rel="noopener noreferrer"
                href={project.live}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm font-mono text-accent hover:text-accent-light transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
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
