import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Hero3DProps {
  color?: string;
}

function FloatingShape({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();

  useFrame((state) => {
    if (meshRef.current && !prefersReduced) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#CA8A04"
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();

  useFrame((state) => {
    if (meshRef.current && !prefersReduced) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <MeshDistortMaterial
          color="#1C1917"
          roughness={0.3}
          metalness={0.5}
          distort={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#CA8A04" />

      <FloatingShape position={[-3, 0, -2]} scale={0.8} />
      <FloatingShape position={[3, 1, -3]} scale={0.6} />
      <FloatingTorus position={[0, -1, -2]} scale={0.5} />
      <FloatingTorus position={[-2, 2, -4]} scale={0.4} />

      <Environment preset="city" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

export default function Hero3DIsland({ color = '#1C1917' }: Hero3DProps) {
  return (
    <div className="relative h-[80vh] w-full bg-foreground">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/80 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-background z-10">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl font-heading">
            KENZ Maison
          </h1>
          <p className="text-lg text-background/70">Premium Fashion Experience</p>
        </div>
      </div>
    </div>
  );
}
