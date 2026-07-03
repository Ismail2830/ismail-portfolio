"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Procedurally paint a recognizable earth texture (no external image needed). */
function useEarthTexture() {
  return useMemo(() => {
    const W = 512;
    const H = 256;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;

    // deep-ocean gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#123a86");
    grad.addColorStop(0.5, "#1b57d6");
    grad.addColorStop(1, "#0a1f63");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // continents drawn as clusters of overlapping organic blobs so they read as
    // real landmasses rather than isolated dots. Coords are fractions of W/H.
    const continents: [number, number, number][][] = [
      // Americas (left)
      [[0.10, 0.30, 34], [0.12, 0.42, 30], [0.15, 0.55, 40], [0.17, 0.70, 30], [0.13, 0.82, 22]],
      // Africa / Europe (centre)
      [[0.44, 0.30, 26], [0.47, 0.44, 34], [0.49, 0.58, 36], [0.46, 0.70, 26]],
      // Asia (upper right)
      [[0.66, 0.28, 40], [0.74, 0.34, 44], [0.80, 0.44, 30], [0.62, 0.40, 26]],
      // Australia (lower right)
      [[0.82, 0.72, 26], [0.86, 0.78, 20]],
    ];

    const drawBlob = (cx: number, cy: number, rad: number, fill: string) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      const steps = 14;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const r = rad * (0.7 + Math.random() * 0.6);
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    continents.forEach((cluster) => {
      cluster.forEach(([fx, fy, rad]) => {
        drawBlob(fx * W, fy * H, rad, "#2f9e5a");
        // lighter interior for depth
        drawBlob(fx * W, fy * H, rad * 0.55, "#43b86a");
      });
    });

    // polar ice caps
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(0, 0, W, 12);
    ctx.fillRect(0, H - 12, W, 12);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
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

  // 1:1 pointer tracking (no lag) so the globe sits exactly on the click point,
  // plus interactive-element detection for the hover state.
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a, button, input, textarea, select, label, [role='button']"));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      className="cursor-globe fixed left-0 top-0 z-[9999] pointer-events-none will-change-transform"
      style={{ transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)" }}
    >
      {/* ripple pulse fired on each click */}
      {clickId > 0 && (
        <span
          key={clickId}
          className="absolute left-1/2 top-1/2 rounded-full border border-accent-light"
          style={{
            width: 54,
            height: 54,
            marginLeft: -27,
            marginTop: -27,
            animation: "cursor-ripple 0.5s ease-out forwards",
          }}
        />
      )}

      <div
        className="transition-transform duration-150 ease-out"
        style={{
          width: 54,
          height: 54,
          transform: `scale(${(hovering ? 1.5 : 1) * (pressed ? 0.82 : 1)})`,
          filter: "drop-shadow(0 0 7px rgba(108,99,255,0.7))",
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
