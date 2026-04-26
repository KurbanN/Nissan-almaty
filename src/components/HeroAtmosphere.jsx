import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight abstract scene — ring light, wire torus, sparse particles.
 * Keeps draw calls low for mobile; parent may skip Canvas entirely on small screens.
 */
export function HeroAtmosphere({ reduced = false }) {
  const group = useRef(null);
  const particlesGeometry = useMemo(() => {
    const count = reduced ? 100 : 240;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.8 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [reduced]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.09;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.sin(performance.now() * 0.00015) * 0.08,
        0.02
      );
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.28} />
      <pointLight position={[5, 3.5, 6]} intensity={1.1} color="#e60023" />
      <pointLight position={[-6, -3, -5]} intensity={0.35} color="#6b8cff" />

      <mesh rotation={[Math.PI / 2.15, 0.65, 0]}>
        <torusGeometry args={[3.35, 0.032, 10, 72]} />
        <meshStandardMaterial
          color="#e60023"
          metalness={0.88}
          roughness={0.22}
          emissive="#2a0508"
          emissiveIntensity={0.45}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.4, -0.35, 0.45]}>
        <torusGeometry args={[2.05, 0.018, 8, 56]} />
        <meshBasicMaterial
          color="#3f3f46"
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>

      <points geometry={particlesGeometry}>
        <pointsMaterial
          size={reduced ? 0.022 : 0.028}
          color="#ff4d5c"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
