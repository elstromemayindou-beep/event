import { motion } from 'motion/react';
import { Instagram, Facebook, Send, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  date: z.string().min(1, 'La date est requise'),
  service: z.string().min(1, 'Veuillez choisir un service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Le message doit être plus long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log('Sending message:', data);
    // In a real app, send to Firebase or API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <header className="space-y-6">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">{t('nav_contact')}</span>
              <h1 className="text-5xl md:text-7xl font-serif">{t('contact_title')} <br /><span className="italic font-light">{t('contact_subtitle')}</span></h1>
              <p className="text-xl text-[#666] font-light">
                {t('contact_desc')}
              </p>
            </header>

            <div className="space-y-8">
              {[
                { icon: Phone, title: 'Téléphone / WhatsApp', val: '+242 518 47 53' },
                { icon: Mail, title: 'Email', val: 'contact@franckevents.cg' },
                { icon: MapPin, title: 'Localisation', val: 'Brazzaville, Congo (Secteur Centre-Ville)' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm"><item.icon className="text-[#D4AF37]" size={24} /></div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-[#999] mb-1">{item.title}</div>
                    <div className="text-xl font-serif font-bold">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#EEE] space-y-4">
               <div className="text-sm font-bold uppercase tracking-widest text-[#999]">Suivez-nous</div>
               <div className="flex space-x-4">
                 <Link to="#" className="p-4 bg-white rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all"><Instagram size={20}/></Link>
                 <Link to="#" className="p-4 bg-white rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all"><Facebook size={20}/></Link>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl border border-[#EEE]">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-20"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Send size={40} />
                </div>
                <h3 className="text-3xl font-serif font-bold">Message Envoyé !</h3>
                <p className="text-[#666]">Merci de votre confiance. Notre équipe vous recontactera sous 24h.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-10 py-4 bg-[#1A1A1A] text-white rounded-full font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-all"
                >
                  ENVOYER UN AUTRE MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Nom complet</label>
                    <input 
                      {...register('name')}
                      className="w-full bg-gray-50 border border-[#EEE] p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none" 
                      placeholder="Franck M."
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Email</label>
                    <input 
                      {...register('email')}
                      className="w-full bg-gray-50 border border-[#EEE] p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none" 
                      placeholder="franck@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Date de l'événement</label>
                    <input 
                      {...register('date')}
                      type="date"
                      className="w-full bg-gray-50 border border-[#EEE] p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none" 
                    />
                    {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Service désiré</label>
                    <select 
                      {...register('service')}
                      className="w-full bg-gray-50 border border-[#EEE] p-4 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="planning">Organisation Complète</option>
                      <option value="rental">Location Décoration</option>
                      <option value="animation">Sono & Animation</option>
                      <option value="other">Autre</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs">{errors.service.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#999]">Votre message</label>
                  <textarea 
                    {...register('message')}
                    rows={4}
                    className="w-full bg-gray-50 border border-[#EEE] p-6 rounded-2xl focus:ring-2 focus:ring-[#D4AF37] outline-none" 
                    placeholder="Dites-nous en plus sur vos envies..."
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[#1A1A1A] text-white rounded-full font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'ENVOYER LA DEMANDE'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-32 rounded-[60px] overflow-hidden h-[400px] border border-[#EEE] grayscale hover:grayscale-0 transition-all duration-700">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127339.718049618!2d15.193139363065184!3d-4.263889146566415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a316e6d30d5ef%3A0xe9504a504a6!2sBrazzaville!5e0!3m2!1sfr!2scg!4v1680000000000!5m2!1sfr!2scg" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
           />
        </div>
      </div>
    </div>
  );
}
