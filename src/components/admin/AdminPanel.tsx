import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Upload, FolderPlus, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UploadForm from './UploadForm';
import CreateAlbumForm from './CreateAlbumForm';
import UserManagement from './UserManagement';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'createAlbum' | 'users'>('upload');
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-rock-gold transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex mb-6">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 ${
                    activeTab === 'upload' ? 'bg-rock-gold text-rock-black' : 'bg-rock-black text-white'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
                <button
                  onClick={() => setActiveTab('createAlbum')}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 ${
                    activeTab === 'createAlbum' ? 'bg-rock-gold text-rock-black' : 'bg-rock-black text-white'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  Albums
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 ${
                    activeTab === 'users' ? 'bg-rock-gold text-rock-black' : 'bg-rock-black text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Users
                </button>
              </div>

              {activeTab === 'upload' && <UploadForm />}
              {activeTab === 'createAlbum' && <CreateAlbumForm />}
              {activeTab === 'users' && <UserManagement />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;