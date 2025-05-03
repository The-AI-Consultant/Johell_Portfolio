import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Camera } from 'lucide-react';
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
  
  const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    isScrolled 
      ? 'py-2 bg-rock-black bg-opacity-90 backdrop-blur-md shadow-lg' 
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
              src="/src/assets/LOGO johell Kodac.jpg" 
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
          className="hidden md:flex items-center space-x-8"
        >
          <a href="#accueil" className="text-white hover:text-rock-gold text-lg font-montserrat transition-colors duration-300 link-hover">
            Accueil
          </a>
          <a href="#a-propos" className="text-white hover:text-rock-gold text-lg font-montserrat transition-colors duration-300 link-hover">
            À Propos
          </a>
          <a href="#albums" className="text-white hover:text-rock-gold text-lg font-montserrat transition-colors duration-300 link-hover">
            Albums
          </a>
          <a href="#contact" className="text-white hover:text-rock-gold text-lg font-montserrat transition-colors duration-300 link-hover">
            Contact
          </a>
          
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="rock-button"
            >
              Déconnexion
            </button>
          ) : (
            <button
              onClick={login}
              className="rock-button"
            >
              Admin
            </button>
          )}
        </motion.nav>
        
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
          className="md:hidden bg-rock-dark border-t border-rock-gold"
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