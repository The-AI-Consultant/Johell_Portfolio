import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus } from 'lucide-react';

interface CreateAlbumFormProps {
  onCreate: (albumName: string) => Promise<boolean>;
}

const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({ onCreate }) => {
  const [albumName, setAlbumName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createStatus, setCreateStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!albumName) return;
    
    setIsLoading(true);
    setCreateStatus('idle');
    
    try {
      const success = await onCreate(albumName);
      
      if (success) {
        setCreateStatus('success');
        setAlbumName('');
      } else {
        setCreateStatus('error');
      }
    } catch (error) {
      console.error('Error creating album:', error);
      setCreateStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="albumName" className="block text-rock-gold mb-2">Nom de l'Album</label>
        <input
          type="text"
          id="albumName"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          required
          placeholder="Ex: Metallica 2024"
          className="w-full px-4 py-2 bg-rock-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300"
        />
      </div>
      
      <div className="border-2 border-dashed border-gray-600 rounded-md p-6 text-center">
        <FolderPlus className="w-12 h-12 text-rock-gold mx-auto mb-2" />
        <p className="text-white mb-2">
          Créer un nouvel album
        </p>
        <p className="text-gray-400 text-sm">
          Cet album apparaîtra dans votre galerie une fois créé
        </p>
      </div>
      
      {createStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-300 text-sm"
        >
          Album créé avec succès!
        </motion.div>
      )}
      
      {createStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300 text-sm"
        >
          Erreur lors de la création de l'album. Veuillez réessayer.
        </motion.div>
      )}
      
      <button
        type="submit"
        disabled={!albumName || isLoading}
        className={`rock-button w-full ${
          (!albumName || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-rock-black border-t-transparent rounded-full animate-spin mr-2"></span>
            Création...
          </>
        ) : (
          'Créer Album'
        )}
      </button>
    </form>
  );
};

export default CreateAlbumForm;