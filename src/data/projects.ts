export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: string;
  live?: string;
  github?: string;
  gradient: string;
  /** Paths to images placed in /public, e.g. ["/images/ism-trip/1.png"]. Added later. */
  images?: string[];
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
    images: [
      "/images/assurance-plateforme/1-landing.png",
      "/images/assurance-plateforme/2-login.png",
      "/images/assurance-plateforme/3-client-dashboard.png",
      "/images/assurance-plateforme/4-claims-list.png",
      "/images/assurance-plateforme/5-admin-dashboard.png",
      "/images/assurance-plateforme/6-ai-scoring.png",
      "/images/assurance-plateforme/7-ai-predictions.png",
      "/images/assurance-plateforme/8-admin-analytics.png",
    ],
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
    images: [
      "/images/ism-trip/1-landing.png",
      "/images/ism-trip/2-login.png",
      "/images/ism-trip/3-dashboard.png",
      "/images/ism-trip/4-trip-info.png",
      "/images/ism-trip/5-trip-assistant.png",
    ],
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
    images: ["/images/coffee-shop-website/1-showcase.png"],
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
    images: [
      "/images/freelance-invoice/1-landing.png",
      "/images/freelance-invoice/2-login.png",
      "/images/freelance-invoice/3-dashboard.png",
    ],
  },
  {
    slug: "Fatora",
    title: "Fatora",
    description:
      "Fatora — SaaS reconciliation platform for Moroccan COD e-commerce sellers. Auto-matches courier delivery reports (Amana, Ozone Express, Cathedis, Sendit) against orders to catch payment discrepancies couriers under-report — sellers often don't know their real profit until weeks later. Built solo: Next.js, TypeScript, Prisma, PostgreSQL (Neon), Auth.js, role-based access control.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Postgresql"],
    status: "Live",
    live: "https://fatoora-v2fa.vercel.app/",
    gradient: "from-pink-500/20 to-rose-500/20",
    images: [
      "/images/fatora/1-landing.png",
      "/images/fatora/2-login.png",
      "/images/fatora/3-dashboard.png",
      "/images/fatora/4-orders.png",
      "/images/fatora/5-analytics.png",
      "/images/fatora/6-new-order.png",
      "/images/fatora/7-empty-dashboard.png",
    ],
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
