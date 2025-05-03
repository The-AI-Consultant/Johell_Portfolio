import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Camera, Instagram, Facebook } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-500 backdrop-blur-md ${
    isScrolled 
      ? 'py-2 bg-black/80 shadow-xl border-b border-rock-gold/20' 
      : 'py-4 bg-transparent'
  }`;
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#accueil"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="flex items-center">
            <img 
              src="/attached_assets/Johell Logo Vector.jpeg" 
              alt="Johell Kodac Logo" 
              className="h-16 w-auto mr-2"
            />
            <span className="text-white text-xl font-cinzel">Johell Kodac</span>
          </div>
        </motion.a>
        
        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center justify-center flex-1 px-8"
        >
          <a href="#accueil" className="nav-link text-lg font-montserrat mx-8">
            Accueil
          </a>
          <a href="#a-propos" className="nav-link text-lg font-montserrat mx-8">
            À Propos
          </a>
          <a href="#albums" className="nav-link text-lg font-montserrat mx-8">
            Albums
          </a>
          <a href="#contact" className="nav-link text-lg font-montserrat mx-8">
            Contact
          </a>
        </motion.nav>

        {/* Social Media Icons */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          <a 
            href="https://www.instagram.com/johellkodac/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
          >
            <Instagram className="w-4 h-4 text-rock-gold" />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=100083541791749"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
          >
            <Facebook className="w-4 h-4 text-rock-gold" />
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-rock-gold" />
            ) : (
              <Menu className="w-6 h-6 text-rock-gold" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-rock-dark/95 backdrop-blur-md border-t border-rock-gold fixed top-[64px] left-0 right-0 z-50"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <a 
              href="#accueil" 
              className="text-white py-3 text-center hover:text-rock-gold transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </a>
            <a 
              href="#a-propos" 
              className="text-white py-3 text-center hover:text-rock-gold transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              À Propos
            </a>
            <a 
              href="#albums" 
              className="text-white py-3 text-center hover:text-rock-gold transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Albums
            </a>
            <a 
              href="#contact" 
              className="text-white py-3 text-center hover:text-rock-gold transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="rock-button mt-4 mx-auto"
              >
                Déconnexion
              </button>
            ) : (
              <button
                onClick={() => {
                  login();
                  setMobileMenuOpen(false);
                }}
                className="rock-button mt-4 mx-auto"
              >
                Admin
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;