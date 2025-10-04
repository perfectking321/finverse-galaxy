import { Vector3 } from 'three';

export interface PlanetData {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  scale: number;
  description: string;
  icon: string;
}

export const PLANETS: PlanetData[] = [
  {
    id: 'payment',
    name: 'Payment Hub',
    color: '#00f0ff', // Neon cyan
    position: [8, 2, 0],
    scale: 2,
    description: 'Process transactions across dimensions',
    icon: '💳',
  },
  {
    id: 'blockchain',
    name: 'Blockchain Nexus',
    color: '#b400ff', // Neon purple
    position: [-8, 2, 0],
    scale: 2.2,
    description: 'Explore the distributed ledger universe',
    icon: '⛓️',
  },
  {
    id: 'ai-advisor',
    name: 'AI Advisor Station',
    color: '#ffd700', // Neon gold
    position: [0, 2, 8],
    scale: 1.8,
    description: 'Intelligent financial guidance powered by AI',
    icon: '🤖',
  },
  {
    id: 'security',
    name: 'Security Fortress',
    color: '#ff3366', // Neon red
    position: [0, 2, -8],
    scale: 2.1,
    description: 'Fort Knox meets quantum encryption',
    icon: '🛡️',
  },
];

export const CAMERA_POSITIONS = {
  hub: new Vector3(0, 5, 15),
  payment: new Vector3(8, 2, 5),
  blockchain: new Vector3(-8, 2, 5),
  'ai-advisor': new Vector3(0, 2, 13),
  security: new Vector3(0, 2, -3),
};
