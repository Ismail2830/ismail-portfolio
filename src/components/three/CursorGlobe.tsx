"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Procedurally paint a small earth-like texture (no external image needed). */
function useEarthTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const ctx = c.getContext("2d")!;

    // ocean gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, "#1e40af");
    grad.addColorStop(0.5, "#1d4ed8");
    grad.addColorStop(1, "#0b2472");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    // landmass blobs
    const blobs: [number, number, number][] = [
      [38, 48, 1], [64, 38, 0.8], [116, 66, 1.2], [168, 44, 0.9],
      [200, 82, 1], [88, 92, 0.9], [214, 28, 0.7], [150, 96, 0.8],
    ];
    blobs.forEach(([x, y, s]) => {
      ctx.fillStyle = Math.random() > 0.5 ? "#2f9e6b" : "#3fae5a";
      ctx.beginPath();
      const steps = 10;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const r = (7 + Math.random() * 12) * s;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r * 0.65;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    });

    // polar ice caps
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(0, 0, 256, 6);
    ctx.fillRect(0, 122, 256, 6);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Earth() {
  const earth = useRef<THREE.Mesh>(null);
  const texture = useEarthTexture();

  useFrame((_, delta) => {
    if (earth.current) earth.current.rotation.y += delta * 0.6;
  });

  return (
    <group rotation={[0.3, 0, 0.15]}>
      {/* the planet */}
      <mesh ref={earth}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial map={texture} roughness={0.75} metalness={0.1} />
      </mesh>
      {/* glowing atmosphere shell */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6c9bff" transparent opacity={0.18} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function CursorGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [clickId, setClickId] = useState(0);

  // only enable on devices with a fine pointer (mouse)
  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // click feedback: dip the globe on press, fire a ripple on click
  useEffect(() => {
    if (!enabled) return;
    const down = () => {
      setPressed(true);
      setClickId((n) => n + 1);
    };
    const up = () => setPressed(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled]);

  // hide the native cursor while the globe is active
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-globe-on");
    return () => document.documentElement.classList.remove("cursor-globe-on");
  }, [enabled]);

  // smooth follow loop + interactive-element detection
  useEffect(() => {
    if (!enabled) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a, button, input, textarea, [role='button']"));
    };

    const loop = () => {
      cur.x += (target.x - cur.x) * 0.22;
      cur.y += (target.y - cur.y) * 0.22;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed left-0 top-0 z-[9999] pointer-events-none will-change-transform"
      style={{ transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)" }}
    >
      {/* ripple pulse fired on each click */}
      {clickId > 0 && (
        <span
          key={clickId}
          className="absolute left-1/2 top-1/2 rounded-full border border-accent-light"
          style={{
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            animation: "cursor-ripple 0.5s ease-out forwards",
          }}
        />
      )}

      <div
        className="transition-transform duration-150 ease-out"
        style={{
          width: 40,
          height: 40,
          transform: `scale(${(hovering ? 1.6 : 1) * (pressed ? 0.8 : 1)})`,
          filter: "drop-shadow(0 0 6px rgba(108,99,255,0.6))",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 2, 4]} intensity={2} />
          <Earth />
        </Canvas>
      </div>
    </div>
  );
}
