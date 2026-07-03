"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Torus, Box } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

/* ── Floating glowing octahedron (no font/CDN needed) ── */
function CodeParticle({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.008;
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.08;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.13]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ── Solid purple torus rotating on X/Z ── */
function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
  });
  return (
    <Torus ref={ref} args={[1.4, 0.04, 16, 100]}>
      <meshStandardMaterial color="#6c63ff" emissive="#6c63ff" emissiveIntensity={0.5} />
    </Torus>
  );
}

/* ── Wireframe blue torus rotating on Y/Z ── */
function RotatingTorus2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Torus ref={ref} args={[1.8, 0.025, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#74b9ff" emissive="#74b9ff" emissiveIntensity={0.4} wireframe />
    </Torus>
  );
}

/* ── Floating rotating wireframe cube ── */
function FloatingCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.6;
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <Float speed={3} floatIntensity={0.8}>
      <Box ref={ref} args={[0.3, 0.3, 0.3]} position={[1.2, 0.8, 0]}>
        <meshStandardMaterial color="#a29bfe" emissive="#a29bfe" emissiveIntensity={0.6} wireframe />
      </Box>
    </Float>
  );
}

/* ── Particles — no text, no CDN ── */
const particles: { pos: [number, number, number]; color: string }[] = [
  { pos: [-2.2,  1.6,  0.0], color: "#a29bfe" },
  { pos: [ 2.0,  1.2, -0.5], color: "#74b9ff" },
  { pos: [-2.0, -1.4,  0.0], color: "#fd79a8" },
  { pos: [ 1.8, -1.6,  0.2], color: "#55efc4" },
  { pos: [-0.8, -2.0,  0.0], color: "#ffeaa7" },
  { pos: [ 0.4,  2.2,  0.0], color: "#6c63ff" },
];

/* ── HTML overlay code labels ── */
const codeLabels: {
  text: string;
  top: string;
  left?: string;
  right?: string;
  color: string;
}[] = [
  { text: "git push origin main",  top: "6%",  left: "4%",   color: "#55efc4" },
  { text: "npm run dev",           top: "10%", right: "4%",  color: "#74b9ff" },
  { text: "const x = () => {}",   top: "50%", left: "2%",   color: "#a29bfe" },
  { text: "<Component />",         top: "80%", left: "5%",   color: "#fd79a8" },
  { text: "SELECT * FROM db",      top: "80%", right: "4%",  color: "#ffeaa7" },
  { text: "docker compose up",     top: "50%", right: "2%",  color: "#6c63ff" },
  { text: "git commit -m '✨'",   top: "35%", left: "3%",   color: "#55efc4" },
  { text: "yarn build",            top: "65%", right: "3%",  color: "#fd79a8" },
];

/* ── Full 3-D scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6c63ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#74b9ff" />
      <RotatingTorus />
      <RotatingTorus2 />
      <FloatingCube />
      {particles.map((p, i) => (
        <CodeParticle key={i} position={p.pos} color={p.color} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

/* ── Section export ── */
export default function AboutSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasRef, { margin: "200px" });
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Three.js canvas + HTML code label overlay */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          ref={canvasRef}
          className="relative h-[420px] rounded-2xl overflow-hidden border border-accent/20 bg-secondary/40"
        >
          {/* Floating code text labels */}
          {codeLabels.map((label, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-[10px] pointer-events-none select-none z-10"
              style={{
                top: label.top,
                left: label.left,
                right: label.right,
                color: label.color,
              }}
              animate={{ y: [0, -5, 0], opacity: [0.45, 0.85, 0.45] }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
            >
              {label.text}
            </motion.span>
          ))}

          {inView && (
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          )}
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-accent text-sm mb-3 tracking-widest uppercase">
            01. About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Crafting <span className="gradient-text">Digital Experiences</span>
          </h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              I&apos;m{" "}
              <span className="text-white font-medium">Ismail Ait Rehail</span>, a
              full-stack developer with 3+ years of experience building modern web
              applications based in Rabat, Morocco.
            </p>
            <p>
              I specialize in <span className="text-accent">React</span>,{" "}
              <span className="text-accent">Next.js</span>, and{" "}
              <span className="text-accent">PostgreSQL</span> — crafting
              everything from pixel-perfect UIs to robust backend APIs.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m exploring SaaS ideas,
              print-on-demand projects, or preparing for government IT exams.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Experience", value: "3+ Years"     },
              { label: "Projects",   value: "10+"          },
              { label: "Location",   value: "Rabat, MA"    },
              { label: "Status",     value: "Open to work" },
            ].map((item) => (
              <div key={item.label} className="card-glass rounded-xl p-4">
                <p className="text-xs font-mono text-muted mb-1">{item.label}</p>
                <p className="font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
