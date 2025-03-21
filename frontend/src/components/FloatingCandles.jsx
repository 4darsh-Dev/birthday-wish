import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingCandles = ({ count = 10 }) => {
  const [candles, setCandles] = useState([]);
  
  useEffect(() => {
    // Create candle elements with random positions
    const newCandles = [];
    
    for (let i = 0; i < count; i++) {
      newCandles.push({
        id: `candle-${i}`,
        left: `${Math.random() * 90 + 5}%`,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 20,
        scale: 0.5 + Math.random() * 0.5
      });
    }
    
    setCandles(newCandles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          className="absolute"
          style={{ left: candle.left }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            y: {
              duration: candle.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: candle.delay
            },
            opacity: {
              duration: candle.duration / 4,
              times: [0, 0.1, 0.9, 1],
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: candle.delay
            }
          }}
        >
          <div className="relative" style={{ transform: `scale(${candle.scale})` }}>
            {/* Candle body */}
            <div className="w-6 h-32 bg-gradient-to-t from-amber-300 to-amber-100 rounded-t-sm rounded-b-md mx-auto"></div>
            
            {/* Candle wick */}
            <div className="w-1 h-4 bg-gray-800 mx-auto -mt-32 rounded-full"></div>
            
            {/* Candle flame */}
            <motion.div
              className="w-6 h-10 mx-auto -mt-3"
              animate={{
                filter: ['blur(2px)', 'blur(3px)', 'blur(2px)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <div className="w-4 h-8 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full mx-auto"></div>
              <div className="w-3 h-6 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full mx-auto -mt-7"></div>
              <div className="w-2 h-3 bg-white rounded-full mx-auto -mt-5"></div>
            </motion.div>
            
            {/* Light glow */}
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full bg-amber-400/30 w-12 h-12 -mt-3 mx-auto"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCandles;