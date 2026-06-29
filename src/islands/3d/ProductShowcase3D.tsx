import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProductShowcase3DProps {
  productName?: string;
  color?: string;
  autoRotate?: boolean;
}

function ProductModel({ color = '#1C1917' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();

  useFrame((state) => {
    if (meshRef.current && !prefersReduced) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 2.5, 0.5]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      {/* Hanger */}
      <mesh position={[0, 1.6, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function Scene({ color }: { color?: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <ProductModel color={color} />
      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={1}
      />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

export default function ProductShowcase3D({
  productName,
  color = '#1C1917',
}: ProductShowcase3DProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-square w-full bg-gradient-to-b from-muted/50 to-background">
      {!isLoaded && <LoadingSpinner />}

      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          onCreated={() => setIsLoaded(true)}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene color={color} />
        </Canvas>
      </Suspense>

      {/* Product Name Overlay */}
      {productName && (
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-sm font-medium text-muted">
            Drag to rotate
          </p>
        </div>
      )}
    </div>
  );
}
