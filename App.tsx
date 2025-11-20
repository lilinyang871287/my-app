import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScreenState, StoneData, Weather } from './types';
import { generateOrganicShape } from './utils';
import { generateInsight } from './services/geminiService';

// Components
import { Courtyard } from './components/screens/Courtyard';
import { Etching } from './components/screens/Etching';
import { Overgrowth } from './components/screens/Overgrowth';
import { Echo } from './components/screens/Echo';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.COURTYARD);
  const [stones, setStones] = useState<StoneData[]>([]);
  const [currentShape, setCurrentShape] = useState<string>(generateOrganicShape());
  const [currentWorry, setCurrentWorry] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<Weather>(Weather.SUN);
  const [currentInsight, setCurrentInsight] = useState<string>('');

  // Transition: Courtyard -> Etching
  const handleStart = (weather: Weather) => {
    setCurrentWeather(weather);
    setCurrentShape(generateOrganicShape()); // New stone shape for this session
    setScreen(ScreenState.ETCHING);
  };

  // Transition: Etching -> Overgrowth
  const handleLayDown = useCallback(async (text: string) => {
    setCurrentWorry(text);
    setScreen(ScreenState.OVERGROWTH);
    
    // Trigger mock AI processing
    try {
      const insight = await generateInsight(text, currentWeather);
      setCurrentInsight(insight);
    } catch (e) {
      setCurrentInsight("风吹过青苔的声音。");
    }
  }, [currentWeather]);

  // Transition: Overgrowth -> Echo
  const handleGrowthComplete = () => {
    setScreen(ScreenState.ECHO);
  };

  // Transition: Echo -> Courtyard
  const handleReturn = () => {
    // 1. Generate Stable Randomness NOW (Once per stone)
    // This ensures existing stones don't "dance" when a new one is added.
    const newStone: StoneData = {
      id: Date.now().toString(),
      worry: currentWorry,
      insight: currentInsight,
      timestamp: Date.now(),
      weather: currentWeather,
      shapePolygon: currentShape,
      rotation: Math.random() * 30 - 15, // -15 to 15 deg
      offsetY: Math.random() * 40,       // 0 to 40px vertical push
      offsetX: Math.random() * 50 - 25   // -25 to 25px horizontal shift
    };
    
    setStones(prevStones => {
      const updatedStones = [...prevStones];
      
      // 2. Strict Limit Logic (Max 9)
      if (updatedStones.length >= 9) {
        updatedStones.shift(); // Remove the oldest stone (first index)
      }
      
      // 3. Add Newest to the End (Sedimentation)
      updatedStones.push(newStone);
      
      return updatedStones;
    });
    
    setScreen(ScreenState.COURTYARD);
    // Reset transient state
    setCurrentWorry('');
    setCurrentInsight('');
  };

  return (
    <main className="w-full h-screen overflow-hidden bg-concrete text-ink font-sans selection:bg-moss selection:text-white">
      <AnimatePresence mode="wait">
        {screen === ScreenState.COURTYARD && (
          <motion.div key="courtyard" className="w-full h-full" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <Courtyard stones={stones} onStart={handleStart} />
          </motion.div>
        )}

        {screen === ScreenState.ETCHING && (
          <motion.div key="etching" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <Etching stoneShape={currentShape} onLayDown={handleLayDown} />
          </motion.div>
        )}

        {screen === ScreenState.OVERGROWTH && (
          <motion.div key="overgrowth" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <Overgrowth worry={currentWorry} stoneShape={currentShape} onGrowthComplete={handleGrowthComplete} />
          </motion.div>
        )}

        {screen === ScreenState.ECHO && (
          <motion.div key="echo" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <Echo insight={currentInsight} stoneShape={currentShape} onReturn={handleReturn} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;