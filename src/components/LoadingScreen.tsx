import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-rock-black z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Camera 
          className="w-24 h-24 text-rock-gold animate-glow-pulse" 
          strokeWidth={1.5} 
        />
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-5xl text-rock-gold font-rockSalt mb-4"
      >
        Johell Kodac
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-xl text-white font-concert mb-8"
      >
        Photographe de Scène
      </motion.p>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ delay: 0.7, duration: 1.5 }}
        className="h-1 bg-rock-gold rounded-full"
      />
    </div>
  );
};

export default LoadingScreen;