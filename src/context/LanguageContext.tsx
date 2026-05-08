import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'ln' | 'kt';

interface Translations {
  [key: string]: {
    fr: string;
    ln: string;
    kt: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { fr: 'Accueil', ln: 'Ebandeli', kt: 'Luyantiku' },
  nav_services: { fr: 'Services', ln: 'Misala', kt: 'Bisalu' },
  nav_calendar: { fr: 'Calendrier', ln: 'Manaka', kt: 'Kalandrie' },
  nav_portfolio: { fr: 'Portfolio', ln: 'Misala na biso', kt: 'Bisalu na beto' },
  nav_blog: { fr: 'Blog', ln: 'Sango', kt: 'Nsangu' },
  nav_contact: { fr: 'Contact', ln: 'Masolo', kt: 'Masolo' },
  nav_book: { fr: 'RÉSERVER', ln: 'KOKAMBA', kt: 'KULOMBA' },

  // Hero
  hero_title_art: { fr: "L'Art de", ln: 'Mayele ya', kt: 'Mayele ya' },
  hero_title_exception: { fr: "l'Exception", ln: 'Makambo Minene', kt: 'Mambu ya Nene' },
  hero_subtitle: { 
    fr: 'Franck Events conçoit des expériences prestigieuses où chaque détail raconte une histoire d\'élégance.', 
    ln: 'Franck Events esalaka makambo ya kitoko mpenza epai wapi mwa likambo nionso elobaka lisolo ya lokumu.',
    kt: 'Franck Events ke salaka mambu ya kitoko mpenza kisika konso kima ya fioti ke tubaka masolo ya lokumu.'
  },
  hero_cta_book: { fr: 'Réserver un événement', ln: 'Kamatá mokolo na yo', kt: 'Baka kilumbu na nge' },
  hero_cta_calendar: { fr: 'Voir le calendrier', ln: 'Tala manaka', kt: 'Tala kalandrie' },

  // Services Page
  services_title: { fr: "L'Inoubliable sur", ln: 'Makambo ya kokamwa na', kt: 'Mambu ya kuyituka na' },
  services_subtitle: { fr: 'Mesure', ln: 'Mezire', kt: 'Mezire' },
  services_desc: { 
    fr: 'Trois niveaux d\'excellence adaptés à l\'exigence de vos rêves les plus ambitieux.', 
    ln: 'Banzila misato ya kitoko mpenza mpo na kokokisa bandoto na bino ya nene.',
    kt: 'Banzila tatu ya bukitoko mpenza sambu na kulungisa bapula na beno ya nene.'
  },
  services_choose: { fr: 'Choisir ce forfait', ln: 'Pona likabo oyo', kt: 'Sola dikabu yayi' },
  
  // Sections
  excellence_badge: { fr: 'Excellence', ln: 'Kitoko mpenza', kt: 'Bukitoko mpenza' },
  vision_title: { fr: 'Une Vision', ln: 'Mata moko', kt: 'Meso mosi' },
  vision_subtitle: { fr: 'Intemporelle', ln: 'Ya libela', kt: 'Ya mvula na mvula' },
  // Contact Page
  contact_title: { fr: 'Discutons de', ln: 'Tososola likambo ya', kt: 'Tusolula diambu ya' },
  contact_subtitle: { fr: 'Votre Projet', ln: 'Misala na yo', kt: 'Bisalu na nge' },
  contact_desc: { fr: 'Une question ? Un devis ? Contactez-nous par formulaire.', ln: 'Ozali na motuna? Kamata formulaire oyo.', kt: 'Nge kele na kiuvu? Baka formulaire yayi.' },
  contact_send: { fr: 'Envoyer la demande', ln: 'Tinda losambo na yo', kt: 'Tinda kulomba na nge' },
  contact_success: { fr: 'Message Envoyé !', ln: 'Tinda malamu !', kt: 'Tinda ya mbote !' },

  // Footer
  footer_tagline: { 
    fr: '"L\'excellence n\'est pas un acte, c\'est une habitude. Nous transformons vos visions en héritages temporels à travers le Congo."', 
    ln: '"Kitoko ezali kaka mosala moko te, ezali momeseno. To bongolaka banzoto na bino na makambo ya kitoko mpo na bileko nionso na Congo."',
    kt: '"Bukitoko kele kaka kisalu mosi ve, yo kele kikalulu. Beto ke balulaka ba vizi ya beno na mambu ya kitoko sambu na ntangu yonso na Congo."'
  },
  footer_nav: { fr: 'Navigation', ln: 'Banzila', kt: 'Banzila' },
  footer_offices: { fr: 'Bureaux', ln: 'Biro', kt: 'Biro' },
  footer_inspiration: { fr: 'Inspiration', ln: 'Mata ya sika', kt: 'Meso ya mpa' },
  footer_newsletter: { fr: 'Abonnez-vous pour recevoir les coulisses.', ln: 'Tia nkombo mpo na kozua sango.', kt: 'Tula zina sambu na kubaka nsangu.' },
  footer_rights: { fr: 'Tous droits réservés', ln: 'Makoki nionso ebombami', kt: 'Banzila yonso ya kutanina' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
