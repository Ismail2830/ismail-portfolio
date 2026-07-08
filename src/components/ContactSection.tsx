"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(() => import("@/components/three/GlobeCanvas"), {
  ssr: false,
});

// Get a free access key at https://web3forms.com (enter your email, it emails you the key).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${name || "someone"}`,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6 bg-secondary/20 overflow-hidden">
      {/* 3D wireframe globe floating behind the form */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-40 pointer-events-none hidden md:block -translate-y-16 translate-x-24">
        <GlobeCanvas />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-accent text-sm mb-3 tracking-widest uppercase">04. Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-gray-400 mb-10">
            I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to say hi — my inbox is always open.
          </p>

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-mono text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors font-mono text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-accent text-white font-mono rounded-xl hover:bg-accent/80 transition-all duration-200 shadow-lg shadow-accent/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>

            {status === "success" && (
              <p className="text-sm font-mono text-green-400 text-center">
                ✓ Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-mono text-red-400 text-center">
                Something went wrong. Please email me directly at{" "}
                <a href="mailto:ismailaitrehail2830@gmail.com" className="underline">
                  ismailaitrehail2830@gmail.com
                </a>
                .
              </p>
            )}
          </form>

          <div className="mt-12 flex justify-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com/Ismail2830", icon: "🐙" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/ismail-ait-rehail-7564b4209/", icon: "💼" },
              { label: "Email", href: "mailto:ismailaitrehail2830@gmail.com", icon: "📧" },
            ].map((social) => (
              <a
                target="_blank"
                key={social.label}
                href={social.href}
                className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-accent transition-colors"
              >
                <span>{social.icon}</span>
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
