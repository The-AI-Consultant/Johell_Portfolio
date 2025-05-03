import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_h7nkuk2',
        'template_y1gfawk',
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: 'Johell Kodac'
        },
        'rTKDu98_oIAM2Wp74'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Email error:', error);
    }
  };

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

  return (
    <section 
      id="contact" 
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
          className="section-heading text-center mb-16 mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-concert text-rock-gold mb-6">
              Contactez-moi
            </h3>
            
            <p className="text-white text-lg mb-8 leading-relaxed">
              Vous souhaitez me contacter pour un projet, une collaboration ou simplement discuter de photographie ? Utilisez le formulaire ou contactez-moi directement par téléphone ou email.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="w-12 h-12 rounded-full bg-rock-gold/20 flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-rock-gold" />
                </span>
                <div>
                  <h4 className="text-rock-gold font-medium">Téléphone</h4>
                  <p className="text-white">(418) 818-2610</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="w-12 h-12 rounded-full bg-rock-gold/20 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-rock-gold" />
                </span>
                <div>
                  <h4 className="text-rock-gold font-medium">Email</h4>
                  <p className="text-white">johellkodac@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/johellkodac/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5 text-rock-gold" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100083541791749"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5 text-rock-gold" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5 text-rock-gold" />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="relative">
              {/* Glow effect around the form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rock-gold/30 via-rock-red/30 to-rock-blue/30 rounded-lg blur-md opacity-70"></div>
              
              <form 
                onSubmit={handleSubmit}
                className="bg-rock-dark/80 backdrop-blur-md border border-gray-800 rounded-lg p-6 relative"
              >
                <div className="mb-4">
                  <label htmlFor="name" className="block text-rock-gold mb-2">Nom</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-rock-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-rock-gold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-rock-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-rock-gold mb-2">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-rock-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`rock-button w-full ${
                    status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    status === 'success' ? 'bg-green-600 border-green-500 text-white cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'sending' ? 'Envoi...' : 'Envoyer'}
                </button>
                
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-green-400 text-center"
                  >
                    Merci pour votre message! Je vous répondrai dès que possible.
                  </motion.p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-center mt-4">Une erreur est survenue. Veuillez réessayer.</p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;