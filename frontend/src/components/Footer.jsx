import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } }
  };

  return (
    <motion.footer 
      variants={footerVariants}
      initial="initial"
      animate="animate"
      className="py-4 text-center relative z-10"
    >
      <div className="container mx-auto px-4">
        <p className="text-purple-300 text-sm">
          Made with 💖 for Angel's birthday
          <span className="mx-2">•</span>
          <span className="text-yellow-300">{new Date().getFullYear()}</span>
        </p>
        <div className="mt-2">
          <p className="text-purple-400 text-xs">
            "Happiness can be found even in the darkest of times, if one only remembers to turn on the light."
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;