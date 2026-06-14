"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Assurance Plateforme",
    description:
      "A full-stack insurance management platform with online declaration, real-time dossier tracking, AI-assisted decision making, risk scoring, and role-based dashboards for clients and managers.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "Python"],
    status: "Live",
    github: "https://github.com/Ismail2830/claims-plateform",
    live: "https://claims-plateform.vercel.app/",
    gradient: "from-green-500/20 to-teal-500/20",
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
    title: "Inventory Management System",
    description:
      "Full-stack inventory management app with CRUD operations, real-time stock tracking, and role-based access control.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    status: "In Progress",
    github: "https://github.com/Ismail2830/InvManagment",
    live: "https://inv-managment.vercel.app/",
    gradient: "from-purple-500/20 to-blue-500/20",
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
