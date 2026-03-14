"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Inventory Management System",
    description:
      "Full-stack inventory management app with CRUD operations, real-time stock tracking, and role-based access control.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    status: "Live",
    github: "https://github.com/Ismail2830/InvManagment",
    live: "https://inv-managment.vercel.app/",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Coffee Shop Website",
    description:
      "A responsive coffee shop showcase website featuring a clean menu layout, full product listing with categories, and a modern UI — built to deliver a smooth browsing experience on all devices.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "Live",
    github: "https://github.com/Ismail2830/coffee-shop",
    live: "https://coffee-shop-seven-alpha.vercel.app/",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Assurance Plateforme",
    description:
      "A full-stack insurance management platform with online declaration, real-time dossier tracking, AI-assisted decision making, risk scoring, and role-based dashboards for clients and managers.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
    github: "https://github.com/Ismail2830/claims-plateform",
    live: "https://claims-plateform.vercel.app/",
    gradient: "from-green-500/20 to-teal-500/20",
  },
];

const statusColor: Record<string, string> = {
  Live: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card-glass rounded-2xl p-6 bg-gradient-to-br ${project.gradient} transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded-full border ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-1 bg-white/5 text-gray-300 rounded-md border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  target="_blank"
                  href={project.github}
                  className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Code
                </a>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
