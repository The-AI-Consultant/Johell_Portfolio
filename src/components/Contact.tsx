import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'default_service',
          template_id: 'template_default',
          user_id: 'YOUR_USER_ID', // You'll need to sign up at emailjs.com
          template_params: {
            to_email: 'johellkodac@gmail.com',
            from_name: name,
            from_email: email,
            message: message,
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
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
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5 text-rock-gold" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-rock-gold/20 flex items-center justify-center hover:bg-rock-gold/40 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5 text-rock-gold" />
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-rock-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-rock-gold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-rock-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-rock-gold mb-2">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-rock-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-rock-gold transition-colors duration-300 resize-none"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`rock-button w-full ${
                    formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    formStatus === 'success' ? 'bg-green-600 border-green-500 text-white cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'idle' && 'Envoyer'}
                  {formStatus === 'submitting' && 'Envoi en cours...'}
                  {formStatus === 'success' && 'Message envoyé!'}
                  {formStatus === 'error' && 'Erreur - Réessayer'}
                </button>
                
                {formStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-green-400 text-center"
                  >
                    Merci pour votre message! Je vous répondrai dès que possible.
                  </motion.p>
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