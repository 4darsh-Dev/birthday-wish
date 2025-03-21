// src/pages/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Header from '../components/Header';
import HousesBanner from '../components/HousesBanner';
import FloatingCandles from '../components/FloatingCandles';
import Footer from '../components/Footer';

const HomePage = () => {
  const titleRef = useRef(null);
  
  // GSAP animation for the title
  useEffect(() => {
    const titleElement = titleRef.current;
    
    gsap.fromTo(
      titleElement,
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.5)" 
      }
    );
    
    // Magic sparkle effect around the title
    const sparkleTimeline = gsap.timeline({ repeat: -1 });
    sparkleTimeline.to(titleElement, {
      textShadow: "0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4)",
      duration: 1.5,
      ease: "sine.inOut"
    });
    sparkleTimeline.to(titleElement, {
      textShadow: "0 0 5px rgba(255,215,0,0.5), 0 0 10px rgba(255,215,0,0.3)",
      duration: 1.5,
      ease: "sine.inOut"
    });
    
    return () => {
      sparkleTimeline.kill();
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.2,
        duration: 0.7, 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }),
    hover: { 
      y: -10,
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <>

    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 text-white pb-16"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      
      {/* Floating candles in the background */}
      <FloatingCandles count={15} />
      
      {/* Main content */}
      <div className="container mx-auto px-4 pt-16">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-magical text-center text-amber-400 mt-6 mb-12"
        >
          Welcome to Angel's Magical Birthday
        </h1>
        
        {/* Hogwarts houses banner */}
        <HousesBanner />
        
        {/* Navigation cards to different sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <motion.div 
            className="bg-blue-800 bg-opacity-60 rounded-xl overflow-hidden shadow-lg border border-blue-600"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={0}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-amber-300">Gallery of Memories</h2>
              <p className="text-blue-100 mb-5">Explore cherished moments captured through the years.</p>
              <Link to="/gallery" className="inline-block px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-full font-bold transition-colors duration-300">
                View Gallery
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-purple-800 bg-opacity-60 rounded-xl overflow-hidden shadow-lg border border-purple-600"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={1}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-amber-300">Birthday Wishes</h2>
              <p className="text-purple-100 mb-5">Send your magical birthday wishes to Angel.</p>
              <Link to="/birthday-wish" className="inline-block px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-full font-bold transition-colors duration-300">
                Send Wishes
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-indigo-800 bg-opacity-60 rounded-xl overflow-hidden shadow-lg border border-indigo-600"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={2}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-amber-300">Magical Timeline</h2>
              <p className="text-indigo-100 mb-5">Journey through Angel's life adventures.</p>
              <Link to="/timeline" className="inline-block px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-full font-bold transition-colors duration-300">
                View Timeline
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Special birthday message */}
        <motion.div 
          className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-amber-900/40 to-amber-700/40 p-8 rounded-xl border border-amber-500/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { delay: 1, duration: 0.8 } 
          }}
        >
          <h2 className="text-3xl font-magical text-amber-300 mb-4 text-center">Happy Birthday, Angel!</h2>
          <p className="text-amber-100 text-lg text-center italic">
            "Happiness can be found even in the darkest of times, if one only remembers to turn on the light."
          </p>
          <p className="text-right mt-2 text-amber-300 font-magical">- Albus Dumbledore</p>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
   
    </>
  );
};

export default HomePage;