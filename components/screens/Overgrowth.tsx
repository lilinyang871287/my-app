import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stone } from '../Stone';

interface OvergrowthProps {
  worry: string;
  stoneShape: string;
  onGrowthComplete: () => void;
}

export const Overgrowth: React.FC<OvergrowthProps> = ({ worry, stoneShape, onGrowthComplete }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onGrowthComplete();
    }, 5000); // 5 seconds total duration
    return () => clearTimeout(timer);
  }, [onGrowthComplete]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <motion.div className="relative">
        {/* Base Stone with Text - Starts deeply carved then covered */}
        <Stone shape={stoneShape} size="lg" className="overflow-hidden">
            <motion.p
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2, delay: 1 }}
                className="font-serif text-lg text-center p-6 leading-relaxed carved-deep"
            >
                {worry}
            </motion.p>

            {/* Moss Overlay Animation */}
            <motion.div
                initial={{ opacity: 0, scale: 1.2 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 bg-moss z-10"
                style={{
                    borderRadius: stoneShape,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                }}
            />
            {/* Lighter moss patches for texture */}
            <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.4 }}
                 transition={{ duration: 3, delay: 1.5 }}
                 className="absolute inset-0 bg-moss-light z-20 mix-blend-soft-light"
                 style={{ borderRadius: stoneShape }}
            />
        </Stone>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.5, 1] }}
        className="mt-8 text-moss text-sm font-serif"
      >
        正在回归大地...
      </motion.p>
    </div>
  );
};