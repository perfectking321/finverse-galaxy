import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const SecurityPlanet = () => {
  const shieldRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y += 0.002;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      shieldRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central security core */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial
          color="#ff3366"
          metalness={0.9}
          roughness={0.1}
          emissive="#ff3366"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Shield layers */}
      <group ref={shieldRef}>
        {[0, 1, 2].map((i) => (
          <Sphere
            key={i}
            args={[2 + i * 0.5, 32, 32]}
          >
            <meshBasicMaterial
              color="#ff3366"
              transparent
              opacity={0.15 - i * 0.03}
              wireframe
            />
          </Sphere>
        ))}
      </group>

      {/* Protective rings */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Torus args={[3, 0.1, 16, 100]}>
          <meshBasicMaterial color="#ff3366" transparent opacity={0.7} />
        </Torus>
      </group>
      <group rotation={[Math.PI / 4, Math.PI / 2, 0]}>
        <Torus args={[3, 0.1, 16, 100]}>
          <meshBasicMaterial color="#ff3366" transparent opacity={0.7} />
        </Torus>
      </group>

      {/* Security indicators */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        return (
          <Sphere
            key={i}
            args={[0.1, 16, 16]}
            position={[
              Math.cos(angle) * 4,
              Math.sin(angle) * 4,
              0,
            ]}
          >
            <meshBasicMaterial color="#ff3366" />
          </Sphere>
        );
      })}

      {/* Zone title */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#ff3366"
        anchorX="center"
        anchorY="middle"
      >
        SECURITY FORTRESS
      </Text>

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff3366" />
    </group>
  );
};
