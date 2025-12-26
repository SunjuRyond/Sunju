
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Twitter, Linkedin, MessageCircle, Sparkles, UserCircle, BookOpen } from 'lucide-react';
import { ROUTES } from '../constants';
import { InstallPwaBanner } from './InstallPwaBanner';

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
      fontWeight="700" 
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
      fontWeight="700" 
      fontSize="42" 
      fill="url(#acadup-gradient)"
      style={{ letterSpacing: '-0.04em' }}
    >
      Up
    </text>
  </svg>
);

const NavButton: React.FC<{ name: string, path: string, icon?: React.ReactNode, isActive: boolean }> = ({ name, path, icon, isActive }) => {
  return (
    <Link to={path} className="relative px-5 py-2 group">
      <span className={`relative z-10 text-[13px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 flex items-center gap-2 ${
        isActive ? 'text-white' : 'text-[#0b1c2e]/60 group-hover:text-[#0b1c2e]'
      }`}>
        {icon && <span className={isActive ? 'text-white' : 'text-white'}>{icon}</span>}
        {name}
      </span>
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-[#f03c2e] rounded-full shadow-[0_10px_20px_-5px_rgba(240,60,46,0.3)]"
          transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
        />
      )}
      {!isActive && (
        <div className="absolute inset-0 bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check for user session
    const checkUser = () => {
      const stored = localStorage.getItem('acadup_user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'The Vision', path: ROUTES.HOME },
    { name: 'How It Works', path: ROUTES.MODEL },
    { name: 'AI Solutions', path: ROUTES.STUDIO, icon: <Sparkles size={14} /> },
    { name: 'Our Impact', path: ROUTES.IMPACT },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'py-4 bg-[#faf8f5]/90 backdrop-blur-2xl border-b border-black/5 shadow-sm' 
            : 'py-10 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center transition-transform hover:scale-105">
            <AcadUpLogo className="h-9 md:h-12" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center bg-white/50 p-1.5 rounded-full border border-black/[0.03] backdrop-blur-md shadow-sm gap-1">
            {navLinks.map((link) => (
              <NavButton 
                key={link.path}
                name={link.name} 
                path={link.path} 
                icon={link.icon}
                isActive={location.pathname === link.path} 
              />
            ))}
            <div className="mx-3 h-4 w-[1px] bg-black/10" />
            
            {user ? (
              <Link to={ROUTES.PROFILE} className="px-4 py-2 group flex items-center gap-3 transition-all hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-[#f03c2e] overflow-hidden border-2 border-white shadow-sm">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold">
                      {user.fullName?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b1c2e]">
                  {user.fullName?.split(' ')[0] || 'Account'}
                </span>
              </Link>
            ) : (
              <Link to={ROUTES.AUTH} className="px-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#0b1c2e]/60 hover:text-[#f03c2e] transition-colors flex items-center gap-2">
                <UserCircle size={18} /> Login
              </Link>
            )}
            
            <Link to={ROUTES.STUDIO} className="pl-1 pr-1.5">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0b1c2e] text-white px-7 py-2 rounded-full text-[13px] font-bold uppercase tracking-[0.1em] transition-all flex items-center gap-2 hover:bg-[#1a4d8f] shadow-md"
              >
                Ask AI <ArrowRight size={14} />
              </motion.div>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-[#0b1c2e] p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </motion.button>
        </div>
      </Header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-20">
              <AcadUpLogo className="h-10" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#0b1c2e]">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8 flex-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      to={link.path}
                      className={`text-4xl font-display font-bold transition-colors ${
                        isActive ? 'text-[#f03c2e]' : 'text-[#0b1c2e]/40 hover:text-[#0b1c2e]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              {user ? (
                <Link to={ROUTES.PROFILE} className="text-4xl font-display font-bold text-[#f03c2e]">My Account</Link>
              ) : (
                <Link to={ROUTES.AUTH} className="text-4xl font-display font-bold text-[#0b1c2e]/40 hover:text-[#f03c2e]">Login</Link>
              )}
            </div>

            <div className="mt-auto">
              <Link to="/studio">
                <button className="w-full bg-[#0b1c2e] text-white py-6 rounded-2xl text-xl font-bold uppercase tracking-widest shadow-xl">
                  Get AI Support
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1c2e] text-white py-24 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#801020] via-[#f03c2e] to-[#801020]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-10">
              <AcadUpLogo className="h-10" light />
            </Link>
            <p className="text-white/70 mb-10 max-w-xs leading-relaxed font-medium text-lg">
              Democratizing high-quality coaching for the heartland of India. Bridging gaps through technology and local accessibility.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:bg-[#f03c2e] hover:border-[#f03c2e] transition-all transform hover:-translate-y-1"><Twitter size={24} /></a>
              <a href="#" className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:bg-[#f03c2e] hover:border-[#f03c2e] transition-all transform hover:-translate-y-1"><Linkedin size={24} /></a>
              <a href="#" className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center hover:bg-[#f03c2e] hover:border-[#f03c2e] transition-all transform hover:-translate-y-1"><MessageCircle size={24} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-2xl mb-10 tracking-tight">The Model</h4>
            <ul className="space-y-5 text-white/60 text-lg">
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">School Integration (SIP)</Link></li>
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">Learning Centers (ALC)</Link></li>
              <li><Link to="/model" className="hover:text-white transition-colors font-medium">Digital Platform</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-2xl mb-10 tracking-tight">Our Reach</h4>
            <ul className="space-y-5 text-white/60 text-lg">
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">UP & Bihar Strategy</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">Golden Corridor</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">Student Stories</Link></li>
              <li><Link to="/impact" className="hover:text-white transition-colors font-medium">Expansion Map</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-2xl mb-10 tracking-tight">Join Us</h4>
            <p className="text-white/60 mb-8 font-medium text-lg">Subscribe for regional updates.</p>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 flex-1 focus:outline-none focus:border-[#f03c2e] transition-colors"
              />
              <button className="bg-[#f03c2e] px-8 py-4 rounded-2xl font-bold hover:bg-[#e05a2b] transition-all transform active:scale-95 shadow-xl shadow-[#f03c2e]/20">
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
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden antialiased bg-[#faf8f5]">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <InstallPwaBanner />
    </div>
  );
};
