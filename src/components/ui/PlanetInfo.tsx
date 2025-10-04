import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/store/navigationStore';
import { PLANETS } from '@/utils/constants';
import { HolographicCard } from './HolographicCard';
import { Activity, TrendingUp, Zap } from 'lucide-react';

export const PlanetInfo = () => {
  const currentZone = useNavigationStore((state) => state.currentZone);
  const currentPlanet = PLANETS.find((p) => p.id === currentZone);
  
  const isHub = currentZone === 'hub';

  if (isHub) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-8 left-8 right-8 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto">
          <HolographicCard className="pointer-events-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold neon-text-cyan mb-2">
                Welcome to FinVerse 3D
              </h2>
              <p className="text-muted-foreground">
                Navigate through the financial universe. Click on any planet to explore.
              </p>
            </div>
          </HolographicCard>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {currentPlanet && (
        <motion.div
          key={currentZone}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-8 right-8 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <HolographicCard className="pointer-events-auto" delay={0.1}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </HolographicCard>

            <HolographicCard className="pointer-events-auto" delay={0.2}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-secondary/20">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold">+24.5%</p>
                </div>
              </div>
            </HolographicCard>

            <HolographicCard className="pointer-events-auto" delay={0.3}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-accent/20">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="text-2xl font-bold">98.7%</p>
                </div>
              </div>
            </HolographicCard>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
