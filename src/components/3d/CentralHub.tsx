import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './shared/Planet';
import { ParticleField } from './effects/ParticleField';
import { PLANETS } from '@/utils/constants';
import { useNavigationStore } from '@/store/navigationStore';

export const CentralHub = () => {
  const hubRef = useRef<THREE.Group>(null);
  const navigateToZone = useNavigationStore((state) => state.navigateToZone);

  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y += 0.002;
      hubRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Ambient particle field */}
      <ParticleField count={1500} color="#00f0ff" />

      {/* Central Hub Station */}
      <group ref={hubRef}>
        {/* Main hub structure */}
        <Box args={[3, 3, 3]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
            emissive="#00f0ff"
            emissiveIntensity={0.3}
          />
        </Box>

        {/* Hub glow */}
        <Box args={[3.2, 3.2, 3.2]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} />
        </Box>

        {/* FinVerse Title */}
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.8}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#0a0a1a"
        >
          FINVERSE 3D
        </Text>
      </group>

      {/* Orbiting Planets */}
      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          position={planet.position}
          color={planet.color}
          scale={planet.scale}
          onClick={() => navigateToZone(planet.id as any)}
        />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#00f0ff" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#b400ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffd700" />
    </group>
  );
};
