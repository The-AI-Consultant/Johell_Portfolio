import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import { useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import LoginModal from './components/admin/LoginModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isAuthenticated, isAdmin } = useAuth();
  
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="relative min-h-screen bg-rock-black overflow-hidden">
      {/* Dynamic spotlight following cursor */}
      <div 
        className="spotlight animate-spotlight"
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y,
          opacity: 0.5
        }}
      />
      
      <Header />
      <LoginModal />
      
      <main>
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
      
      {isAuthenticated && isAdmin && <AdminPanel />}
      
      <Footer />
    </div>
  );
}

export default App;