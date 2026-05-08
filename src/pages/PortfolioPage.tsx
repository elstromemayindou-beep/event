import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, Youtube, Filter, Calendar as CalendarIcon, Star, Quote, Play, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface GalleryItem {
  id: string;
  type: 'photo' | 'tiktok';
  url: string;
  title: string;
  category: string;
  year: number;
  size: 'small' | 'large' | 'tall' | 'wide';
}

export function PortfolioPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState('Tous');
  const [yearFilter, setYearFilter] = useState('Toutes');
  const [activeTab, setActiveTab] = useState<'gallery' | 'testimonials'>('gallery');

  const categories = ['Tous', 'Mariage', 'Anniversaire', 'Professionnel', 'Décoration'];
  const years = ['Toutes', '2024', '2023', '2022'];

  useEffect(() => {
    const mockItems: GalleryItem[] = [
      { id: '1', type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000', title: "Mariage Royal au Fleuve", category: 'Mariage', year: 2024, size: 'large' },
      { id: '2', type: 'photo', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1000', title: 'Lancement Prestige Canal+', category: 'Professionnel', year: 2023, size: 'small' },
      { id: '3', type: 'photo', url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1000', title: 'Scénographie Exotique', category: 'Décoration', year: 2024, size: 'tall' },
      { id: '4', type: 'photo', url: 'https://images.unsplash.com/photo-1472653453472-008103348160?auto=format&fit=crop&q=80&w=1000', title: 'Séminaire Corporatif Elite', category: 'Professionnel', year: 2024, size: 'wide' },
      { id: '5', type: 'photo', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000', title: 'Gala de Bienfaisance', category: 'Professionnel', year: 2022, size: 'small' },
      { id: '6', type: 'photo', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000', title: 'Cocktail au Crépuscule', category: 'Professionnel', year: 2023, size: 'small' },
      { id: '7', type: 'photo', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000', title: 'Anniversaire 50 ans VIP', category: 'Anniversaire', year: 2024, size: 'large' },
    ];
    setItems(mockItems);
  }, []);

  const filteredItems = items.filter(item => {
    const categoryMatch = filter === 'Tous' || item.category === filter;
    const yearMatch = yearFilter === 'Toutes' || item.year.toString() === yearFilter;
    return categoryMatch && yearMatch;
  });

  const testimonials = [
    { name: "S. & A. Mbemba", text: "Chaque seconde de notre mariage a été orchestrée avec une précision d'orfèvre. Franck a su capturer l'âme de notre union dans sa décoration.", stars: 5, year: 2024, type: "Mariage" },
    { name: "Direction Canal+ Congo", text: "Professionnalisme exemplaire. Notre soirée de gala a été le point d'orgue de notre année grâce à votre équipe.", stars: 5, year: 2023, type: "Professionnel" },
    { name: "Dr Catherine N.", text: "Pour mes 50 ans, je voulais du rêve. Vous avez livré une réalité encore plus belle. Merci pour tout.", stars: 5, year: 2024, type: "Privé" },
  ];

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    large: "col-span-2 row-span-2",
    tall: "col-span-1 row-span-2",
    wide: "col-span-2 row-span-1"
  };

  return (
    <div className="pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 space-y-10 text-center">
          <div className="space-y-4">
             <span className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] uppercase">Archive d'Émotions</span>
             <h1 className="text-6xl md:text-8xl font-serif">Galerie <span className="italic">Privée</span></h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-4">
             <div className="flex space-x-2 bg-white/50 backdrop-blur-xl p-1.5 rounded-full border border-[#EEE] shadow-sm">
               <button 
                 onClick={() => setActiveTab('gallery')}
                 className={cn("px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500", activeTab === 'gallery' ? "bg-[#1A1A1A] text-white shadow-xl" : "hover:bg-gray-100")}
               >
                 Galerie
               </button>
               <button 
                 onClick={() => setActiveTab('testimonials')}
                 className={cn("px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500", activeTab === 'testimonials' ? "bg-[#1A1A1A] text-white shadow-xl" : "hover:bg-gray-100")}
               >
                 Témoignages
               </button>
             </div>
             
             <div className="h-6 w-[1px] bg-[#EEE] hidden md:block" />

             <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-3 bg-white border border-[#EEE] rounded-2xl px-5 py-2.5 shadow-sm transition-all hover:border-[#D4AF37]">
                   <Filter size={14} className="text-[#D4AF37]" />
                   <select 
                     value={filter} 
                     onChange={(e) => setFilter(e.target.value)}
                     className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
                   >
                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
                <div className="flex items-center space-x-3 bg-white border border-[#EEE] rounded-2xl px-5 py-2.5 shadow-sm transition-all hover:border-[#D4AF37]">
                   <CalendarIcon size={14} className="text-[#D4AF37]" />
                   <select 
                     value={yearFilter} 
                     onChange={(e) => setYearFilter(e.target.value)}
                     className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
                   >
                     {years.map(y => <option key={y} value={y}>{y}</option>)}
                   </select>
                </div>
             </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'gallery' ? (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className={cn(
                    "relative overflow-hidden rounded-[50px] group cursor-pointer shadow-xl border border-[#EEE]",
                    sizeClasses[item.size]
                  )}
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                    <div className="text-white space-y-4 translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-[#D4AF37] text-[9px] font-bold tracking-widest uppercase rounded-full">{item.category}</span>
                        <span className="text-white/40 text-[10px]">•</span>
                        <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">{item.year}</span>
                      </div>
                      <h3 className="text-3xl font-serif font-bold italic leading-tight">{item.title}</h3>
                      <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
                        <Maximize2 size={14} />
                        <span>Agrandir</span>
                      </button>
                    </div>
                  </div>
                  {item.type === 'tiktok' && (
                    <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <Play size={16} fill="currentColor" />
                    </div>
                  )}
                </motion.div>
              ))}
              {filteredItems.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-40 space-y-4 opacity-30">
                   <Filter size={48} strokeWidth={1} />
                   <p className="font-serif italic text-2xl">Aucun souvenir trouvé pour cette sélection.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="testimonials"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-14 rounded-[60px] border border-[#EEE] shadow-sm flex flex-col justify-between group hover:shadow-2xl transition-all duration-700"
                >
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                       <div className="flex space-x-1 text-[#D4AF37]">
                         {[...Array(t.stars)].map((_, idx) => (
                           <Star key={idx} size={14} fill="currentColor" />
                         ))}
                       </div>
                       <Quote size={40} className="text-[#F5F2ED] group-hover:text-[#D4AF37]/10 transition-colors" />
                    </div>
                    <p className="text-2xl font-serif leading-relaxed text-[#1A1A1A] italic group-hover:scale-[1.02] transition-transform duration-500">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-[#EEE] flex justify-between items-end">
                    <div>
                      <div className="font-bold text-lg tracking-tight">{t.name}</div>
                      <div className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">{t.type} • {t.year}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global CTA Section */}
        <div className="mt-40 text-center space-y-10">
           <div className="inline-flex space-x-4">
              <a href="#" className="w-16 h-16 rounded-full border border-[#EEE] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all duration-500 hover:-translate-y-2"><Instagram size={24} /></a>
              <a href="#" className="w-16 h-16 rounded-full border border-[#EEE] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all duration-500 hover:-translate-y-2"><Facebook size={24} /></a>
              <a href="#" className="w-16 h-16 rounded-full border border-[#EEE] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all duration-500 hover:-translate-y-2"><Youtube size={24} /></a>
           </div>
           <p className="text-[#999] text-[10px] font-bold uppercase tracking-[0.5em]">Suivez notre art au quotidien</p>
        </div>
      </div>
    </div>
  );
}
