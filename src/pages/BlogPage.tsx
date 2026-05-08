import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    title: 'Tendances Mariage 2024 à Brazzaville',
    excerpt: 'Découvrez les couleurs et styles qui feront fureur cette année pour vos cérémonies au Congo.',
    date: '15 Mars 2024',
    author: 'Franck',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Comment choisir son matériel de décoration ?',
    excerpt: 'Quelques conseils essentiels pour ne rien oublier lors de la location de votre matériel.',
    date: '10 Mars 2024',
    author: 'Equipe Franck Events',
    img: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: "Retour sur notre rencontre Entrepreneurs",
    excerpt: "Un moment d'échange exceptionnel entre entrepreneurs francophones à Brazzaville.",
    date: '02 Mars 2024',
    author: 'Franck',
    img: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1000'
  }
];

export function BlogPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 space-y-6">
          <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Blog</span>
          <h1 className="text-5xl md:text-7xl font-serif">Actus & Inspiration</h1>
          <p className="text-xl text-[#666] max-w-xl font-light">
            Conseils, tendances et retours sur nos derniers événements.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[30px] mb-8 relative">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Inspiration
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-xs text-[#999] uppercase tracking-widest">
                  <div className="flex items-center space-x-1"><Calendar size={12} /> <span>{post.date}</span></div>
                  <div className="flex items-center space-x-1"><User size={12} /> <span>{post.author}</span></div>
                </div>
                <h2 className="text-2xl font-serif font-bold group-hover:text-[#D4AF37] transition-colors">{post.title}</h2>
                <p className="text-[#666] font-light leading-relaxed">{post.excerpt}</p>
                <div className="pt-4 flex items-center text-xs font-bold uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                  Lire la suite <ArrowRight className="ml-2" size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
