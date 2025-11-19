"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useStore((state) => state.mouse);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotation based on scroll/time
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.15;

    // Mouse interaction
    meshRef.current.rotation.z = mouse.x * 0.5;
    meshRef.current.position.x = mouse.x * 0.5;
    meshRef.current.position.y = mouse.y * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 4]} />
      <MeshDistortMaterial
        color="#00FFFF"
        wireframe
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}

export default function SkillsSphere() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <MorphingSphere />
      </Canvas>
    </div>
  );
}
