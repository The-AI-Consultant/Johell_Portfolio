import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Music, Microscope as Microphone, Video } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };
  
  return (
    <section 
      id="a-propos" 
      className="relative py-20 md:py-28 bg-rock-dark"
      style={{
        backgroundImage: "url('/src/assets/dark-texture.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rock-black via-transparent to-rock-black opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="section-heading text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          À Propos de Johell
        </motion.h2>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-concert text-rock-gold mb-6">
              Photographe de Scène Passionné
            </h3>
            
            <p className="text-white text-lg mb-4 leading-relaxed">
              Bonjour! Je suis Johell Kodac, photographe spécialisé dans la capture de l'énergie brute des concerts rock et métal. Avec plus de 15 ans d'expérience, j'immortalise les moments intenses qui définissent l'esprit du rock.
            </p>
            
            <p className="text-white text-lg mb-6 leading-relaxed">
              Ma passion est de saisir l'âme des performances live - ces instants fugaces où la lumière, le son et l'émotion se rencontrent. Chaque image raconte une histoire, préserve un souvenir et célèbre l'art de la scène.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div 
                variants={iconVariants} 
                className="p-4 bg-black bg-opacity-50 rounded-lg text-center backdrop-blur-sm border border-rock-gold border-opacity-20"
              >
                <Camera className="w-10 h-10 mx-auto text-rock-gold mb-2" />
                <h4 className="text-rock-gold font-semibold">Photographie</h4>
              </motion.div>
              
              <motion.div 
                variants={iconVariants} 
                className="p-4 bg-black bg-opacity-50 rounded-lg text-center backdrop-blur-sm border border-rock-gold border-opacity-20"
              >
                <Music className="w-10 h-10 mx-auto text-rock-gold mb-2" />
                <h4 className="text-rock-gold font-semibold">Concerts</h4>
              </motion.div>
              
              <motion.div 
                variants={iconVariants} 
                className="p-4 bg-black bg-opacity-50 rounded-lg text-center backdrop-blur-sm border border-rock-gold border-opacity-20"
              >
                <Microphone className="w-10 h-10 mx-auto text-rock-gold mb-2" />
                <h4 className="text-rock-gold font-semibold">Artistes</h4>
              </motion.div>
              
              <motion.div 
                variants={iconVariants} 
                className="p-4 bg-black bg-opacity-50 rounded-lg text-center backdrop-blur-sm border border-rock-gold border-opacity-20"
              >
                <Video className="w-10 h-10 mx-auto text-rock-gold mb-2" />
                <h4 className="text-rock-gold font-semibold">Vidéo</h4>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="order-1 md:order-2 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              <div className="absolute -inset-1.5 bg-rock-gold rounded-lg blur opacity-50"></div>
              <img 
                src="/src/assets/johell-portrait.jpg" 
                alt="Johell Kodac" 
                className="max-w-full h-auto rounded-lg relative z-10" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;