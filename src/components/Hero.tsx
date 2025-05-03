import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Hero: React.FC = () => {
  const [text] = useTypewriter({
    words: [
      'Photographe de concert',
      'Immortalise vos souvenirs',
      'Capture l\'énergie rock',
      'Artiste de la scène'
    ],
    loop: true,
    delaySpeed: 2000,
  });
  
  const [parallaxY, setParallaxY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setParallaxY(scrollY * 0.4);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: "url('/attached_assets/image_1746274088701.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'calc(100vh - 80px)',
        width: '100%',
        imageRendering: 'crisp-edges',
        transform: 'translateZ(0)',
        willChange: 'transform',
        marginTop: '80px'
      }}
    >
      {/* Content */}
      <div className="container mx-auto px-4 z-30 flex flex-col justify-center h-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-48"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl font-cinzel uppercase tracking-wider text-rock-gold mb-6"
          >
            <span>{text}</span>
            <Cursor cursorColor="#FFD84A" />
          </motion.h2>
          
          <motion.div variants={itemVariants}>
            <a 
              href="#albums" 
              className="rock-button inline-block"
            >
              Découvrir les Albums
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Effets de lumière */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-rock-blue opacity-20 blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-rock-red opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-rock-orange opacity-20 blur-3xl"></div>
    </section>
  );
};

export default Hero;