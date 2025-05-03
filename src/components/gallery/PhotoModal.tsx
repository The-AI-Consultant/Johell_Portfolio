import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Photo } from '../../types';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
  photos: Photo[];
  onNavigate: (photo: Photo) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, photos, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    const img = new Image();
    img.src = photo.url;
    img.onload = () => setLoading(false);
    
    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigateToPrev();
      } else if (e.key === 'ArrowRight') {
        navigateToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [photo]);
  
  const currentIndex = photos.findIndex(p => p.id === photo.id);
  
  const navigateToNext = () => {
    if (currentIndex < photos.length - 1) {
      onNavigate(photos[currentIndex + 1]);
    }
  };
  
  const navigateToPrev = () => {
    if (currentIndex > 0) {
      onNavigate(photos[currentIndex - 1]);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-rock-black bg-opacity-90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden bg-transparent"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 p-2 bg-rock-black bg-opacity-70 rounded-full text-white hover:text-rock-gold transition-colors duration-300"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        
        <a
          href={photo.url}
          download={photo.name}
          className="absolute top-4 left-4 z-10 p-2 bg-rock-black bg-opacity-70 rounded-full text-white hover:text-rock-gold transition-colors duration-300"
          onClick={e => e.stopPropagation()}
        >
          <Download className="w-6 h-6" />
        </a>
        
        {currentIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-rock-black bg-opacity-70 rounded-full text-white hover:text-rock-gold transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateToPrev();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {currentIndex < photos.length - 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-rock-black bg-opacity-70 rounded-full text-white hover:text-rock-gold transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateToNext();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        
        <div className="w-full h-full flex items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-rock-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={photo.url}
            alt={photo.name}
            className={`max-w-full max-h-[80vh] object-contain ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-rock-black to-transparent">
          <h3 className="text-lg font-bold text-white">{photo.name}</h3>
          <p className="text-sm text-gray-300">
            {new Date(photo.dateAdded).toLocaleDateString('fr-FR', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoModal;