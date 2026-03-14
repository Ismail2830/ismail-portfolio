"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = ["About", "Tech", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur-md border-b border-accent/10 shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono font-bold text-accent text-lg tracking-widest">
          &lt;IAR /&gt;
        </span>
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm font-mono text-gray-400 hover:text-accent transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-sm font-mono px-4 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
