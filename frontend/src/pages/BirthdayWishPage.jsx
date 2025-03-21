import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { TypeAnimation } from 'react-type-animation';

// Import components
import Header from '../components/Header';
import Footer from '../components/Footer';

const BirthdayWishPage = () => {
  const confettiCanvasRef = useRef(null);
  const [showAdditionalMessage, setShowAdditionalMessage] = useState(false);
  const [activeMessage, setActiveMessage] = useState(0);
  const pageRef = useRef(null);
  
  // Additional birthday messages that will be revealed on interaction
  const additionalMessages = [
    "May your artistic journey continue to bloom with vibrant colors and endless possibilities.",
    "Like Hermione, may your wisdom and determination lead you to great achievements in your career.",
    "As Harry found his path, may you discover new talents and strengths on your journey this year.",
    "The magic isn't just in wands, but in your heart and passion for creating beautiful art."
  ];

  // Sparkle effect - creates magical sparkles around the cursor
  useEffect(() => {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'absolute pointer-events-none';
    document.body.appendChild(sparklesContainer);

    const createSparkle = (x, y) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute w-2 h-2 bg-yellow-300 rounded-full opacity-0';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.boxShadow = '0 0 8px 2px rgba(255, 215, 0, 0.8)';
      sparklesContainer.appendChild(sparkle);
      
      gsap.to(sparkle, {
        opacity: 1,
        duration: 0.2,
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
        scale: gsap.utils.random(0.5, 1.5),
        onComplete: () => {
          gsap.to(sparkle, {
            opacity: 0,
            duration: 0.3,
            delay: gsap.utils.random(0.2, 0.5),
            onComplete: () => {
              sparklesContainer.removeChild(sparkle);
            }
          });
        }
      });
    };

    const handleMouseMove = (e) => {
      if (Math.random() > 0.85) { // Only create sparkle some of the time for performance
        createSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // GSAP animation for the background elements
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    gsap.utils.toArray('.floating-star').forEach((star) => {
      tl.to(star, {
        y: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-10, 10),
        rotate: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
      }, "<");
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(sparklesContainer);
    };
  }, []);

  // Launch confetti when the page loads
  useEffect(() => {
    const launchConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#9c27b0', '#3f51b5', '#e91e63'],
      });
    };

    // Delay confetti for a more dramatic effect after the page loads
    const timer = setTimeout(() => {
      launchConfetti();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to trigger more confetti on button click
  const triggerMoreConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#9c27b0', '#3f51b5', '#e91e63'],
    });
    
    setShowAdditionalMessage(!showAdditionalMessage);
    setActiveMessage((prev) => (prev + 1) % additionalMessages.length);
  };

  // Page animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 1.2,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      ref={pageRef}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden relative"
    >
      <Header />
      
      {/* Magical background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="floating-star absolute w-2 h-2 bg-yellow-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.6)',
            }}
          />
        ))}
        
        {/* Hogwarts castle silhouette in the background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-black opacity-30 castle-silhouette"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-10"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Happy Birthday Angel!
          </motion.h1>
          
          <motion.div 
            className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full mb-10"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mx-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm p-8 rounded-xl border border-purple-500/30 shadow-xl"
        >
          <div className="text-white text-xl leading-relaxed mb-6 h-24">
            <TypeAnimation
              sequence={[
                'Wishing you a magical birthday filled with wonder and joy!',
                2000,
                'May your day be as extraordinary as you are.',
                2000,
                'Like a true Gryffindor, may you face this new year with courage and determination.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
          </div>
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-center my-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerMoreConfetti}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Click for Your Special Wish
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showAdditionalMessage ? "auto" : 0,
              opacity: showAdditionalMessage ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="text-center p-5 rounded-lg bg-purple-900/50 border border-purple-500/30 mb-4">
              <p className="text-white text-lg italic">"{additionalMessages[activeMessage]}"</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Magical icons that reveal messages */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-8 md:space-x-16 mt-16"
        >
          {[
            { icon: "🧙‍♀️", tooltip: "Wisdom" },
            { icon: "✨", tooltip: "Magic" },
            { icon: "🎨", tooltip: "Creativity" },
            { icon: "📚", tooltip: "Knowledge" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setActiveMessage(index);
                setShowAdditionalMessage(true);
                
                // Create a burst of stars around the icon
                const iconEl = document.getElementById(`icon-${index}`);
                if (iconEl) {
                  const rect = iconEl.getBoundingClientRect();
                  const x = rect.left + rect.width / 2;
                  const y = rect.top + rect.height / 2;
                  
                  for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                      confetti({
                        particleCount: 15,
                        startVelocity: 30,
                        spread: 360,
                        origin: {
                          x: x / window.innerWidth,
                          y: y / window.innerHeight
                        },
                        colors: ['#FFD700', '#9c27b0', '#3f51b5'],
                        shapes: ['star'],
                        gravity: 0.5,
                      });
                    }, i * 50);
                  }
                }
              }}
              className="cursor-pointer relative group"
            >
              <div 
                id={`icon-${index}`}
                className="text-4xl bg-indigo-800 bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/30"
              >
                {item.icon}
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm whitespace-nowrap">
                {item.tooltip}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />
      
      <Footer />
    </motion.div>
  );
};

export default BirthdayWishPage;