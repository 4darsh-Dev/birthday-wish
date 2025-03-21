import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import Header from '../components/Header';

const TimelinePage = () => {
  // Timeline events data
  const timelineEvents = [
    // ... (your existing timelineEvents array)
  ];

  // Ref for the Golden Snitch animation
  const snitchRef = useRef(null);

  // Set up the floating Snitch animation
  useEffect(() => {
    const snitch = snitchRef.current;

    if (snitch) {
      // Create a random path for the Snitch to follow
      const randomX = () => Math.random() * 100 - 50;
      const randomY = () => Math.random() * 60 - 30;

      // Create a GSAP timeline for the Snitch animation
      const snitchTimeline = gsap.timeline({ repeat: -1 });

      snitchTimeline.to(snitch, {
        x: randomX(),
        y: randomY(),
        duration: 2,
        ease: "power1.inOut"
      });

      snitchTimeline.to(snitch, {
        x: randomX(),
        y: randomY(),
        duration: 1.5,
        ease: "power2.inOut"
      });

      snitchTimeline.to(snitch, {
        x: randomX(),
        y: randomY(),
        duration: 2.5,
        ease: "power1.inOut"
      });

      snitchTimeline.to(snitch, {
        x: randomX(),
        y: randomY(),
        duration: 1.8,
        ease: "power3.inOut"
      });

      return () => {
        snitchTimeline.kill();
      };
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  // Timeline item component with animation
  const TimelineItem = ({ event, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, amount: 0.3 });

    // Different animation based on even/odd index
    const isEven = index % 2 === 0;

    const itemVariants = {
      hidden: {
        opacity: 0,
        x: isEven ? -50 : 50
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.1
        }
      }
    };

    return (
      <motion.div
        ref={itemRef}
        className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12`}
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Year bubble */}
        <div className="flex-none">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-400 flex items-center justify-center shadow-lg">
            <motion.div
              className="text-white font-magical text-xl"
              animate={{
                textShadow: [
                  "0 0 3px rgba(255,255,255,0.5)",
                  "0 0 7px rgba(255,255,255,0.8)",
                  "0 0 3px rgba(255,255,255,0.5)"
                ],
                transition: { repeat: Infinity, duration: 1.5 }
              }}
            >
              {event.year}
            </motion.div>
          </div>
        </div>

        {/* Timeline content */}
        <div className={`flex-1 ${isEven ? 'ml-8' : 'mr-8'}`}>
          <motion.div
            className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg shadow-lg border border-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-magical text-amber-400 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-200">{event.description}</p>
            <div className="mt-4 text-3xl">{event.icon}</div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <Header />
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl font-magical text-center text-amber-400 mb-12">
          Angel's Magical Timeline
        </h1>
        <div className="relative">
          {/* Golden Snitch */}
          <motion.div
            ref={snitchRef}
            className="absolute top-0 left-1/2 w-12 h-12 bg-amber-400 rounded-full shadow-lg flex items-center justify-center text-xl"
            whileHover={{ scale: 1.2 }}
          >
            🏆
          </motion.div>

          {/* Timeline items */}
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TimelinePage;