import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Upload, FolderPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getOneDriveService } from '../../services/oneDriveService';
import UploadForm from './UploadForm';
import CreateAlbumForm from './CreateAlbumForm';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'createAlbum'>('upload');
  const { getAccessToken } = useAuth();
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  const handleCreateAlbum = async (albumName: string) => {
    try {
      const token = await getAccessToken();
      
      if (token) {
        const service = await getOneDriveService(token);
        const album = await service.createAlbum(albumName);
        
        if (album) {
          // Reload the page to see the new album
          window.location.reload();
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error creating album:', error);
      return false;
    }
  };
  
  const handleUploadPhoto = async (albumId: string, file: File) => {
    try {
      const token = await getAccessToken();
      
      if (token) {
        const service = await getOneDriveService(token);
        const photo = await service.uploadPhoto(albumId, file);
        
        if (photo) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error uploading photo:', error);
      return false;
    }
  };
  
  return (
    <>
      <button
        onClick={togglePanel}
        className="fixed bottom-8 right-8 z-40 p-4 bg-rock-gold rounded-full text-rock-black shadow-lg hover:bg-white transition-colors duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-rock-dark border-l border-rock-gold z-30 shadow-xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-rockSalt text-rock-gold">Admin Panel</h2>
                <button
                  onClick={togglePanel}
                  className="text-white hover:text-rock-gold transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex mb-6">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 transition-colors duration-300 ${
                    activeTab === 'upload' 
                      ? 'bg-rock-gold text-rock-black font-medium' 
                      : 'bg-rock-black text-white'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Uploader
                </button>
                <button
                  onClick={() => setActiveTab('createAlbum')}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 transition-colors duration-300 ${
                    activeTab === 'createAlbum' 
                      ? 'bg-rock-gold text-rock-black font-medium' 
                      : 'bg-rock-black text-white'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  Nouvel Album
                </button>
              </div>
              
              <div className="mt-4">
                {activeTab === 'upload' ? (
                  <UploadForm onUpload={handleUploadPhoto} />
                ) : (
                  <CreateAlbumForm onCreate={handleCreateAlbum} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;