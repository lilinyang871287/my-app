import React from 'react';
import { motion } from 'framer-motion';

interface StoneProps {
  shape: string;
  isMossy?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Stone: React.FC<StoneProps> = ({ 
  shape, 
  isMossy = false, 
  onClick, 
  className = '', 
  children,
  size = 'md' 
}) => {
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-64 h-64 sm:w-80 sm:h-80'
  };

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`relative flex items-center justify-center transition-all duration-1000 ${sizeClasses[size]} ${className} shadow-xl ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        borderRadius: shape,
        backgroundColor: isMossy ? '#4A5D23' : '#C0C0C0', // Moss or Concrete
        boxShadow: isMossy 
          ? 'inset -10px -10px 30px rgba(0,0,0,0.3), 10px 10px 20px rgba(0,0,0,0.15)' 
          : 'inset 10px 10px 30px rgba(255,255,255,0.5), inset -10px -10px 30px rgba(0,0,0,0.2), 15px 15px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* Moss Texture overlay if mossy */}
      {isMossy && (
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            borderRadius: shape,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay'
          }}
        />
      )}
      
      {/* Stone Texture overlay if not mossy */}
      {!isMossy && (
         <div 
         className="absolute inset-0 opacity-20 pointer-events-none"
         style={{
           borderRadius: shape,
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
         }}
       />
      )}

      <div className="relative z-10 p-6 text-center">
        {children}
      </div>
    </motion.div>
  );
};