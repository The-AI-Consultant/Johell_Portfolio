import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-rock-black border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-6 md:mb-0"
          >
            <img 
            src="/attached_assets/Johell Logo Vector.jpeg" 
            alt="Johell Kodac Logo" 
            className="h-12 w-auto mr-3"
          />
          <span className="text-2xl font-cinzel text-rock-gold tracking-wider">
            Johell Kodac
          </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-400 text-sm mb-2">
              &copy; {new Date().getFullYear()} Johell Kodac - Tous droits réservés
            </p>
            <p className="text-gray-500 text-xs flex items-center justify-center md:justify-end">
              Créé avec <Heart className="w-3 h-3 text-rock-red mx-1" /> pour la musique et la photographie
            </p>
          </motion.div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Ce site utilise uniquement des cookies essentiels au bon fonctionnement. Aucune donnée n'est partagée avec des tiers.
            Pour retirer votre consentement ou demander la suppression de vos données, contactez : 
            <a href="mailto:contact@johellkodac.com" className="underline ml-1 text-rock-gold hover:text-rock-gold-warm">contact@johellkodac.com</a>
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Il est de la responsabilité de l'utilisateur de vérifier les zones de saisie de données personnelles.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;