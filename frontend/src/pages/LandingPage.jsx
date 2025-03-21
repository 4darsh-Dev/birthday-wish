


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarryBackground from '../components/StarryBackground';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showEnterButton, setShowEnterButton] = useState(false);

  // Show enter button after a delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnterButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    // Trigger navigation to main page with animation
    navigate('/home');
  };

  return (
    <motion.div 
      className="h-screen w-full relative flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Background stars animation */}
      <StarryBackground />
      
      {/* Central content */}
      <motion.div 
        className="z-10 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-magical text-amber-400 tracking-wider mb-6"
          animate={{ 
            textShadow: [
              "0 0 7px rgba(255,215,0,0.7)",
              "0 0 10px rgba(255,215,0,0.9)",
              "0 0 7px rgba(255,215,0,0.7)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          Angel's Birthday
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white font-serif mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          A Magical Celebration Awaits
        </motion.p>
        
        {showEnterButton && (
          <motion.button
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold tracking-wide transform transition-all duration-300 hover:scale-105 border-2 border-amber-400"
            whileHover={{ 
              boxShadow: "0 0 15px rgba(255,215,0,0.7)",
              y: -5
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 2 
            }}
            onClick={handleEnter}
          >
            Enter the Magic
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
