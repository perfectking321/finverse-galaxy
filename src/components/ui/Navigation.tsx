import { motion, AnimatePresence } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigationStore, Zone } from '@/store/navigationStore';
import { PLANETS } from '@/utils/constants';

export const Navigation = () => {
  const { currentZone, returnToHub } = useNavigationStore();

  const currentPlanet = PLANETS.find((p) => p.id === currentZone);
  const isHub = currentZone === 'hub';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold neon-text-cyan">FINVERSE 3D</h1>
          <AnimatePresence mode="wait">
            {!isHub && currentPlanet && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <span className="text-muted-foreground">/</span>
                <span className="text-xl" style={{ color: currentPlanet.color }}>
                  {currentPlanet.icon} {currentPlanet.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-4">
          {!isHub && (
            <button
              onClick={returnToHub}
              className="glass-button flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Hub
            </button>
          )}
          
          {isHub && (
            <div className="glass-panel px-4 py-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <span className="text-sm">Central Hub</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
