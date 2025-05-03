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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/attached_assets/image_1746274088701.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="container mx-auto px-4 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl font-cinzel uppercase tracking-wider text-rock-gold mb-6"
          >
            <span>{text}</span>
            <Cursor cursorColor="#FFD84A" />
          </motion.h2>

          <motion.div>
            <a 
              href="#albums" 
              className="rock-button inline-block"
            >
              Découvrir les Albums
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-rock-blue opacity-20 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-rock-red opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-rock-orange opacity-20 blur-3xl" />
    </section>
  );
};

export default Hero;