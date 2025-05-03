
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
    <div className="relative w-full h-screen pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/attached_assets/WEBAPP_HEADER_HERO.png')",
          height: 'calc(100vh)',
          width: '100%',
          top: '0'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center z-10">
        <div className="flex-1" /> {/* Spacer */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 space-y-8 mt-60"
        >
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl font-cinzel text-rock-gold typewriter-text"
          >
            <span className="text-glow">{text}</span>
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
        
        <div className="flex-1" /> {/* Spacer */}
      </div>
    </div>
  );
};

export default Hero;
