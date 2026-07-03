"use client";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float, Trail } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";

/* Glowing, morphing core at the center of the hero. */
function Core() {
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y = t * 0.2;
      inner.current.rotation.x = t * 0.1;
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.15;
      wire.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group>
      {/* solid distorting blob */}
      <Icosahedron ref={inner} args={[1.3, 12]}>
        <MeshDistortMaterial
          color="#6c63ff"
          emissive="#3b2fd6"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.6}
          distort={0.4}
          speed={2}
        />
      </Icosahedron>
      {/* wireframe cage around it */}
      <Icosahedron ref={wire} args={[1.7, 1]}>
        <meshBasicMaterial color="#a29bfe" wireframe transparent opacity={0.25} />
      </Icosahedron>
    </group>
  );
}

/* A single particle that orbits the core on its own tilted ring. */
function OrbitParticle({
  radius,
  speed,
  offset,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const a = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(a) * radius,
      Math.sin(a) * radius * Math.sin(tilt),
      Math.sin(a) * radius * Math.cos(tilt)
    );
  });
  return (
    <Trail width={1.2} length={4} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </Trail>
  );
}

/* Camera rig that eases toward the pointer for a subtle parallax. */
function Rig() {
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 1.2 - state.camera.position.x) * 0.04;
    state.camera.position.y += (state.pointer.y * 0.8 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "200px" });
  const particles = useMemo(
    () => [
      { radius: 2.4, speed: 0.6, offset: 0, tilt: 0.4, color: "#74b9ff" },
      { radius: 2.4, speed: 0.6, offset: Math.PI, tilt: 0.4, color: "#a29bfe" },
      { radius: 2.9, speed: 0.45, offset: 1.5, tilt: 1.1, color: "#fd79a8" },
      { radius: 2.1, speed: 0.75, offset: 3.0, tilt: 1.6, color: "#55efc4" },
      { radius: 3.2, speed: 0.35, offset: 4.5, tilt: 0.8, color: "#ffeaa7" },
    ],
    []
  );

  return (
    <div ref={wrapRef} className="w-full h-full">
      {inView && (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#6c63ff" />
            <pointLight position={[-5, -3, 2]} intensity={1.2} color="#74b9ff" />
            <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
              <Core />
            </Float>
            {particles.map((p, i) => (
              <OrbitParticle key={i} {...p} />
            ))}
            <Rig />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
