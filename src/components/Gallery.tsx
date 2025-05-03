import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { Album, Photo } from '../types';
import AlbumGrid from './gallery/AlbumGrid';
import PhotoGrid from './gallery/PhotoGrid';
import GalleryLoader from './gallery/GalleryLoader';

const Gallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, getAccessToken } = useAuth();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Load albums when component mounts
  useEffect(() => {
    const loadAlbums = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessToken();
          
          if (token) {
            const service = await getOneDriveService(token);
            const albumsData = await service.getAlbums();
            
            setAlbums(albumsData);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error loading albums:', error);
          setLoading(false);
        }
      } else {
        // Use sample data when not authenticated
        setAlbums([
          {
            id: '1',
            name: 'Metallica 2024',
            description: 'Concert au Stade de France',
            coverImage: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            date: '2024-04-01',
            photoCount: 24
          },
          {
            id: '2',
            name: 'Iron Maiden',
            description: 'The Future Past Tour',
            coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            date: '2024-03-15',
            photoCount: 32
          },
          {
            id: '3',
            name: 'Hellfest 2023',
            description: 'Festival complet',
            coverImage: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            date: '2023-06-23',
            photoCount: 120
          },
          {
            id: '4',
            name: 'AC/DC',
            description: 'Power Up Tour',
            coverImage: 'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            date: '2023-05-17',
            photoCount: 45
          },
          {
            id: '5',
            name: 'Rammstein',
            description: 'Stade de France',
            coverImage: 'https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            date: '2023-04-09',
            photoCount: 56
          },
          {
            id: '6',
            name: 'Tool Live',
            description: 'Bercy Arena',
            coverImage: 'https://images.pexels.com/photos/1494062/pexels-photo-1494062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            date: '2023-02-28',
            photoCount: 38
          },
        ]);
        
        setLoading(false);
      }
    };
    
    loadAlbums();
  }, [isAuthenticated, getAccessToken]);
  
  // Load photos when an album is selected
  useEffect(() => {
    const loadPhotos = async () => {
      if (!selectedAlbum) {
        setPhotos([]);
        return;
      }
      
      setLoading(true);
      
      if (isAuthenticated) {
        try {
          const token = await getAccessToken();
          
          if (token) {
            const service = await getOneDriveService(token);
            const photosData = await service.getPhotosFromAlbum(selectedAlbum.id);
            
            setPhotos(photosData);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error loading photos:', error);
          setLoading(false);
        }
      } else {
        // Use sample data when not authenticated
        setTimeout(() => {
          setPhotos([
            {
              id: '101',
              albumId: selectedAlbum.id,
              name: 'Concert Photo 1',
              url: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              thumbnailUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
              dateAdded: '2023-06-15',
              width: 1200,
              height: 800
            },
            {
              id: '102',
              albumId: selectedAlbum.id,
              name: 'Concert Photo 2',
              url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              thumbnailUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
              dateAdded: '2023-06-15',
              width: 1200,
              height: 800
            },
            {
              id: '103',
              albumId: selectedAlbum.id,
              name: 'Concert Photo 3',
              url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              thumbnailUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
              dateAdded: '2023-06-15',
              width: 1200,
              height: 800
            },
            {
              id: '104',
              albumId: selectedAlbum.id,
              name: 'Concert Photo 4',
              url: 'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              thumbnailUrl: 'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
              dateAdded: '2023-06-15',
              width: 1200,
              height: 800
            },
            {
              id: '105',
              albumId: selectedAlbum.id,
              name: 'Concert Photo 5',
              url: 'https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              thumbnailUrl: 'https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
              dateAdded: '2023-06-15',
              width: 1200,
              height: 800
            },
            {
              id: '106',
              albumId: selectedAlbum.id,
              name: 'Concert Photo 6',
              url: 'https://images.pexels.com/photos/1494062/pexels-photo-1494062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              thumbnailUrl: 'https://images.pexels.com/photos/1494062/pexels-photo-1494062.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
              dateAdded: '2023-06-15',
              width: 1200,
              height: 800
            },
          ]);
          setLoading(false);
        }, 500);
      }
    };
    
    loadPhotos();
  }, [selectedAlbum, isAuthenticated, getAccessToken]);
  
  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setPhotos([]);
  };
  
  return (
    <section 
      id="albums" 
      className="py-20 md:py-28 bg-rock-black"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-heading text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {selectedAlbum ? selectedAlbum.name : 'Albums Photo'}
        </motion.h2>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <GalleryLoader />
          ) : selectedAlbum ? (
            <>
              <div className="mb-8">
                <button
                  onClick={handleBackToAlbums}
                  className="rock-button"
                >
                  ← Retour aux Albums
                </button>
              </div>
              
              <PhotoGrid photos={photos} />
            </>
          ) : (
            <AlbumGrid albums={albums} onSelectAlbum={setSelectedAlbum} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;