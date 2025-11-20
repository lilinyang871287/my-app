import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stone } from '../Stone';

interface EtchingProps {
  stoneShape: string;
  onLayDown: (text: string) => void;
}

export const Etching: React.FC<EtchingProps> = ({ stoneShape, onLayDown }) => {
  const [text, setText] = useState('');
  const [isCarving, setIsCarving] = useState(false);

  const handleSubmit = () => {
      if (text.trim().length === 0) return;
      setIsCarving(true);
      
      // Wait for the carving animation to "settle" before moving to next screen
      setTimeout(() => {
          onLayDown(text);
      }, 1500);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <Stone shape={stoneShape} size="lg" className="flex items-center justify-center overflow-hidden">
          {/* 
             Textarea Visual Fixes:
             1. outline-none focus:outline-none ring-0 focus:ring-0 -> Removes Blue/Black Box
             2. bg-transparent border-none -> Removes box background and borders
             3. text-shadow -> creates the 'Letterpress' / Engraved look
          */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="刚才发生了什么？"
            disabled={isCarving}
            maxLength={140}
            autoFocus
            style={{
               textShadow: '0px 1px 0px rgba(255,255,255,0.5)' // Engraved highlight
            }}
            className={`
                w-full h-48 
                bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none
                text-center resize-none p-8 
                text-[#333] font-serif text-lg leading-relaxed
                placeholder:text-ink/30 placeholder:italic placeholder:shadow-none
                transition-all duration-1000
                ${isCarving ? 'carved-deep scale-[0.98]' : ''}
            `}
          />
        </Stone>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: text.length > 0 && !isCarving ? 1 : 0 }}
        disabled={text.length === 0 || isCarving}
        onClick={handleSubmit}
        className="mt-12 px-8 py-3 bg-transparent border border-ink/20 rounded-full text-ink/60 tracking-widest text-sm font-serif hover:bg-ink/5 transition-all disabled:opacity-0 focus:outline-none focus:ring-0"
      >
        {isCarving ? "刻录中..." : "刻好了，放下吧"}
      </motion.button>
      
      {!isCarving && (
        <div className="mt-4 text-ink/20 text-xs italic font-serif">
            {text.length}/140
        </div>
      )}
    </div>
  );
};