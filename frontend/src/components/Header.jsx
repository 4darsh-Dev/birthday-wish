import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', path: '/home' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Wishes', path: '/wishes' },
    { name: 'Timeline', path: '/timeline' }
  ];
  
  const headerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    }
  };
  
  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    }
  };

  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 border-b border-purple-700 sticky top-0 z-50 shadow-lg"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3">
            <motion.div 
              className="text-amber-400 text-3xl font-magical"
              whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(255,215,0,0.7)" }}
            >
              Angel's Magic
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`text-lg font-medium transition-colors duration-300 ${location.pathname === item.path ? 'text-amber-400' : 'text-white hover:text-amber-300'}`}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                      layoutId="underline"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col space-y-4 py-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    className={`text-lg font-medium px-2 py-2 rounded-lg ${location.pathname === item.path ? 'bg-purple-800 text-amber-400' : 'text-white hover:bg-purple-800/50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;