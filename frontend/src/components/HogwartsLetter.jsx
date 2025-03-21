import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HogwartsLetter = ({ onClose }) => {
  const letterRef = useRef(null);
  const contentRef = useRef(null);
  const sealRef = useRef(null);
  const confettiRef = useRef(null);
  
  // Animation settings
  const dropIn = {
    hidden: {
      y: -200,
      opacity: 0,
      rotate: -5
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 2,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    },
    exit: {
      y: 200,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Seal opening animation
  useEffect(() => {
    const seal = sealRef.current;
    const content = contentRef.current;
    
    if (seal && content) {
      // Initially hide content
      gsap.set(content, { opacity: 0, y: 20 });
      
      // Make seal clickable
      seal.addEventListener('click', openLetter);
      
      // Create floating dust particles
      createDustParticles();
      
      return () => {
        seal.removeEventListener('click', openLetter);
      };
    }
  }, []);
  
  // Function to animate letter opening
  const openLetter = () => {
    const seal = sealRef.current;
    const content = contentRef.current;
    const letter = letterRef.current;
    
    if (!seal || !content || !letter) return;
    
    // Seal breaking animation
    gsap.to(seal, {
      scale: 1.5,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        // Create confetti burst
        createConfettiBurst();
        
        // Expand letter
        gsap.to(letter, {
          height: 'auto',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          duration: 0.8,
          ease: "power2.out"
        });
        
        // Reveal content
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3
        });
      }
    });
  };
  
  // Create magical dust particles floating around the letter
  const createDustParticles = () => {
    const container = document.createElement('div');
    container.className = 'absolute inset-0 pointer-events-none';
    
    // Append to the modal backdrop
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.appendChild(container);
      
      // Create multiple dust particles
      const particleCount = 25;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-amber-100 rounded-full opacity-60';
        
        // Random starting position around the letter
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 100 + Math.random() * 200;
        const angle = Math.random() * Math.PI * 2;
        
        particle.style.left = `${centerX + Math.cos(angle) * radius}px`;
        particle.style.top = `${centerY + Math.sin(angle) * radius}px`;
        
        container.appendChild(particle);
        
        // Animate floating behavior
        gsap.to(particle, {
          x: -30 + Math.random() * 60,
          y: -30 + Math.random() * 60,
          opacity: Math.random() * 0.7 + 0.3,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3
        });
      }
    }
  };
  
  // Create confetti burst when seal is broken
  const createConfettiBurst = () => {
    const confetti = confettiRef.current;
    if (!confetti) return;
    
    // Clear previous confetti
    confetti.innerHTML = '';
    
    // Create confetti pieces
    const colors = ['#FCD34D', '#A78BFA', '#60A5FA', '#F87171', '#34D399'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'absolute';
      
      // Random size and shape
      const size = 5 + Math.random() * 10;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * (0.5 + Math.random() * 1)}px`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      // Starting position - center of seal
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2 - 50; // Adjust for seal position
      
      piece.style.left = `${centerX}px`;
      piece.style.top = `${centerY}px`;
      
      confetti.appendChild(piece);
      
      // Animate outward in burst
      gsap.to(piece, {
        x: -200 + Math.random() * 400,
        y: -150 + Math.random() * 400,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 1 + Math.random() * 1.5,
        onComplete: () => {
          confetti.removeChild(piece);
        }
      });
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      {/* Overlay backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Confetti container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none"></div>
      
      {/* Letter */}
      <motion.div
        ref={letterRef}
        className="relative w-11/12 max-w-lg bg-amber-50 rounded-md p-8 shadow-xl overflow-hidden h-72"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Hogwarts Seal */}
        <motion.div
          ref={sealRef}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-red-800 rounded-full flex items-center justify-center cursor-pointer z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-20 h-20 border-4 border-amber-400 rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-amber-400 font-magical text-xs">CLICK</div>
              <div className="text-amber-400 font-magical text-[10px]">TO OPEN</div>
            </div>
          </div>
        </motion.div>
        
        {/* Letter content */}
        <motion.div
          ref={contentRef}
          className="text-center"
        >
          <h2 className="font-magical text-3xl text-amber-800 mb-4">HOGWARTS SCHOOL</h2>
          <h3 className="font-magical text-xl text-amber-700 mb-6">of WITCHCRAFT and WIZARDRY</h3>
          
          <div className="text-amber-900 mb-6">
            <p className="mb-4">Dear Anjali,</p>
            <p className="mb-4">
              We are pleased to inform you that your magical journey continues to inspire those around you.
              On this special day, we celebrate not only your birthday but the extraordinary magic 
              you bring to the world with your creativity and kindness.
            </p>
            <p>
              May your day be filled with wonder, joy, and all manner of magical surprises!
            </p>
          </div>
          
          <div className="mb-8">
            <div className="text-amber-800 font-magical italic">
              Happy Birthday!
            </div>
          </div>
          
          <motion.button
            className="px-6 py-2 bg-amber-600 text-white rounded-full font-magical"
            whileHover={{ scale: 1.05, backgroundColor: '#B45309' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Continue the Magic
          </motion.button>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-10">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,5 L95,50 L50,95 L5,50 Z" fill="#7C3AED" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,5 L95,50 L50,95 L5,50 Z" fill="#7C3AED" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default HogwartsLetter;