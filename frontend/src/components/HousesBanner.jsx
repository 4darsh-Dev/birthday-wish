import React from 'react';
import { motion } from 'framer-motion';

const HousesBanner = () => {
  const houses = [
    { 
      name: 'Gryffindor', 
      colors: 'from-red-800 to-yellow-700',
      emblem: '🦁',
      trait: 'Courage'
    },
    { 
      name: 'Hufflepuff', 
      colors: 'from-yellow-600 to-black',
      emblem: '🦡',
      trait: 'Loyalty'
    },
    { 
      name: 'Ravenclaw', 
      colors: 'from-blue-800 to-gray-500',
      emblem: '🦅',
      trait: 'Wisdom'
    },
    { 
      name: 'Slytherin', 
      colors: 'from-green-800 to-gray-600',
      emblem: '🐍',
      trait: 'Ambition'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {houses.map((house) => (
        <motion.div
          key={house.name}
          className={`bg-gradient-to-br ${house.colors} p-6 rounded-xl text-center shadow-lg border border-white/20`}
          variants={itemVariants}
          whileHover="hover"
        >
          <div className="text-4xl mb-2">{house.emblem}</div>
          <h3 className="text-2xl font-magical text-white">{house.name}</h3>
          <p className="text-white/80 italic">{house.trait}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HousesBanner;