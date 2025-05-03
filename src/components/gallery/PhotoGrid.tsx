import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { Photo } from '../../types';
import PhotoModal from './PhotoModal';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const breakpointColumns = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      } 
    }
  };
  
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {photos.map(photo => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className="mb-4"
            >
              <div 
                className="photo-item cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.thumbnailUrl || photo.url}
                  alt={photo.name}
                  className="w-full h-auto rounded-md"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
      
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            photos={photos}
            onNavigate={setSelectedPhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGrid;