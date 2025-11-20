import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoneData, Weather } from '../../types';
import { Stone } from '../Stone';
import { Cloud, Sun, CloudRain, CloudLightning, X } from 'lucide-react';

interface CourtyardProps {
  stones: StoneData[];
  onStart: (weather: Weather) => void;
}

export const Courtyard: React.FC<CourtyardProps> = ({ stones, onStart }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedStone, setSelectedStone] = useState<StoneData | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const weatherOptions = [
    { type: Weather.SUN, icon: Sun, label: "晴朗" },
    { type: Weather.CLOUD, icon: Cloud, label: "多云" },
    { type: Weather.RAIN, icon: CloudRain, label: "雨天" },
    { type: Weather.STORM, icon: CloudLightning, label: "风暴" },
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-6 relative overflow-y-auto overflow-x-hidden">
      <header className="mb-8 mt-4 text-center z-20 pointer-events-none flex-shrink-0">
        <h1 className="text-3xl font-serif font-bold text-ink opacity-80">苔藓与石</h1>
        <p className="text-xs text-ink/60 mt-2 tracking-[0.2em] uppercase">Moss & Stone</p>
      </header>

      {/* Past Stones - Organic Scattering */}
      {/* Added pb-64 to guarantee no overlap with the fixed bottom button */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-wrap justify-center content-start gap-12 pb-64 pt-4 max-w-3xl mx-auto"
      >
        {stones.map((stone) => (
          <motion.div 
            key={stone.id} 
            variants={itemVariants} 
            className="relative"
            style={{
                marginTop: `${stone.offsetY}px`,
                marginLeft: `${stone.offsetX}px`,
                marginRight: `${stone.offsetX * -0.5}px`, // Counter-balance slightly
                rotate: `${stone.rotation}deg`,
            }}
          >
            <Stone 
                shape={stone.shapePolygon} 
                isMossy 
                size="sm" 
                onClick={() => setSelectedStone(stone)}
                className="hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Central Action Area */}
      <div className="fixed bottom-0 left-0 right-0 top-0 pointer-events-none flex flex-col items-center justify-end z-10 pb-12">
        {/* If selector is NOT open AND no stone is selected, show the dashed empty stone */}
        {!isSelectorOpen && !selectedStone && (
            <div className="pointer-events-auto flex flex-col items-center gap-6 bg-gradient-to-t from-concrete via-concrete to-transparent pt-32 w-full pb-8">
                 <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, rotate: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSelectorOpen(true)}
                    className="w-48 h-32 border-4 border-dashed border-ink/20 rounded-[40%_60%_50%_50%/50%_40%_60%_50%] flex items-center justify-center hover:border-ink/40 transition-colors bg-concrete/50 shadow-sm backdrop-blur-sm"
                 >
                     <span className="text-2xl text-ink/20">+</span>
                 </motion.button>
                 <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-ink/60 font-serif tracking-widest text-sm mb-8"
                 >
                     把心事，放在这里。
                 </motion.p>
            </div>
        )}
      </div>

      {/* Mood Selector Overlay */}
      <AnimatePresence>
        {isSelectorOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-concrete/80 backdrop-blur-sm">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-[#E8E8E8] p-8 rounded-3xl shadow-2xl w-80 max-w-sm border border-white/40"
              >
                <h3 className="text-center text-ink/70 mb-8 font-serif text-lg">此刻内心的天气？</h3>
                <div className="flex justify-between px-2 mb-4">
                  {weatherOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => onStart(option.type)}
                      className="flex flex-col items-center gap-3 text-ink/40 hover:text-moss transition-colors group"
                    >
                      <div className="p-3 rounded-full bg-white/50 group-hover:bg-white transition-colors shadow-sm">
                          <option.icon size={24} />
                      </div>
                      <span className="text-xs font-serif">{option.label}</span>
                    </button>
                  ))}
                </div>
                <button 
                    onClick={() => setIsSelectorOpen(false)}
                    className="w-full mt-8 text-xs text-ink/30 tracking-widest hover:text-ink py-2"
                >
                    取消
                </button>
              </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Stone Inspection Modal */}
      <AnimatePresence>
        {selectedStone && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-concrete/80 backdrop-blur-sm" onClick={() => setSelectedStone(null)}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F0F0F0] p-8 rounded-2xl shadow-2xl w-80 max-w-sm border border-white/40 relative text-center m-4"
              >
                 <button 
                    onClick={() => setSelectedStone(null)}
                    className="absolute top-4 right-4 text-ink/30 hover:text-ink transition-colors"
                 >
                    <X size={20} /> 
                 </button>
                 
                 <div className="mt-4 mb-8">
                    {/* Date */}
                    <p className="text-xs text-ink/40 font-serif tracking-[0.2em] uppercase mb-4">
                        {formatDate(selectedStone.timestamp)}
                    </p>
                    
                    {/* Divider */}
                    <div className="w-8 h-1 bg-moss/20 mx-auto mb-8 rounded-full"></div>
                    
                    {/* Wisdom / Insight */}
                    <p className="font-serif text-xl text-ink leading-loose">
                        “{selectedStone.insight}”
                    </p>
                 </div>
                 
                 {/* Micro-copy */}
                 <div className="pt-6 border-t border-ink/5">
                    <p className="text-xs text-moss opacity-60 font-serif tracking-widest">
                        记忆已模糊，但智慧留存。
                    </p>
                 </div>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};