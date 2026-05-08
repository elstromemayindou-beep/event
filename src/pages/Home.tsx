import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Calendar, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
            alt="Elite Event"
            className="w-full h-full object-cover opacity-60 scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />

              <span className="text-[#D4AF37] text-sm font-bold tracking-[0.4em] uppercase">
                Brazzaville • Pointe-Noire
              </span>

              <div className="h-[1px] w-12 bg-[#D4AF37]" />
            </div>

            <h1 className="text-6xl md:text-9xl font-serif font-light leading-none tracking-tight">
              {t('hero_title_art')}
              <br />

              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="italic text-[#D4AF37]"
              >
                {t('hero_title_exception')}
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              {t('hero_subtitle')}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10"
            >
              <Link
                to="/services"
                className="px-12 py-5 bg-[#D4AF37] text-white rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-none"
              >
                {t('hero_cta_book')}
              </Link>

              <Link
                to="/calendar"
                className="px-12 py-5 border border-white/30 text-white rounded-full font-bold tracking-widest uppercase backdrop-blur-md hover:bg-white/10 transition-all duration-500"
              >
                {t('hero_cta_calendar')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
            Découvrir
          </span>

          <div className="w-[1px] h-20 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 md:p-12 bg-white/70 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white/50">
          {[
            { label: 'Événements', value: '150+', icon: Calendar },
            { label: 'Clients Unis', value: '5k+', icon: Star },
            { label: 'Partenaires', value: '25+', icon: Sparkles },
            { label: 'Villes', value: '05', icon: MapPin },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2 p-4"
            >
              <div className="flex justify-center mb-4">
                <stat.icon
                  className="text-[#D4AF37]"
                  size={24}
                  strokeWidth={1}
                />
              </div>

              <div className="text-4xl font-serif font-bold text-[#1A1A1A]">
                {stat.value}
              </div>

              <div className="text-[10px] text-[#999] uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-6 max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-6">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] uppercase">
              {t('excellence_badge')}
            </span>

            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              {t('vision_title')}
              <br />

              <span className="italic">{t('vision_subtitle')}</span>
            </h2>
          </div>

          <p className="text-xl text-[#666] max-w-md font-light leading-relaxed">
            {t('vision_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Scénographie',
              desc: 'Des designs botaniques et architecturaux pour une immersion totale.',
              img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000',
              category: 'Design',
            },
            {
              title: 'Gastronomie',
              desc: 'Une expérience culinaire raffinée orchestrée par les meilleurs chefs.',
              img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
              category: 'Premium',
            },
            {
              title: 'Entertainment',
              desc: 'Artistes internationaux et sonorisation de pointe pour vos soirées.',
              img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
              category: 'Ambiance',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              className="group relative"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-[60px] shadow-2xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-end text-white space-y-2 pointer-events-none">
                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">
                  {item.category}
                </span>

                <h3 className="text-3xl font-serif font-bold">
                  {item.title}
                </h3>

                <p className="text-white/60 text-sm font-light mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="py-40 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="flex justify-center mb-12">
            <Star className="text-[#D4AF37]" size={40} strokeWidth={1} />
          </div>

          <blockquote className="text-4xl md:text-6xl font-serif text-white max-w-5xl mx-auto leading-tight italic">
            "Chez Franck Event’s, nous transformons chaque événement en un
            moment unique et inoubliable."
          </blockquote>

          <div className="mt-12 flex flex-col items-center">
            <div className="w-20 h-[1px] bg-[#D4AF37] mb-6" />

            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] uppercase">
              Franck, Fondateur
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[80px] overflow-hidden bg-white p-12 md:p-32 border border-[#EEE] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-8 flex-1">
            <h2 className="text-5xl md:text-7xl font-serif">
              Commencez Votre
              <br />

              <span className="text-[#D4AF37] font-light">Histoire</span>
            </h2>

            <p className="text-xl text-[#666] font-light max-w-md">
              Rencontrez nos experts pour une consultation privée.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center space-x-4 text-xs font-bold tracking-[0.5em] uppercase group"
            >
              <span>Nous Contacter</span>

              <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-[60px] blur-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-700" />

              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
                alt="Experience"
                className="relative rounded-[60px] w-full max-w-md aspect-[4/5] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}