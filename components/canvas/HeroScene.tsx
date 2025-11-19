"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import ErrorBoundary from "@/components/dom/ErrorBoundary";

// Particle system
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useStore((state) => state.mouse);

  const particlesCount = 5000;

  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotate the entire particle system
    pointsRef.current.rotation.y = time * 0.05;

    // Mouse interaction
    pointsRef.current.rotation.x = mouse.y * 0.3;
    pointsRef.current.rotation.z = mouse.x * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#F0F0F0"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-5, 2, -5]}>
          <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
          <meshBasicMaterial color="#00FFFF" wireframe />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[6, -1, -8]}>
          <octahedronGeometry args={[1]} />
          <meshBasicMaterial color="#F0F0F0" wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[3, 3, -6]}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#00FFFF" wireframe />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#050505"]} />
          <Particles />
          <FloatingShapes />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
