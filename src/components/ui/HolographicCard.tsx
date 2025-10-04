import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const HolographicCard = ({ children, className = '', delay = 0 }: HolographicCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-panel holographic-border p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
