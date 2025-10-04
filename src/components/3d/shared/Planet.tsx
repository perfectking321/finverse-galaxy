import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  onClick?: () => void;
  distortSpeed?: number;
  distortAmount?: number;
}

export const Planet = ({
  position,
  color,
  scale = 1,
  onClick,
  distortSpeed = 2,
  distortAmount = 0.3,
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.002;
      // Pulse effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(scale * 1.2 * pulse);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[1, 32, 32]} scale={scale * 1.2}>
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </Sphere>

      {/* Main planet */}
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        scale={scale}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distortAmount}
          speed={distortSpeed}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Inner core glow */}
      <Sphere args={[0.8, 32, 32]} scale={scale}>
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </Sphere>
    </group>
  );
};
