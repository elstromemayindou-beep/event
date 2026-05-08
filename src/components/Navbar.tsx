import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Camera, Phone, Info, LayoutGrid, Languages, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), path: '/', icon: Info },
    { name: t('nav_services'), path: '/services', icon: Calendar },
    { name: t('nav_calendar'), path: '/calendar', icon: Calendar },
    { name: t('nav_portfolio'), path: '/portfolio', icon: Camera },
    { name: t('nav_blog'), path: '/blog', icon: LayoutGrid },
    { name: t('nav_contact'), path: '/contact', icon: Phone },
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'ln', name: 'Lingala' },
    { code: 'kt', name: 'Kituba' },
  ];

  return (
    <nav 
      id="main-nav"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-[#F5F2ED]/80 backdrop-blur-xl shadow-lg border-b border-[#EEE]/50 py-3" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className={cn(
          "text-2xl font-serif font-bold tracking-tighter transition-colors duration-500",
          !isScrolled && location.pathname === '/' ? "text-white" : "text-[#1A1A1A]"
        )}>
          FRANCK EVENTS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:text-[#D4AF37]",
                location.pathname === link.path ? "text-[#D4AF37]" : (!isScrolled && location.pathname === '/' ? "text-white/70" : "text-[#1A1A1A]")
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Language Selector */}
          <div className="relative group">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
                !isScrolled && location.pathname === '/' ? "text-white/70" : "text-[#1A1A1A]"
              )}
            >
              <Languages size={14} />
              <span>{languages.find(l => l.code === language)?.name || 'Français'}</span>
              <ChevronDown size={12} className={cn("transition-transform", isLangOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-4 right-0 bg-white shadow-2xl rounded-2xl border border-[#EEE] overflow-hidden min-w-[120px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-gray-50",
                        language === lang.code ? "text-[#D4AF37] bg-gray-50" : "text-[#1A1A1A]"
                      )}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            to="/contact" 
            className={cn(
              "px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500",
              !isScrolled && location.pathname === '/' 
                ? "bg-white text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-white" 
                : "bg-[#1A1A1A] text-white hover:bg-[#D4AF37]"
            )}
          >
            {t('nav_book')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "md:hidden transition-colors duration-500",
            !isScrolled && location.pathname === '/' ? "text-white" : "text-[#1A1A1A]"
          )} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white mt-4 rounded-3xl shadow-2xl border border-[#EEE]"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-4 text-xs font-bold uppercase tracking-widest transition-colors",
                    location.pathname === link.path ? "text-[#D4AF37]" : "text-[#1A1A1A]"
                  )}
                >
                  <link.icon size={18} className="text-[#D4AF37]" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
