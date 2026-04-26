'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

function DroneBody() {
  const group = useRef<THREE.Group>(null);
  const propellers = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Gentle hover
    group.current.position.y = Math.sin(t * 1.3) * 0.15;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    // Spin propellers
    propellers.current.forEach((p) => {
      if (p) p.rotation.y += 0.6;
    });
  });

  // Drone arm positions
  const arms: [number, number, number][] = [
    [0.7, 0, 0.7],
    [-0.7, 0, 0.7],
    [0.7, 0, -0.7],
    [-0.7, 0, -0.7],
  ];

  return (
    <group ref={group}>
      {/* Central body */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.18, 0.5]} />
        <meshStandardMaterial
          color="#0a0e12"
          metalness={0.9}
          roughness={0.25}
          emissive="#001920"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Cargo pod underneath */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.5, 0.14, 0.4]} />
        <meshStandardMaterial
          color="#10151b"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Glow strip under cargo */}
      <mesh position={[0, -0.26, 0]}>
        <boxGeometry args={[0.42, 0.02, 0.32]} />
        <meshBasicMaterial color="#00ffa3" />
      </mesh>

      {/* Top sensor */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Arms + propellers */}
      {arms.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Arm */}
          <mesh
            position={[-x * 0.5, 0, -z * 0.5]}
            rotation={[0, Math.atan2(z, x), 0]}
          >
            <cylinderGeometry args={[0.04, 0.05, 0.9, 8]} />
            <meshStandardMaterial
              color="#161c24"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          {/* Motor */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.1, 12]} />
            <meshStandardMaterial color="#0a0e12" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Propeller */}
          <mesh
            ref={(el) => {
              if (el) propellers.current[i] = el;
            }}
            position={[0, 0.13, 0]}
          >
            <boxGeometry args={[0.55, 0.005, 0.04]} />
            <meshStandardMaterial
              color="#00e5ff"
              transparent
              opacity={0.35}
              emissive="#00e5ff"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Status LED */}
          <mesh position={[0, -0.04, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#00ffa3' : '#00e5ff'}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00e5ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[30, 30, '#00e5ff', '#0a3a44']}
      position={[0, -2, 0]}
    />
  );
}

export function DroneScene() {
  return (
    <Canvas
      camera={{ position: [2.5, 1.2, 3.2], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 2]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-3, 2, -2]} intensity={1.2} color="#00e5ff" />
        <pointLight position={[3, -1, 2]} intensity={0.8} color="#00ffa3" />

        <DroneBody />
        <ParticleField />
        <GridFloor />

        <fog attach="fog" args={['#040608', 4, 12]} />
      </Suspense>
    </Canvas>
  );
}
