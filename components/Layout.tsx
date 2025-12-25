
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { ROUTES, COLORS } from '../constants';

const AcadUpLogo = ({ className = "h-10", light = false }: { className?: string; light?: boolean }) => (
  <svg viewBox="0 0 180 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="acadup-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#801020" />
        <stop offset="100%" stopColor="#f03c2e" />
      </linearGradient>
    </defs>
    <text 
      x="0" 
      y="45" 
      fontFamily="Poppins, sans-serif" 
      fontWeight="900" 
      fontSize="42" 
      fill={light ? "white" : "#0b1c2e"}
      style={{ letterSpacing: '-0.04em' }}
    >
      Acad
    </text>
    <text 
      x="108" 
      y="45" 
      fontFamily="Poppins, sans-serif" 
      fontWeight="900" 
      fontSize="42" 
      fill="url(#acadup-gradient)"
      style={{ letterSpacing: '-0.04em' }}
    >
      Up
    </text>
  </svg>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'The Vision', path: ROUTES.HOME },
    { name: 'How It Works', path: ROUTES.MODEL },
    { name: 'Our Impact', path: ROUTES.IMPACT },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 glass shadow-sm' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center group transition-transform hover:scale-105 active:scale-95">
            <AcadUpLogo className="h-10 md:h-14" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-bold relative group transition-colors ${
                  location.pathname === link.path ? 'text-[#f03c2e]' : 'text-[#2d3436] hover:text-[#f03c2e]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#f03c2e] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <Link 
              to="/impact" 
              className="bg-[#0b1c2e] text-white px-10 py-3.5 rounded-full text-sm font-black hover:bg-[#153a6b] transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#0b1c2e]/20"
            >
              Partner With Us
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-[#0b1c2e] p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2d3436]/5">
           <motion.div 
            className="h-full bg-[#f03c2e] origin-left"
            style={{ scaleX: 0 }}
            id="scroll-progress"
          />
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-[#0b1c2e] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-16">
              <AcadUpLogo className="h-10" light />
              <button 
                className="text-white p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={36} />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className="text-5xl font-black text-white hover:text-[#f03c2e] transition-colors tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <button className="bg-[#f03c2e] text-white py-6 rounded-2xl text-2xl font-black flex items-center justify-center gap-3 shadow-2xl">
                Start Revolution <ArrowRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1c2e] text-white py-24 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-10">
              <AcadUpLogo className="h-10" light />
            </Link>
            <p className="text-white/70 mb-10 max-w-xs leading-relaxed font-medium text-lg">
              Democratizing high-quality coaching for the heartland of India. Bridging gaps through technology and local accessibility.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#f03c2e] hover:border-[#f03c2e] transition-all"><Twitter size={24} /></a>
              <a href="#" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#f03c2e] hover:border-[#f03c2e] transition-all"><Linkedin size={24} /></a>
              <a href="#" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#f03c2e] hover:border-[#f03c2e] transition-all"><MessageCircle size={24} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-2xl mb-10 tracking-tight">The Model</h4>
            <ul className="space-y-5 text-white/60 text-lg">
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">School Integration (SIP)</Link></li>
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">Learning Centers (ALC)</Link></li>
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">Digital Platform</Link></li>
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">Tech Engine</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-2xl mb-10 tracking-tight">Our Reach</h4>
            <ul className="space-y-5 text-white/60 text-lg">
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">UP & Bihar Strategy</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">Golden Corridor</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">Student Stories</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">Expansion Map</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-2xl mb-10 tracking-tight">Join Us</h4>
            <p className="text-white/60 mb-8 font-medium text-lg">Subscribe for regional updates.</p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 flex-1 focus:outline-none focus:border-[#f03c2e] transition-colors"
              />
              <button className="bg-[#f03c2e] px-8 py-4 rounded-2xl font-black hover:bg-[#e05a2b] transition-all transform active:scale-95 shadow-xl shadow-[#f03c2e]/20">
                Go
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/30 text-base font-medium">© 2024 AcadUp EdTech Private Limited. All rights reserved.</p>
          <div className="flex gap-10 text-white/30 text-base font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = document.getElementById('scroll-progress');
      if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden antialiased bg-[#faf8f5]">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
