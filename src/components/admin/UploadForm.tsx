import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, X, Image, FolderPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import { getOneDriveService } from '../../services/oneDriveService';
import { Album } from '../../types';

interface UploadFormProps {
  onUpload: (albumId: string, file: File) => Promise<boolean>;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const { getAccessToken } = useAuth();
  
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const token = await getAccessToken();
        
        if (token) {
          const service = await getOneDriveService(token);
          const albumsData = await service.getAlbums();
          
          setAlbums(albumsData);
          if (albumsData.length > 0) {
            setSelectedAlbumId(albumsData[0].id);
          }
        }
        
        setLoadingAlbums(false);
      } catch (error) {
        console.error('Error loading albums:', error);
        setLoadingAlbums(false);
      }
    };
    
    loadAlbums();
  }, [getAccessToken]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setUploadStatus('idle');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !selectedAlbumId) return;
    
    setIsLoading(true);
    setUploadStatus('idle');
    
    try {
      const success = await onUpload(selectedAlbumId, file);
      
      if (success) {
        setUploadStatus('success');
        setFile(null);
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    setUploadStatus('idle');
  };
  
  if (loadingAlbums) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rock-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white">Chargement des albums...</p>
      </div>
    );
  }
  
  if (albums.length === 0) {
    return (
      <div className="text-center p-6 bg-rock-black rounded-lg">
        <div className="text-rock-gold mb-4">
          <FolderPlus className="w-12 h-12 mx-auto mb-2" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Aucun album trouvé</h3>
        <p className="text-gray-400 mb-4">
          Vous devez d'abord créer un album avant de pouvoir uploader des photos.
        </p>
        <button
          onClick={() => document.getElementById('createAlbumTab')?.click()}
          className="rock-button"
        >
          Créer un Album
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="album" className="block text-rock-gold mb-2">Album</label>
        <select
          id="album"
          value={selectedAlbumId}
          onChange={(e) => setSelectedAlbumId(e.target.value)}
          required
          className="w-full px-4 py-2 bg-rock-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300"
        >
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-md p-6 transition-colors duration-300 ${
          isDragging 
            ? 'border-rock-gold bg-rock-gold/10' 
            : file 
              ? 'border-green-500 bg-green-500/10' 
              : 'border-gray-600 hover:border-rock-gold'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center">
                <Image className="w-8 h-8 text-rock-gold mr-2" />
                <div>
                  <p className="text-white text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={removeFile}
              className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <UploadCloud className="w-12 h-12 text-rock-gold mx-auto mb-2" />
            <p className="text-white mb-2">
              Glissez-déposez une photo ici
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Ou cliquez pour sélectionner un fichier
            </p>
            <input
              type="file"
              id="photo"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="photo"
              className="rock-button inline-block cursor-pointer"
            >
              Parcourir...
            </label>
          </div>
        )}
      </div>
      
      {uploadStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-300 text-sm"
        >
          Photo téléversée avec succès!
        </motion.div>
      )}
      
      {uploadStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300 text-sm"
        >
          Erreur lors du téléversement de la photo. Veuillez réessayer.
        </motion.div>
      )}
      
      <button
        type="submit"
        disabled={!file || isLoading}
        className={`rock-button w-full ${
          (!file || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-rock-black border-t-transparent rounded-full animate-spin mr-2"></span>
            Téléversement...
          </>
        ) : (
          'Téléverser Photo'
        )}
      </button>
    </form>
  );
};

export default UploadForm;