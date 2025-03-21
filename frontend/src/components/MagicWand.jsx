import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const MagicWand = () => {
  const wandRef = useRef(null);
  const wandTipRef = useRef(null);
  const sparklesRef = useRef(null);
  
  // Set up the wand behavior to follow mouse
  useEffect(() => {
    const wand = wandRef.current;
    const wandTip = wandTipRef.current;
    const sparkles = sparklesRef.current;
    
    if (!wand || !wandTip || !sparkles) return;
    
    // Function to update wand position with cursor
    const updateWandPosition = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate angle for natural wand pointing
      const angle = Math.atan2(mouseY - window.innerHeight, mouseX - window.innerWidth) * (180 / Math.PI);
      
      // Update wand position and rotation
      gsap.to(wand, {
        x: mouseX,
        y: mouseY,
        rotation: angle + 225, // Adjust angle for natural holding position
        duration: 0.1
      });
      
      // If user is clicking, create spell effect
      if (e.buttons === 1) {
        createSpellEffect(wandTip.getBoundingClientRect());
      }
    };
    
    // Create magical spell effect at wand tip
    const createSpellEffect = (tipPosition) => {
      // Create multiple magical particles
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        
        // Randomly choose different magical symbols
        const magicSymbols = ['✨', '⚡', '💫', '⭐', '🌟'];
        particle.textContent = magicSymbols[Math.floor(Math.random() * magicSymbols.length)];
        
        particle.className = 'absolute text-yellow-400 pointer-events-none text-sm';
        particle.style.left = `${tipPosition.left}px`;
        particle.style.top = `${tipPosition.top}px`;
        particle.style.opacity = '0';
        
        sparkles.appendChild(particle);
        
        // Animate particle outward
        gsap.to(particle, {
          x: 20 + Math.random() * 50,
          y: -20 + Math.random() * 40,
          opacity: [0, 1, 0],
          duration: 0.8 + Math.random() * 0.6,
          onComplete: () => {
            sparkles.removeChild(particle);
          }
        });
      }
    };
    
    // Handle mouse movements for wand positioning
    document.addEventListener('mousemove', updateWandPosition);
    
    // Handle mouse down for spell effects
    document.addEventListener('mousedown', (e) => {
      // Get position of wand tip
      const tipPosition = wandTip.getBoundingClientRect();
      createSpellEffect(tipPosition);
      
      // Add visual feedback on click
      gsap.to(wand, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    });
    
    return () => {
      document.removeEventListener('mousemove', updateWandPosition);
      document.removeEventListener('mousedown', () => {});
    };
  }, []);
  
  return (
    <>
      {/* Container for magical particles */}
      <div ref={sparklesRef} className="fixed inset-0 pointer-events-none z-50"></div>
      
      {/* The wand element */}
      <motion.div
        ref={wandRef}
        className="fixed w-24 h-6 pointer-events-none z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative w-full h-full">
          {/* Wand body */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-700 rounded-full transform rotate-45 origin-left"></div>
          
          {/* Wand handle */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full transform rotate-45 origin-left"></div>
          
          {/* Wand tip - used for spell origin */}
          <div 
            ref={wandTipRef}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-amber-300 rounded-full"
          ></div>
          
          {/* Subtle glow effect */}
          <div className="absolute right-0 w-4 h-4 bg-amber-400 rounded-full opacity-30 animate-pulse transform -translate-x-1 -translate-y-1"></div>
        </div>
      </motion.div>
    </>
  );
};

export default MagicWand;