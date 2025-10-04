import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNavigationStore, Zone } from '@/store/navigationStore';
import { CentralHub } from './3d/CentralHub';
import { PaymentPlanet } from './3d/planets/PaymentPlanet';
import { BlockchainPlanet } from './3d/planets/BlockchainPlanet';
import { AIAdvisorPlanet } from './3d/planets/AIAdvisorPlanet';
import { SecurityPlanet } from './3d/planets/SecurityPlanet';
import { CAMERA_POSITIONS } from '@/utils/constants';
import * as THREE from 'three';

const SceneContent = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);
  const { currentZone, setTransitioning } = useNavigationStore();

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    const targetPosition = CAMERA_POSITIONS[currentZone];
    const targetLookAt = currentZone === 'hub' ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(0, 0, 0);

    // Animate camera transition
    const startPosition = cameraRef.current.position.clone();
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      if (cameraRef.current) {
        cameraRef.current.position.lerpVectors(startPosition, targetPosition, eased);
      }

      if (controlsRef.current) {
        const currentTarget = controlsRef.current.target.clone();
        controlsRef.current.target.lerpVectors(currentTarget, targetLookAt, eased);
        controlsRef.current.update();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTransitioning(false);
      }
    };

    animate();
  }, [currentZone, setTransitioning]);

  const renderZone = () => {
    switch (currentZone) {
      case 'payment':
        return <PaymentPlanet />;
      case 'blockchain':
        return <BlockchainPlanet />;
      case 'ai-advisor':
        return <AIAdvisorPlanet />;
      case 'security':
        return <SecurityPlanet />;
      default:
        return <CentralHub />;
    }
  };

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 5, 15]}
        fov={75}
      />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
        enablePan={false}
      />
      {renderZone()}
    </>
  );
};

export const Scene = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <SceneContent />
        <fog attach="fog" args={['#0a0a1a', 10, 50]} />
      </Canvas>
    </div>
  );
};
