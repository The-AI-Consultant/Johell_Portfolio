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
      className="relative py-16 md:py-24 bg-rock-dark"
      style={{
        backgroundImage: "url('/src/assets/BACKGROUND WEBSITE.png')",
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1 h-full flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-concert text-rock-gold mb-6">
              Photographe de Scène Passionné
            </h3>
            
            <p className="text-white text-lg mb-4 leading-relaxed">
              C'est en 2022 que Joël commence à s'intéresser à la photographie. Amateur de vidéos de grande qualité graphique, il se dit qu'il aimerait peut-être créer lui-même ses propres images. Armé d'un appareil photo seconde main et de quelques connaissances de base glanées sur Youtube, Joël se lance. Il photographie des paysages, des gens, des animaux. Autodidacte de nature, il s'informe et se perfectionne continuellement.
            </p>
            
            <p className="text-white text-lg mb-4 leading-relaxed">
              Il rejoint les rangs du club de photo de Chicoutimi, dont il deviendra rapidement membre du CA. Son talent est indéniable, mais il manque encore cette étincelle. Son créneau.
            </p>

            <p className="text-white text-lg mb-4 leading-relaxed">
              C'est quelques mois plus tard, lorsqu'il a l'occasion de photographier un concert rock, que la révélation a lieu! Joël, amateur de musique depuis toujours, peut maintenant concilier ses deux passions, la musique et la photo. En coulisses et parmi la foule, Joël est partout, toujours à l'affût du meilleur cliché.
            </p>

            <p className="text-white text-lg mb-6 leading-relaxed">
              Du portrait artistique à la photo d'ensemble qui traduit l'énergie du spectacle, il sait capturer avec brio tous les moments clés de ces soirées. Grâce à son talent naturel, il s'est rapidement taillé une place parmi les grands photographes de la scène théâtrale du Saguenay-Lac-St-Jean. Ne cherchez plus le photographe idéal pour votre événement, Joël avec son oeil artistique, vous garantit des souvenirs grandioses!
            </p>
            
            <div className="max-w-4xl mx-auto mb-8">
              <div className="p-6 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm border border-rock-gold border-opacity-20">
                <p className="text-center text-lg text-rock-gold font-semibold mb-4">
                  Photographe professionnel spécialisé dans la capture de moments uniques en concert
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="order-1 md:order-2 flex justify-center h-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative w-full max-w-md"
            >
              <div className="absolute -inset-1.5 bg-rock-gold rounded-lg blur opacity-50"></div>
              <img 
                src="/attached_assets/Profil picture - Joel Tremblay Photographe.jpg" 
                alt="Johell Kodac" 
                className="w-full h-full object-cover rounded-lg relative z-10" 
                style={{ aspectRatio: '4/5' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;