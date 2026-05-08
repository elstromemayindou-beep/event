import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, Sparkles, Diamond, Crown, ChevronRight, Music } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';
import { useLanguage } from '../context/LanguageContext';

const packages = [
  {
    name: 'Essentiel',
    price: '350.000 FCFA',
    amount: 350000,
    desc: 'La signature Franck Events pour vos célébrations intimes.',
    features: ['Conseil initial stylistique', 'Organisation partielle', 'Décoration florale basique', 'Coordination jour J'],
    color: 'bg-white',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Prestige',
    price: '1.000.000 FCFA',
    amount: 1000000,
    desc: "L'excellence transcendée pour un événement mémorable et sans couture.",
    features: ['Organisation complète A-Z', 'Design scénographique sur mesure', 'Location mobilier premium', 'Animation sonorisation & Light', 'Gestion photographe', 'Conciergerie invités'],
    color: 'bg-[#1A1A1A]',
    dark: true,
    icon: Diamond,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Hautes Terres',
    price: 'Sur devis (> 3.000.000 FCFA)',
    amount: 3000000,
    desc: 'Le luxe absolu, une pièce d\'orfèvrerie événementielle unique au monde.',
    features: ['Service majordome privé', 'Production artistique exclusive', 'Décoration importée sur mesure', 'Logistique VIP & Sécurité', 'Suivi post-événement premium'],
    color: 'bg-white',
    icon: Crown,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'
  }
];

export function ServicesPage() {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-32 space-y-8 text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-[0.5em] uppercase rounded-full"
          >
            {t('nav_services')}
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif leading-tight">{t('services_title')} <br /><span className="italic">{t('services_subtitle')}</span></h1>
          <p className="text-xl text-[#666] max-w-2xl mx-auto font-light leading-relaxed">
            {t('services_desc')}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className={`relative overflow-hidden rounded-[80px] border border-[#EEE] flex flex-col md:flex-row h-full min-h-[500px] ${pkg.color} ${pkg.dark ? 'text-white' : 'text-[#1A1A1A]'} shadow-sm hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all duration-700 group`}
            >
              <div className="md:w-1/2 relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
              </div>

              <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-between space-y-10 relative z-10">
                <div className="space-y-10">
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-3xl ${pkg.dark ? 'bg-white/10' : 'bg-[#D4AF37]/10'}`}>
                        <pkg.icon className={pkg.dark ? 'text-white' : 'text-[#D4AF37]'} size={32} strokeWidth={1} />
                    </div>
                    {pkg.dark && <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">Le Plus Prisé</span>}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{pkg.name}</h3>
                    <div className="text-3xl font-light text-[#D4AF37] font-serif uppercase tracking-widest">{pkg.price}</div>
                  </div>

                  <p className={`${pkg.dark ? 'text-white/60' : 'text-[#666]'} font-light text-lg leading-relaxed italic`}>
                    "{pkg.desc}"
                  </p>

                  <div className={`h-[1px] w-full ${pkg.dark ? 'bg-white/10' : 'bg-[#EEE]'}`} />

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start space-x-4">
                        <div className={`mt-1 p-1 rounded-full ${pkg.dark ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                          <Check size={12} strokeWidth={3} className={pkg.dark ? 'text-[#1A1A1A]' : ''} />
                        </div>
                        <span className="text-sm font-medium leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handleOpenBooking(pkg)}
                  className={`w-full md:w-fit px-12 py-6 rounded-full text-center text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center space-x-3 ${
                    pkg.dark ? 'bg-white text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#D4AF37]'
                  }`}
                >
                  <span>{t('services_choose')}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPackage && (
          <BookingModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            service={selectedPackage} 
          />
        )}

        {/* Custom Service Section */}
        <section className="mt-40 bg-[#1A1A1A] px-12 py-24 md:p-32 rounded-[80px] text-white flex flex-col md:flex-row items-center gap-20 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[200px] opacity-10 -translate-y-1/2 translate-x-1/2" />
           
           <div className="flex-1 space-y-8 relative z-10">
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] uppercase">Tailleur d'Événements</span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tight">Besoin de <span className="italic text-[#D4AF37]">Lumière ?</span></h2>
              <p className="text-xl text-white/50 font-light max-w-xl leading-relaxed">
                Vous avez des besoins spécifiques non listés ? Nos experts en logistique scénique peuvent concevoir un matériel exclusif pour votre événement.
              </p>
              <button className="px-12 py-5 bg-[#D4AF37] text-white rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl">
                 Demander un devis libre
              </button>
           </div>
           
           <div className="flex-1 w-full grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-4">
                 <div className="aspect-square bg-white/5 rounded-[40px] p-8 flex flex-col justify-end border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <Music className="text-[#D4AF37] mb-4" size={32} strokeWidth={1} />
                    <div className="text-sm font-bold uppercase tracking-widest">Sonorisation</div>
                 </div>
                 <div className="aspect-[3/4] overflow-hidden rounded-[40px]">
                    <img src="https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Equipement" />
                 </div>
              </div>
              <div className="space-y-4 pt-12">
                 <div className="aspect-[3/4] overflow-hidden rounded-[40px]">
                    <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Deco" />
                 </div>
                 <div className="aspect-square bg-white/5 rounded-[40px] p-8 flex flex-col justify-end border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <Sparkles className="text-[#D4AF37] mb-4" size={32} strokeWidth={1} />
                    <div className="text-sm font-bold uppercase tracking-widest">Lumières</div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
