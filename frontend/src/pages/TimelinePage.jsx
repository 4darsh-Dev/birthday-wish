import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// Importing custom components
import MagicWand from '../components/MagicWand';
import HogwartsLetter from '../components/HogwartsLetter';

const TimelinePage = () => {
  const navigate = useNavigate();
  const [showMagicLetter, setShowMagicLetter] = useState(true);
  const timelineContainerRef = useRef(null);
  
  // Timeline events data
  const timelineEvents = [
    {
      id: 1,
      year: "2005",
      title: "A Magical Birth",
      description: "Muskan was born on a night when shooting stars were seen all over the country, much like the night Harry Potter was delivered to Privet Drive.",
      icon: "✨",
      color: "from-purple-900 to-indigo-900",
      iconBg: "bg-purple-700"
    },
    {
      id: 2,
      year: "2011",
      title: "First Signs of Magic",
      description: "At age 6, strange events began to happen around Muskan. Books would float off shelves when she was excited, and lights would flicker when she was upset.",
      icon: "📚",
      color: "from-blue-900 to-indigo-900",
      iconBg: "bg-blue-700"
    },
    {
      id: 3,
      year: "2016",
      title: "Discovery of Harry Potter",
      description: "Muskan discovered the magical world of Harry Potter books and became entranced with the wizarding world, reading all seven books in just three months!",
      icon: "⚡",
      color: "from-emerald-900 to-teal-900",
      iconBg: "bg-emerald-700"
    },
    {
      id: 4,
      year: "2018",
      title: "Artistic Talents Emerge",
      description: "Muskan's artistic talents began to shine as she created amazing Harry Potter-inspired artwork that captured the magic of the series.",
      icon: "🎨",
      color: "from-amber-900 to-yellow-900",
      iconBg: "bg-amber-700"
    },
    {
      id: 5,
      year: "2020",
      title: "First Wizard Convention",
      description: "Muskan attended her first Harry Potter convention dressed as Hermione Granger, even winning the costume contest with her perfect spell-casting pose!",
      icon: "🧙‍♀️",
      color: "from-rose-900 to-pink-900",
      iconBg: "bg-rose-700"
    },
    {
      id: 6,
      year: "2022",
      title: "Trip to The Wizarding World",
      description: "A dream come true as Muskan visited The Wizarding World of Harry Potter, where she drank Butterbeer and got her very own interactive wand.",
      icon: "🏰",
      color: "from-cyan-900 to-sky-900",
      iconBg: "bg-cyan-700"
    },
    {
      id: 7,
      year: "2024",
      title: "Creating Magic",
      description: "Muskan began creating her own magical stories and artwork inspired by the world of Harry Potter, sharing them with friends and online communities.",
      icon: "✍️",
      color: "from-violet-900 to-fuchsia-900",
      iconBg: "bg-violet-700"
    },
    {
      id: 8,
      year: "2025",
      title: "Magical Birthday",
      description: "Today we celebrate Muskan's special day with a Harry Potter themed party that brings together all her friends from the wizarding community.",
      icon: "🎂",
      color: "from-red-900 to-rose-900",
      iconBg: "bg-red-700"
    }
  ];

  // Refs for interactive elements
  const snitchRef = useRef(null);
  const timelinePathRef = useRef(null);
  const wandRef = useRef(null);
  const magicParticlesRef = useRef(null);

  // Set up floating background elements
  useEffect(() => {
    // Create floating magical elements in the background
    const createFloatingElements = () => {
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden';
      document.body.appendChild(container);

      // Create magical floating elements (stars, feathers, potion bubbles)
      const elements = ['⚡', '✨', '🪶', '🔮', '📜'];
      const numElements = 30;

      for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.className = 'absolute text-lg opacity-40 pointer-events-none';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        
        // Random starting position
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        
        container.appendChild(element);

        // Animate each element with GSAP
        gsap.to(element, {
          y: `-=${50 + Math.random() * 100}`,
          x: `+=${-25 + Math.random() * 50}`,
          rotation: -10 + Math.random() * 20,
          opacity: 0,
          duration: 10 + Math.random() * 20,
          repeat: -1,
          ease: "power1.inOut",
          delay: Math.random() * 10
        });
      }

      return () => {
        document.body.removeChild(container);
      };
    };

    const cleanupFloating = createFloatingElements();

    return () => {
      cleanupFloating();
    };
  }, []);

  // Set up the Golden Snitch animation
  useEffect(() => {
    const snitch = snitchRef.current;

    if (snitch) {
      const snitchTimeline = gsap.timeline({ repeat: -1 });
      
      // Add wing fluttering animation
      const leftWing = document.createElement('div');
      leftWing.className = 'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-6 h-8 bg-amber-200 rounded-l-full';
      
      const rightWing = document.createElement('div');
      rightWing.className = 'absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-6 h-8 bg-amber-200 rounded-r-full';
      
      snitch.appendChild(leftWing);
      snitch.appendChild(rightWing);
      
      // Wing fluttering animation
      gsap.to([leftWing, rightWing], {
        scaleY: 0.7,
        duration: 0.1,
        repeat: -1,
        yoyo: true
      });

      // Create a more complex path for the Snitch
      const snitchPath = (progress) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Parametric equation for a figure-8 like path
        const x = width * 0.4 * Math.sin(progress * Math.PI * 4);
        const y = height * 0.2 * Math.sin(progress * Math.PI * 2);
        
        return { x, y };
      };
      
      // Animate along the path
      gsap.to(snitch, {
        duration: 15,
        repeat: -1,
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          const pos = snitchPath(progress);
          gsap.set(snitch, { x: pos.x, y: pos.y });
        }
      });

      // Make it shimmer
      gsap.to(snitch, {
        boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.7)',
        repeat: -1,
        yoyo: true,
        duration: 1.5
      });

      // Add interactive behavior - clicking the snitch reveals a surprise
      snitch.addEventListener('click', () => {
        setShowMagicLetter(true);
        gsap.to(snitch, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Create burst of golden particles
            createParticleBurst(snitch.getBoundingClientRect());
          }
        });
      });

      return () => {
        snitch.removeEventListener('click', () => {});
      };
    }
  }, []);

  // Create particle burst effect when snitch is caught
  const createParticleBurst = (position) => {
    const container = magicParticlesRef.current;
    if (!container) return;

    // Clear previous particles
    container.innerHTML = '';
    
    // Create particles
    const numParticles = 50;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-amber-400';
      
      // Random size
      const size = 3 + Math.random() * 8;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Position at burst center
      particle.style.left = `${position.left + position.width/2}px`;
      particle.style.top = `${position.top + position.height/2}px`;
      
      container.appendChild(particle);
      
      // Animate particle outward
      gsap.to(particle, {
        x: -100 + Math.random() * 200,
        y: -100 + Math.random() * 200,
        opacity: 0,
        duration: 1 + Math.random(),
        ease: "power2.out"
      });
    }
  };

  // Create animated path connecting timeline events
  useEffect(() => {
    const timelinePath = timelinePathRef.current;
    if (!timelinePath || !timelineContainerRef.current) return;

    // Draw path linking timeline events
    const drawPath = () => {
      const yearBubbles = timelineContainerRef.current.querySelectorAll('.year-bubble');
      if (yearBubbles.length < 2) return;

      const pathPoints = [];
      yearBubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const containerRect = timelineContainerRef.current.getBoundingClientRect();
        
        pathPoints.push({
          x: rect.left - containerRect.left + rect.width/2,
          y: rect.top - containerRect.top + rect.height/2
        });
      });

      // Create SVG path
      let pathData = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
      for (let i = 1; i < pathPoints.length; i++) {
        const cp1x = pathPoints[i-1].x + (pathPoints[i].x - pathPoints[i-1].x) * 0.5;
        const cp1y = pathPoints[i-1].y;
        const cp2x = pathPoints[i-1].x + (pathPoints[i].x - pathPoints[i-1].x) * 0.5;
        const cp2y = pathPoints[i].y;
        
        pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pathPoints[i].x} ${pathPoints[i].y}`;
      }

      timelinePath.setAttribute('d', pathData);
      
      // Animate the path drawing
      const pathLength = timelinePath.getTotalLength();
      timelinePath.style.strokeDasharray = pathLength;
      timelinePath.style.strokeDashoffset = pathLength;
      
      gsap.to(timelinePath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out"
      });
    };

    // Draw the path after a delay to allow elements to be positioned
    setTimeout(drawPath, 500);
    
    // Redraw on window resize
    window.addEventListener('resize', drawPath);
    
    return () => {
      window.removeEventListener('resize', drawPath);
    };
  }, []);

  // Wand following cursor effect
  useEffect(() => {
    const wand = wandRef.current;
    if (!wand) return;

    const updateWandPosition = (e) => {
      const wandRect = wand.getBoundingClientRect();
      const x = e.clientX - wandRect.width / 2;
      const y = e.clientY - wandRect.height / 2;
      
      // Calculate angle to point wand tip toward cursor
      const angle = Math.atan2(y - (window.innerHeight - 100), x - (window.innerWidth - 100)) * (180 / Math.PI);
      
      gsap.to(wand, {
        x: x,
        y: y,
        rotation: angle + 45, // Adjust angle offset
        duration: 0.1
      });
    };

    // Make wand follow cursor with slight delay for magic effect
    document.addEventListener('mousemove', updateWandPosition);
    
    return () => {
      document.removeEventListener('mousemove', updateWandPosition);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  // Timeline item component with enhanced animation
  const TimelineItem = ({ event, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, amount: 0.3 });
    const contentRef = useRef(null);
    
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

    // Magic spell effect when item comes into view
    useEffect(() => {
      if (isInView && contentRef.current) {
        // Create sparkling effect
        const createSparkles = () => {
          const content = contentRef.current;
          const contentRect = content.getBoundingClientRect();
          const sparkleCount = 10;
          
          for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.className = 'absolute text-amber-400 text-sm pointer-events-none';
            sparkle.style.left = `${Math.random() * contentRect.width}px`;
            sparkle.style.top = `${Math.random() * contentRect.height}px`;
            sparkle.style.opacity = '0';
            content.appendChild(sparkle);
            
            gsap.to(sparkle, {
              opacity: 1,
              duration: 0.3,
              delay: i * 0.1,
              onComplete: () => {
                gsap.to(sparkle, {
                  opacity: 0,
                  y: -20,
                  duration: 0.5,
                  onComplete: () => {
                    content.removeChild(sparkle);
                  }
                });
              }
            });
          }
        };
        
        createSparkles();
      }
    }, [isInView]);

    return (
      <motion.div
        ref={itemRef}
        className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12 relative`}
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Year bubble */}
        <div className="flex-none relative">
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-400 flex items-center justify-center shadow-lg year-bubble"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.7)"
            }}
          >
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
          </motion.div>
        </div>

        {/* Timeline content */}
        <div className={`flex-1 ${isEven ? 'ml-8' : 'mr-8'} relative`}>
          <motion.div
            ref={contentRef}
            className={`p-6 bg-gradient-to-br ${event.color} rounded-lg shadow-lg border border-purple-400 relative overflow-hidden`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 20px rgba(124, 58, 237, 0.5)"
            }}
          >
            {/* Magical accent corner */}
            <div className="absolute -top-2 -right-2 w-12 h-12 rotate-12">
              <div className={`w-full h-full ${event.iconBg} rounded-bl-xl`}></div>
            </div>
            
            <h3 className="text-2xl font-magical text-amber-400 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-200">{event.description}</p>
            <div className="mt-4 text-3xl">{event.icon}</div>
            
            {/* Interactive element - magical glow on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 pointer-events-none rounded-lg"
              whileHover={{ opacity: 0.15 }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Handle closing the Hogwarts letter
  const handleCloseHogwartsLetter = () => {
    setShowMagicLetter(false);
    
    // Add some magical particles when closing
    const container = magicParticlesRef.current;
    if (container) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-purple-400';
        
        const size = 3 + Math.random() * 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        container.appendChild(particle);
        
        gsap.to(particle, {
          x: -200 + Math.random() * 400,
          y: -200 + Math.random() * 400,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            container.removeChild(particle);
          }
        });
      }
    }
  };

  // Handle navigation to gallery
  const navigateToGallery = () => {
    // Add transition effect
    gsap.to(".page-container", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: () => {
        navigate('/gallery');
      }
    });
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-black py-12 page-container relative overflow-hidden">
      
      
      {/* SVG filter for glow effects */}
      <svg className="absolute" width="0" height="0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feFlood floodColor="rgba(255,215,0,0.5)" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Magical particles container */}
      <div ref={magicParticlesRef} className="fixed inset-0 pointer-events-none z-20"></div>
      
      {/* Wand cursor follower */}
      <motion.div 
        ref={wandRef}
        className="fixed w-20 h-4 pointer-events-none z-30 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <img src="/images/wand.png" alt="Magic Wand" className="w-full h-full object-contain" />
      </motion.div>
      
      {/* Golden Snitch */}
      <motion.div
        ref={snitchRef}
        className="absolute top-32 left-1/2 w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-lg flex items-center justify-center text-xl filter z-10 cursor-pointer"
        style={{ filter: 'url(#glow)' }}
        whileHover={{ scale: 1.2 }}
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        🏆
      </motion.div>

      <motion.div
        className="container mx-auto px-4 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={timelineContainerRef}
      >
        {/* Animated title */}
        <motion.h1 
          className="text-6xl font-magical text-center text-amber-400 mb-16"
          variants={titleVariants}
        >
          <span className="inline-block">Muskan's </span>
          <span className="inline-block ml-2">Magical </span>
          <span className="inline-block ml-2">Timeline</span>
        </motion.h1>

        {/* SVG path connecting timeline */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <path 
            ref={timelinePathRef}
            stroke="rgba(217, 119, 6, 0.6)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
            filter="url(#glow)"
          />
        </svg>

        <div className="relative">
          {/* Timeline items */}
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Navigation button to Gallery */}
        <motion.div    className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <button
            onClick={navigateToGallery}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-magical rounded-full hover:shadow-amber-500/50 hover:shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            See Muskan's Magical Gallery →
          </button>
        
        </motion.div>
      
      </motion.div>

      {/* Hogwarts Letter Modal */}
      <AnimatePresence>
        {showMagicLetter && (
          <HogwartsLetter onClose={handleCloseHogwartsLetter} />
        )}
      </AnimatePresence>
      {/* <HogwartsLetter onClose={handleCloseHogwartsLetter} /> */}
    </div>
    <Footer />
    </>
  );
};

export default TimelinePage;