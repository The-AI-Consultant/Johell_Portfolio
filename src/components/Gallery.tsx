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
            id: 'steeve-desgagne',
            name: 'Steeve Desgagné',
            description: 'Portrait Session',
            coverImage: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-12_54373818634_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 16
          }
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
          const photos = [
            { id: 'steeve-12', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-12_54373818634_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-15', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-15_54372738932_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-16', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-16_54374008415_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-17', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-17_54372740257_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-18', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-18_54372738867_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-19', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-19_54374009680_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-23', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-23_54373818544_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-25', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-25_54372738772_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-28', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-28_54373856383_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-2', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-2_54374008595_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-33', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-33_54373857198_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-34', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-34_54373819469_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-53', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-53_54373857643_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-6', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-6_54373856473_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-87', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-87_54373615761_o1-standard-scale-0_50x.jpeg' },
            { id: 'steeve-91', url: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-91_54373819479_o1-standard-scale-0_50x.jpeg' }
          ].map(photo => ({
            id: photo.id,
            albumId: selectedAlbum.id,
            name: `Steeve Portrait ${photo.id.split('-')[1]}`,
            url: photo.url,
            thumbnailUrl: photo.url,
            dateAdded: '2024-01-15',
            width: 1600,
            height: 1067
          }));
          
          setPhotos(photos);
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