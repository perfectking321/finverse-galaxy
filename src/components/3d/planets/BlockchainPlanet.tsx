import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

export const BlockchainPlanet = () => {
  const chainRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (chainRef.current) {
      chainRef.current.rotation.y += 0.003;
    }
  });

  // Generate blockchain blocks
  const blocks = Array.from({ length: 8 }, (_, i) => ({
    position: [
      Math.cos((i * Math.PI * 2) / 8) * 4,
      0,
      Math.sin((i * Math.PI * 2) / 8) * 4,
    ] as [number, number, number],
    rotation: [0, (i * Math.PI * 2) / 8, 0] as [number, number, number],
  }));

  return (
    <group position={[0, 0, 0]}>
      <group ref={chainRef}>
        {/* Blockchain blocks */}
        {blocks.map((block, i) => (
          <group key={i} position={block.position} rotation={block.rotation}>
            <Box args={[1.2, 1.2, 1.2]}>
              <meshStandardMaterial
                color="#b400ff"
                metalness={0.8}
                roughness={0.3}
                transparent
                opacity={0.8}
                emissive="#b400ff"
                emissiveIntensity={0.4}
              />
            </Box>
            {/* Block edges glow */}
            <Box args={[1.25, 1.25, 1.25]}>
              <meshBasicMaterial
                color="#b400ff"
                transparent
                opacity={0.2}
                wireframe
              />
            </Box>
          </group>
        ))}

        {/* Connection lines between blocks */}
        {blocks.map((_, i) => {
          const nextIndex = (i + 1) % blocks.length;
          return (
            <Line
              key={`line-${i}`}
              points={[blocks[i].position, blocks[nextIndex].position]}
              color="#b400ff"
              lineWidth={2}
              transparent
              opacity={0.6}
            />
          );
        })}
      </group>

      {/* Zone title */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.6}
        color="#b400ff"
        anchorX="center"
        anchorY="middle"
      >
        BLOCKCHAIN NEXUS
      </Text>

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#b400ff" />
    </group>
  );
};
