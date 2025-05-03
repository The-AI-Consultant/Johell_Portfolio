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
            id: 'ccr',
            name: 'CCR',
            description: 'Live Performance',
            coverImage: '/attached_assets/CCR/GIGA PIXEL 2X ccr-10_54373572351_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 10
          },
          {
            id: 'bruno-rodeo',
            name: 'Bruno Rodéo',
            description: 'Live Performance',
            coverImage: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-108_54373580971_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 7
          },
          {
            id: 'deluge',
            name: 'Déluge',
            description: 'Live Performance',
            coverImage: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-10_54373588771_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 20
          },
          {
            id: 'steeve-desgagne',
            name: 'Steeve Desgagné',
            description: 'Portrait Session',
            coverImage: '/attached_assets/Steeve Desgagné/GIGA PIXEL 2X steeve-12_54373818634_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 16
          },
          {
            id: 'phil-lauzon',
            name: 'Phil Lauzon',
            description: 'Portrait Session',
            coverImage: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-14_54373814679_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 8
          },
          {
            id: 'quebec-redneck',
            name: 'Québec Redneck Bluegrass Projet',
            description: 'Live at Grande Ourse',
            coverImage: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-14_54374026465_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 11
          },
          {
            id: 'fantera',
            name: 'Fantera',
            description: 'Live Performance',
            coverImage: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-12_54372670752_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 11
          },
          {
            id: 'parabolus-cem',
            name: 'Parabolus CEM',
            description: 'Live at l\'Antirouille',
            coverImage: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-1_54373910828_o1-standard-scale-0_50x.jpeg',
            date: '2024-01-15',
            photoCount: 11
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
          let photos = [];

          if (selectedAlbum.id === 'ccr') {
            photos = [
              { id: 'ccr-10', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-10_54373572351_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-2', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-2_54373572411_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-3', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-3_54372696972_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-4', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-4_54373965805_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-5', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-5_54373776269_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-6', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-6_54373813978_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-7', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-7_54372696937_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-8', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-8_54373813943_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr-9', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr-9_54373572301_o1-standard-scale-0_50x.jpeg' },
              { id: 'ccr', url: '/attached_assets/CCR/GIGA PIXEL 2X ccr_54372697132_o1-standard-scale-0_50x.jpeg' }
            ].map(photo => ({
              id: photo.id,
              albumId: selectedAlbum.id,
              name: `CCR Live ${photo.id.split('-')[1] || '1'}`,
              url: photo.url,
              thumbnailUrl: photo.url,
              dateAdded: '2024-01-15',
              width: 1600,
              height: 1067
            }));
          } else if (selectedAlbum.id === 'bruno-rodeo') {
            photos = [
              { id: 'bruno-108', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-108_54373580971_o1-standard-scale-0_50x.jpeg' },
              { id: 'bruno-124', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-124_54372705157_o1-standard-scale-0_50x.jpeg' },
              { id: 'bruno-55', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-55_54372705382_o1-standard-scale-0_50x.jpeg' },
              { id: 'bruno-67', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-67_54372705272_o1-standard-scale-0_50x.jpeg' },
              { id: 'bruno-89', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-89_54373784509_o1-standard-scale-0_50x.jpeg' },
              { id: 'bruno-95', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-95_54373580946_o1-standard-scale-0_50x.jpeg' },
              { id: 'bruno-97', url: '/attached_assets/Bruno Rodéo/GIGA PIXEL 2X bruno-rodo-97_54373974210_o1-standard-scale-0_50x.jpeg' }
            ].map(photo => ({
              id: photo.id,
              albumId: selectedAlbum.id,
              name: `Bruno Rodéo Live ${photo.id.split('-')[1]}`,
              url: photo.url,
              thumbnailUrl: photo.url,
              dateAdded: '2024-01-15',
              width: 1600,
              height: 1067
            }));
          } else if (selectedAlbum.id === 'deluge') {
            photos = [
              { id: 'dluge-10', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-10_54373588771_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-12', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-12_54373982100_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-2', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-2_54373792454_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-3', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-3_54373830168_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-4', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-4_54372713267_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-5', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-5_54373982280_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-6', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-6_54373792399_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-7', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-7_54373588811_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-8', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-8_54373588806_o1-standard-scale-0_50x.jpeg' },
              { id: 'dluge-9', url: '/attached_assets/Déluge/GIGA PIXEL 2X dluge-9_54373588856_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-106', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-106_54373981855_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-12', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-12_54373829943_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-32', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-32_54373982025_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-43', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-43_54373982020_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-45', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-45_54373588616_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-56', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-56_54372713012_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-69', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-69_54373981880_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-72', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-72_54373983890_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-73', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-73_54373829683_o1-standard-scale-0_50x.jpeg' },
              { id: 'le-dluge-84', url: '/attached_assets/Déluge/GIGA PIXEL 2X le-dluge_-84_54373981825_o1-standard-scale-0_50x.jpeg' }
            ].map(photo => ({
              id: photo.id,
              albumId: selectedAlbum.id,
              name: `Déluge Live ${photo.id.split('-')[1] || '1'}`,
              url: photo.url,
              thumbnailUrl: photo.url,
              dateAdded: '2024-01-15',
              width: 1600,
              height: 1067
            }));
          } else if (selectedAlbum.id === 'steeve-desgagne') {
            photos = [
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

          } else if (selectedAlbum.id === 'phil-lauzon') {
            photos = [
              { id: 'phil-14', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-14_54373814679_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-17', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-17_54373814684_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-19', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-19_54372734902_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-35', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-35_54373814574_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-38', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-38_54373610891_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-39', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-39_54373852253_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-40', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-40_54374004120_o1-standard-scale-0_50x.jpeg' },
              { id: 'phil-6', url: '/attached_assets/Phil Lauzon/GIGA PIXEL 2X phil-lauzon-6_54374004260_o1-standard-scale-0_50x.jpeg' }
            ];
          } else if (selectedAlbum.id === 'quebec-redneck') {
            photos = [
              { id: 'qrbp-14', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-14_54374026465_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-19', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-19_54372756472_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-22', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-22_54374026315_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-25', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-25_54374026300_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-27', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-27_54373873923_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-28', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-28_54372756337_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-33', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-33_54373632486_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-37', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-37_54373873798_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-45', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-45_54374026155_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-49', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-49_54373632436_o1-standard-scale-0_50x.jpeg' },
              { id: 'qrbp-55', url: '/attached_assets/Québec redneck bluegrass projet/GIGA PIXEL 2X grande-ourse-55_54373835984_o1-standard-scale-0_50x.jpeg' }
            ];
          } else if (selectedAlbum.id === 'fantera') {
            photos = [
              { id: 'fantera-1', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera_54373750659_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-2', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-2_54373940095_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-3', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-3_54373546771_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-4', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-4_54373545471_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-5', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-5_54373749164_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-6', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-6_54373940030_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-8', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-8_54373787938_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-12', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-12_54372670752_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-14', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-14_54373940055_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-4-alt', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-4_54373546711_o1-standard-scale-0_50x.jpeg' },
              { id: 'fantera-5-alt', url: '/attached_assets/Fantera/GIGA PIXEL 2X fantera-5_54373940040_o1-standard-scale-0_50x.jpeg' }
            ];
          } else if (selectedAlbum.id === 'parabolus-cem') {
            photos = [
              { id: 'parabolus-cem-1', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-1_54373910828_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-2', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-2_54373909618_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-3', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-3_54373909513_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-4', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-4_54373910723_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-5', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-5_54373910923_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-6', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-6_54373909408_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-7', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-7_54373909303_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-8', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-8_54373909203_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-9', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-9_54373909103_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-10', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-10_54373909003_o1-standard-scale-0_50x.jpeg' },
              { id: 'parabolus-cem-11', url: '/attached_assets/Parabolus CEM/GIGA PIXEL 2X parabolus-cem-11_54373908903_o1-standard-scale-0_50x.jpeg' }
            ];
          }

          setPhotos(photos.map(photo => ({
            id: photo.id,
            albumId: selectedAlbum.id,
            name: `${selectedAlbum.name} - ${photo.id}`,
            url: photo.url,
            thumbnailUrl: photo.url,
            dateAdded: '2024-01-15',
            width: 1600,
            height: 1067
          })));
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