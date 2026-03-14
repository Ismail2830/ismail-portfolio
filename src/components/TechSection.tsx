"use client";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Frontend",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    
  },
  {
    name: "Backend",
    techs: ["Node.js", "PHP", "Java", "REST API", "Next.js API Routes"],
    
  },
  {
    name: "Database",
    techs: ["PostgreSQL", "MySQL", "Prisma ORM", "SQL", "RAID Systems"],
    
  },
  {
    name: "Tools & Other",
    techs: ["Git", "GitHub", "Docker", "Vercel", "Figma", "Linux"],
    
  },
];

export default function TechSection() {
  return (
    <section id="tech" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-accent text-sm mb-3 tracking-widest uppercase">02. Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass rounded-2xl p-6 transition-all duration-300"
            >
              
              <h3 className="font-semibold text-white mb-4 font-mono">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 rounded-md bg-accent/10 text-accent-light border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
