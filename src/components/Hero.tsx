
import React from 'react';
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

  return (
    <div className="relative w-full h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/attached_assets/WEBAPP_HEADER_HERO.png')",
          height: '100vh',
          width: '100%'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl font-cinzel text-rock-gold mb-12"
          >
            <span>{text}</span>
            <Cursor cursorColor="#FFD84A" />
          </motion.h2>

          <motion.div>
            <a 
              href="#albums" 
              className="rock-button inline-block text-xl"
            >
              Découvrir les Albums
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
