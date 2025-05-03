import React from 'react';
import { motion } from 'framer-motion';
import { Album } from '../../types';
import { Camera } from 'lucide-react';

interface AlbumGridProps {
  albums: Album[];
  onSelectAlbum: (album: Album) => void;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onSelectAlbum }) => {
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
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      } 
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {albums.map(album => (
        <motion.div
          key={album.id}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative group cursor-pointer"
          onClick={() => onSelectAlbum(album)}
        >
          <div className="absolute -inset-0.5 bg-rock-gold opacity-0 group-hover:opacity-50 rounded-lg blur transition duration-300"></div>
          <div className="relative bg-rock-dark rounded-lg overflow-hidden border border-gray-800 group-hover:border-rock-gold transition-all duration-300">
            {album.coverImage ? (
              <div className="aspect-w-4 aspect-h-3 w-full">
                <img
                  src={album.coverImage}
                  alt={album.name}
                  className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rock-black to-transparent opacity-70"></div>
              </div>
            ) : (
              <div className="w-full h-64 bg-rock-dark flex items-center justify-center">
                <Camera className="w-16 h-16 text-rock-gold opacity-70" />
              </div>
            )}
            
            <div className="p-4 relative">
              <h3 className="text-xl font-bold text-rock-gold mb-1">{album.name}</h3>
              {album.description && (
                <p className="text-gray-300 text-sm mb-2">{album.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">
                  {new Date(album.date).toLocaleDateString('fr-FR', { 
                    year: 'numeric',
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="bg-rock-dark px-2 py-1 rounded text-rock-gold text-sm font-medium border border-rock-gold">
                  {album.photoCount} photos
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AlbumGrid;