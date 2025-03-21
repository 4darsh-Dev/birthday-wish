import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const StarryBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create stars
    const stars = [];
    const shootingStars = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 3000);
    
    for(let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        brightness: Math.random(),
        twinkleFactor: Math.random() * 0.1
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
      gradient.addColorStop(1, 'rgba(88, 28, 135, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        star.brightness += star.twinkleFactor;
        
        if(star.brightness >= 1 || star.brightness <= 0.3) {
          star.twinkleFactor = -star.twinkleFactor;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
      });
      
      // Occasionally create a shooting star
      if(Math.random() < 0.01 && shootingStars.length < 3) {
        const startX = Math.random() * canvas.width;
        shootingStars.push({
          x: startX,
          y: 0,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 15 + 10,
          angle: Math.PI / 4 + (Math.random() * Math.PI / 4)
        });
      }
      
      // Draw and update shooting stars
      ctx.lineCap = 'round';
      
      for(let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;
        
        ctx.lineTo(tailX, tailY);
        
        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Remove if off screen
        if(star.y > canvas.height || star.x < 0 || star.x > canvas.width) {
          shootingStars.splice(i, 1);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default StarryBackground;