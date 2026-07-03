"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";

function Globe() {
  const wire = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (wire.current) wire.current.rotation.y = t * 0.18;
    if (glow.current) glow.current.rotation.y = -t * 0.1;
  });

  return (
    <group>
      {/* inner translucent sphere */}
      <Sphere ref={glow} args={[1.55, 32, 32]}>
        <meshStandardMaterial
          color="#6c63ff"
          emissive="#3b2fd6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.25}
          roughness={0.2}
          metalness={0.5}
        />
      </Sphere>
      {/* wireframe shell */}
      <Sphere ref={wire} args={[1.7, 24, 24]}>
        <meshBasicMaterial color="#74b9ff" wireframe transparent opacity={0.35} />
      </Sphere>
    </group>
  );
}

export default function GlobeCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  return (
    <div ref={ref} className="w-full h-full">
      {inView && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[4, 4, 4]} intensity={1.8} color="#a29bfe" />
            <pointLight position={[-4, -2, 2]} intensity={1} color="#74b9ff" />
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
              <Globe />
            </Float>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
