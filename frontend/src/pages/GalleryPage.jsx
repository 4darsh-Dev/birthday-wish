import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Img1 from "../assets/image-4.webp";
import Img2 from "../assets/image-5.webp";
import Img3 from "../assets/image-6.webp";
import Img4 from "../assets/image-8.webp";
import Img5 from "../assets/image-9.webp";
import Img6 from "../assets/image-10.webp";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Mock data for images - in a real app, these would be paths to actual images
  const galleryImages = [
    {
      id: 1,
      src: Img1,
      alt: "Angel at Hogwarts Great Hall",
      caption: "First day at Hogwarts, 2020"
    },
    {
      id: 2,
      src: Img2,
      alt: "Angel casting a Patronus spell",
      caption: "Learning the Patronus charm"
    },
    {
      id: 3,
      src: Img3,
      alt: "Angel's magical birthday celebration",
      caption: "Last year's magical birthday party"
    },
    {
      id: 4,
      src: Img4,
      alt: "Angel brewing potions",
      caption: "Advanced Potions class"
    },
    {
      id: 5,
      src: Img5,
      alt: "Angel flying on a broomstick",
      caption: "First Quidditch match of the season"
    },
    {
      id: 6,
      src: Img6,
      alt: "Angel with magical creatures",
      caption: "Care of Magical Creatures lesson"
    },
    {
      id: 7,
      src: "/api/placeholder/400/300",
      alt: "Angel at Yule Ball",
      caption: "The enchanted Yule Ball"
    },
    {
      id: 8,
      src: "/api/placeholder/400/300",
      alt: "Angel in Diagon Alley",
      caption: "Shopping for spell books in Diagon Alley"
    },
    {
      id: 9,
      src: "../assets/image-9.webp",
      alt: "Angel with a magic wand",
      caption: "Getting the perfect wand at Ollivanders"
    },
   
  ];
  
  // Animation variants for gallery items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      y: -5,
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      transition: { duration: 0.3 }
    }
  };
  
  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  // Open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl font-magical text-center text-amber-400 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Angel's Magical Memories
        </motion.h1>
        
        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className="bg-purple-800/40 p-3 rounded-xl overflow-hidden cursor-pointer border border-purple-700/50 backdrop-blur-sm"
              variants={itemVariants}
              whileHover="hover"
              onClick={() => openModal(image)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <motion.img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="p-4 text-white font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className="max-w-4xl w-full bg-gradient-to-br from-purple-900 to-blue-900 p-4 rounded-xl relative overflow-hidden"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button 
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                  onClick={closeModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Image */}
                <div className="w-full rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt}
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                {/* Caption */}
                <div className="text-center p-4 bg-blue-900/50 rounded-lg">
                  <h3 className="text-xl font-magical text-amber-400 mb-2">{selectedImage.alt}</h3>
                  <p className="text-white">{selectedImage.caption}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;