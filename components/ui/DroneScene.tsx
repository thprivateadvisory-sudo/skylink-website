'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ──────────────────────────── Drone ──────────────────────────── */

function Drone() {
  const group = useRef<THREE.Group>(null);
  const cargo = useRef<THREE.Group>(null);
  const propellers = useRef<THREE.Mesh[]>([]);
  const beam = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = 0.6 + Math.sin(t * 1.1) * 0.18;
      group.current.rotation.z = Math.sin(t * 0.7) * 0.05;
      group.current.rotation.x = Math.sin(t * 0.5) * 0.04;
    }
    if (cargo.current) {
      cargo.current.rotation.z = Math.sin(t * 1.4) * 0.18;
      cargo.current.rotation.x = Math.sin(t * 1.0) * 0.1;
    }
    propellers.current.forEach((p, i) => {
      if (p) p.rotation.y += i % 2 === 0 ? 1.4 : -1.4;
    });
    if (beam.current) {
      const m = beam.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.18 + (Math.sin(t * 2) + 1) * 0.06;
    }
    ringRef.current.forEach((r, i) => {
      if (!r) return;
      const phase = (t * 0.6 + i * 0.4) % 1;
      r.scale.setScalar(0.4 + phase * 2.4);
      const m = r.material as THREE.MeshBasicMaterial;
      m.opacity = (1 - phase) * 0.55;
    });
  });

  const arms: { x: number; z: number; led: string }[] = [
    { x: 0.78, z: 0.78, led: '#00ffa3' },
    { x: -0.78, z: 0.78, led: '#00e5ff' },
    { x: 0.78, z: -0.78, led: '#00e5ff' },
    { x: -0.78, z: -0.78, led: '#00ffa3' },
  ];

  return (
    <group>
      <group ref={group} position={[0, 0.6, 0]}>
        {/* Central aerodynamic body */}
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.18, 0.55]} />
          <meshStandardMaterial
            color="#0d1218"
            metalness={0.95}
            roughness={0.2}
            emissive="#001a22"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Top dome / nav unit */}
        <mesh position={[0, 0.13, 0]}>
          <sphereGeometry args={[0.18, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#161c24"
            metalness={0.85}
            roughness={0.25}
            emissive="#003844"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Front sensor */}
        <mesh position={[0.42, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#22f0ff" />
        </mesh>

        {/* Tail beacon */}
        <mesh position={[-0.42, 0.05, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#00ffa3" />
        </mesh>

        {/* Glow strip underbody */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.85, 0.02, 0.45]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        {/* Cargo bay frame */}
        <mesh position={[0, -0.18, 0]}>
          <boxGeometry args={[0.55, 0.1, 0.42]} />
          <meshStandardMaterial color="#10151b" metalness={0.6} roughness={0.5} />
        </mesh>

        {/* Cable */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.45, 6]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
        </mesh>

        {/* Hanging cargo package */}
        <group ref={cargo} position={[0, -0.85, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.28, 0.34]} />
            <meshStandardMaterial
              color="#1a2129"
              metalness={0.4}
              roughness={0.6}
              emissive="#00251f"
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh position={[0, 0, 0.171]}>
            <planeGeometry args={[0.18, 0.04]} />
            <meshBasicMaterial color="#00ffa3" />
          </mesh>
          <mesh position={[0, -0.06, 0.171]}>
            <planeGeometry args={[0.12, 0.02]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
          <mesh position={[0, 0.142, 0]}>
            <boxGeometry args={[0.36, 0.005, 0.36]} />
            <meshBasicMaterial color="#00ffa3" />
          </mesh>
        </group>

        {/* Light beam cone */}
        <mesh ref={beam} position={[0, -1.6, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.7, 1.4, 32, 1, true]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Arms + propellers + motors */}
        {arms.map(({ x, z, led }, i) => (
          <group key={i}>
            <mesh
              position={[x * 0.5, 0, z * 0.5]}
              rotation={[0, Math.atan2(z, x), 0]}
            >
              <boxGeometry args={[0.95, 0.05, 0.07]} />
              <meshStandardMaterial color="#161c24" metalness={0.85} roughness={0.3} />
            </mesh>
            <mesh position={[x, 0.04, z]}>
              <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
              <meshStandardMaterial color="#0a0e12" metalness={0.95} roughness={0.18} />
            </mesh>
            <mesh
              ref={(el) => {
                if (el) propellers.current[i] = el;
              }}
              position={[x, 0.13, z]}
            >
              <torusGeometry args={[0.32, 0.012, 6, 32]} />
              <meshBasicMaterial color="#22f0ff" transparent opacity={0.35} />
            </mesh>
            <mesh
              ref={(el) => {
                if (el) propellers.current[i + 4] = el;
              }}
              position={[x, 0.13, z]}
            >
              <boxGeometry args={[0.62, 0.005, 0.04]} />
              <meshBasicMaterial color="#00e5ff" transparent opacity={0.25} />
            </mesh>
            <mesh position={[x, -0.04, z]}>
              <sphereGeometry args={[0.035, 10, 10]} />
              <meshBasicMaterial color={led} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Landing pad / target on ground */}
      <group position={[0, -1.85, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.85, 0.95, 64]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[0.55, 0.6, 64]} />
          <meshBasicMaterial color="#00ffa3" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <circleGeometry args={[0.12, 32]} />
          <meshBasicMaterial color="#00ffa3" transparent opacity={0.7} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) ringRef.current[i] = el;
            }}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.003, 0]}
          >
            <ringGeometry args={[0.5, 0.51, 64]} />
            <meshBasicMaterial
              color="#00e5ff"
              transparent
              opacity={0.5}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ──────────────────────── Atmosphere ──────────────────────── */

function Particles() {
  const points = useRef<THREE.Points>(null);
  const COUNT = 600;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.025;
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const y = pos.getY(i);
      const ny = y + 0.004;
      pos.setY(i, ny > 4 ? -4 : ny);
    }
    pos.needsUpdate = true;
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
        size={0.03}
        color="#5cf2ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GridFloor() {
  const grid = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (!grid.current) return;
    grid.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <gridHelper
      ref={grid}
      args={[40, 40, '#00e5ff', '#0a3a44']}
      position={[0, -1.86, 0]}
    />
  );
}

/* ──────────────────────── Camera Rig ──────────────────────── */

function CameraRig() {
  useFrame((state) => {
    const { camera, mouse, clock } = state;
    const t = clock.elapsedTime;
    const targetX = 2.8 + Math.sin(t * 0.15) * 0.4 + mouse.x * 0.5;
    const targetY = 1.0 + mouse.y * 0.3 + Math.sin(t * 0.2) * 0.15;
    const targetZ = 3.4 + Math.cos(t * 0.15) * 0.4;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ──────────────────────── Scene ──────────────────────── */

export function DroneScene() {
  return (
    <Canvas
      camera={{ position: [3, 1.2, 3.4], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.18} />
        <directionalLight position={[4, 6, 3]} intensity={0.7} color="#ffffff" />
        <pointLight position={[-3, 2, -2]} intensity={2.2} color="#00e5ff" distance={10} />
        <pointLight position={[3, -1, 2]} intensity={1.6} color="#00ffa3" distance={8} />
        <pointLight position={[0, -1.6, 0]} intensity={1.4} color="#00e5ff" distance={4} />

        <Drone />
        <Particles />
        <GridFloor />
        <CameraRig />

        <fog attach="fog" args={['#040608', 5, 14]} />
      </Suspense>
    </Canvas>
  );
}
