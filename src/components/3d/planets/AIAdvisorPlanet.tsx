import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const AIAdvisorPlanet = () => {
  const avatarRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (avatarRef.current) {
      avatarRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y += 0.01;
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* AI Avatar */}
      <group ref={avatarRef}>
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial
            color="#ffd700"
            metalness={0.9}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* Avatar glow */}
        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial color="#ffd700" transparent opacity={0.2} />
        </Sphere>

        {/* Simple "face" */}
        <group position={[0, 0, 0.9]}>
          <Sphere args={[0.1, 16, 16]} position={[-0.3, 0.2, 0]}>
            <meshBasicMaterial color="#0a0a1a" />
          </Sphere>
          <Sphere args={[0.1, 16, 16]} position={[0.3, 0.2, 0]}>
            <meshBasicMaterial color="#0a0a1a" />
          </Sphere>
        </group>
      </group>

      {/* Orbiting data rings */}
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <Torus
            key={i}
            args={[2 + i * 0.5, 0.05, 16, 100]}
            rotation={[(i * Math.PI) / 6, (i * Math.PI) / 4, 0]}
          >
            <meshBasicMaterial color="#ffd700" transparent opacity={0.6} />
          </Torus>
        ))}
      </group>

      {/* Floating data points */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.05, 8, 8]}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
          ]}
        >
          <meshBasicMaterial color="#ffd700" />
        </Sphere>
      ))}

      {/* Zone title */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.6}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
      >
        AI ADVISOR
      </Text>

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffd700" />
    </group>
  );
};
