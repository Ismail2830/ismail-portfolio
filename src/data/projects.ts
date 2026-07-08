export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  live?: string;
  github?: string;
  gradient: string;
  /** Path to a video placed in /public, e.g. "/videos/ism-trip.mp4". Added later. */
  video?: string;
};

export const projects: Project[] = [
  {
    slug: "assurance-plateforme",
    title: "Assurance Plateforme",
    description:
      "A full-stack insurance management platform with online declaration, real-time dossier tracking, AI-assisted decision making, risk scoring, and role-based dashboards for clients and managers.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "Python"],
    status: "Live",
    live: "https://claims-plateform.vercel.app/",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    slug: "ism-trip",
    title: "ISM Trip",
    description:
      "A web app that turns a few inputs into a complete, day-by-day travel itinerary. Enter a destination, dates, budget, and interests, and OpenAI generates a mapped, priced plan you can refine through a built-in AI assistant. Built with React (Expo Router) and TypeScript, with Clerk authentication (Google/Apple), a Neon Postgres + Drizzle backend, background generation via Inngest, and optimized image delivery through ImageKit. Features a custom lime/glass design system and a responsive, modern UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "OpenIA"],
    status: "Live",
    live: "https://ismtrip-cqya.vercel.app/",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    slug: "coffee-shop-website",
    title: "Coffee Shop Website",
    description:
      "A responsive coffee shop showcase website featuring a clean menu layout, full product listing with categories, and a modern UI — built to deliver a smooth browsing experience on all devices.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "Live",
    live: "https://coffee-shop-seven-alpha.vercel.app/",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    description:
      "Full-stack inventory management app with CRUD operations, real-time stock tracking, and role-based access control.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    status: "In Progress",
    live: "https://inv-managment.vercel.app/",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    slug: "freelance-invoice",
    title: "Freelance Invoice",
    description:
      "A tool for freelancers to create and manage professional invoices — add clients, itemize services, calculate totals and taxes, and export ready-to-send PDFs.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Live",
    live: "https://freelance-invoice-fawn.vercel.app/fr",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
];

export const statusColor: Record<string, string> = {
  Live: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
