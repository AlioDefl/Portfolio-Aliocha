"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import ErrorBoundary from "@/components/dom/ErrorBoundary";
import { PARTICLES, COLORS, getParticleCount } from "@/lib/constants";

// Particle system with responsive particle count
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useStore((state) => state.mouse);
  const [particlesCount, setParticlesCount] = useState<number>(PARTICLES.COUNT_DESKTOP);

  // Adjust particle count based on screen size
  useEffect(() => {
    const updateParticleCount = () => {
      setParticlesCount(getParticleCount(window.innerWidth));
    };

    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);
    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * PARTICLES.POSITION_RANGE_XY;
      positions[i * 3 + 1] = (Math.random() - 0.5) * PARTICLES.POSITION_RANGE_XY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * PARTICLES.POSITION_RANGE_Z;
    }
    return positions;
  }, [particlesCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotate the entire particle system
    pointsRef.current.rotation.y = time * PARTICLES.ROTATION_SPEED_Y;

    // Mouse interaction
    pointsRef.current.rotation.x = mouse.y * PARTICLES.MOUSE_ROTATION_X;
    pointsRef.current.rotation.z = mouse.x * PARTICLES.MOUSE_ROTATION_Z;
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
        size={PARTICLES.SIZE}
        color={COLORS.LIGHT}
        transparent
        opacity={PARTICLES.OPACITY}
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
          <meshBasicMaterial color={COLORS.ACCENT} wireframe />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[6, -1, -8]}>
          <octahedronGeometry args={[1]} />
          <meshBasicMaterial color={COLORS.LIGHT} wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[3, 3, -6]}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color={COLORS.ACCENT} wireframe />
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
          <color attach="background" args={[COLORS.DARK]} />
          <Particles />
          <FloatingShapes />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
