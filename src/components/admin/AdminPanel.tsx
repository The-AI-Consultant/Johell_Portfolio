import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Upload, FolderPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UploadForm from './UploadForm';
import CreateAlbumForm from './CreateAlbumForm';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'albums'>('upload');
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <button
        onClick={() => window.location.hash = '#admin'}
        className="fixed bottom-4 right-4 p-3 bg-rock-gold rounded-full shadow-lg hover:bg-rock-gold/80 transition-colors duration-300"
      >
        <Settings className="w-6 h-6 text-rock-black" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-rock-gold rounded-full shadow-lg hover:bg-rock-gold/80 transition-colors duration-300"
      >
        <Settings className="w-6 h-6 text-rock-black" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 bg-rock-black/95 z-50"
          >
            <div className="h-full w-full flex flex-col p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-cinzel text-rock-gold">Administration</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-rock-gold transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex border-b border-rock-gold/30 mb-6">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
                    activeTab === 'upload' ? 'text-rock-gold border-b-2 border-rock-gold' : 'text-white hover:text-rock-gold'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Photos
                </button>
                <button
                  onClick={() => setActiveTab('albums')}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 ${
                    activeTab === 'albums' ? 'text-rock-gold border-b-2 border-rock-gold' : 'text-white hover:text-rock-gold'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  Albums
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {activeTab === 'upload' && <UploadForm />}
                {activeTab === 'albums' && <CreateAlbumForm />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;