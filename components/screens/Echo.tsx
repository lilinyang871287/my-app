import React from 'react';
import { motion } from 'framer-motion';
import { Stone } from '../Stone';

interface EchoProps {
  insight: string;
  stoneShape: string;
  onReturn: () => void;
}

export const Echo: React.FC<EchoProps> = ({ insight, stoneShape, onReturn }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      
      {/* The finished stone, now smaller, joining the 'courtyard' metaphorically */}
      <motion.div
        initial={{ scale: 1.5, y: 0 }}
        animate={{ scale: 0.8, y: -40 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
        className="mb-8"
      >
        <Stone shape={stoneShape} isMossy size="md" />
      </motion.div>

      {/* Perspective Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-xs bg-[#F0F0F0] p-8 rounded-xl shadow-xl border border-white text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-moss opacity-30"></div>
        <h3 className="text-xs tracking-widest text-moss mb-6 opacity-70">透视卡片</h3>
        <p className="font-serif text-lg text-ink leading-loose">
          “{insight}”
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={onReturn}
        className="absolute bottom-12 text-xs tracking-widest text-ink/40 hover:text-moss transition-colors"
      >
        回到庭院
      </motion.button>
    </div>
  );
};