"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* Slowly drifting star field that reacts to the pointer for a parallax feel. */
function StarField() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.02;
    group.current.rotation.x = t * 0.01;
    // gentle parallax toward the cursor
    group.current.rotation.y += state.pointer.x * 0.15;
    group.current.rotation.x += state.pointer.y * 0.08;
  });

  return (
    <group ref={group}>
      <Stars radius={80} depth={60} count={4000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={80} scale={18} size={3} speed={0.4} color="#a29bfe" opacity={0.6} />
      <Sparkles count={40} scale={22} size={2} speed={0.3} color="#74b9ff" opacity={0.5} />
    </group>
  );
}

/* Fixed, full-viewport canvas that lives behind every section. */
export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
      {/* soft radial glow layered on top of the stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(108,99,255,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(116,185,255,0.08),transparent_50%)]" />
    </div>
  );
}
