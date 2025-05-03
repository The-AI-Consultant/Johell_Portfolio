import React from 'react';
import { motion } from 'framer-motion';

const GalleryLoader: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {[1, 2, 3, 4, 5, 6].map(index => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-rock-dark rounded-lg overflow-hidden border border-gray-800"
        >
          <div className="w-full h-64 bg-rock-dark/50 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-1/4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryLoader;