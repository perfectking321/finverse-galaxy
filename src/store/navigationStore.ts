import { create } from 'zustand';

export type Zone = 'hub' | 'payment' | 'blockchain' | 'ai-advisor' | 'security';

interface NavigationState {
  currentZone: Zone;
  previousZone: Zone | null;
  isTransitioning: boolean;
  navigateToZone: (zone: Zone) => void;
  setTransitioning: (transitioning: boolean) => void;
  returnToHub: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentZone: 'hub',
  previousZone: null,
  isTransitioning: false,
  
  navigateToZone: (zone: Zone) =>
    set((state) => ({
      previousZone: state.currentZone,
      currentZone: zone,
      isTransitioning: true,
    })),
  
  setTransitioning: (transitioning: boolean) =>
    set({ isTransitioning: transitioning }),
  
  returnToHub: () =>
    set((state) => ({
      previousZone: state.currentZone,
      currentZone: 'hub',
      isTransitioning: true,
    })),
}));
