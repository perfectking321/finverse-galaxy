import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const PaymentPlanet = () => {
  const cardsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cardsRef.current) {
      cardsRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Holographic payment cards */}
      <group ref={cardsRef}>
        {[0, 1, 2].map((i) => (
          <RoundedBox
            key={i}
            args={[2.5, 1.5, 0.1]}
            radius={0.1}
            position={[
              Math.cos((i * Math.PI * 2) / 3) * 3,
              Math.sin((i * Math.PI * 2) / 3 + Date.now() * 0.001) * 0.5,
              Math.sin((i * Math.PI * 2) / 3) * 3,
            ]}
            rotation={[0, (i * Math.PI * 2) / 3, 0]}
          >
            <meshStandardMaterial
              color="#00f0ff"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.7}
              emissive="#00f0ff"
              emissiveIntensity={0.5}
            />
          </RoundedBox>
        ))}
      </group>

      {/* Payment zone title */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.6}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
      >
        PAYMENT HUB
      </Text>

      {/* Transaction particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Box
          key={i}
          args={[0.05, 0.05, 0.05]}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <meshBasicMaterial color="#00f0ff" />
        </Box>
      ))}

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" />
    </group>
  );
};
