import { Scene } from '@/components/Scene';
import { Navigation } from '@/components/ui/Navigation';
import { PlanetInfo } from '@/components/ui/PlanetInfo';

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Scene />
      <Navigation />
      <PlanetInfo />
    </div>
  );
};

export default Index;
