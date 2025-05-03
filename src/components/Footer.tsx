import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-rock-black border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-6 md:mb-0"
          >
            <Camera className="w-6 h-6 text-rock-gold mr-2" />
            <span className="text-xl font-rockSalt text-rock-gold">
              Johell Kodac
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-400 text-sm mb-2">
              &copy; {new Date().getFullYear()} Johell Kodac - Tous droits réservés
            </p>
            <p className="text-gray-500 text-xs flex items-center justify-center md:justify-end">
              Créé avec <Heart className="w-3 h-3 text-rock-red mx-1" /> pour la musique et la photographie
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;