
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, School, Laptop, AlertTriangle, Users, 
  Smartphone, Instagram, Zap, Sparkles, CheckCircle, 
  Heart, Hand, Brain, MessageSquare, Bot 
} from 'lucide-react';
// Fix: Use namespace import for Link
import * as Router from 'react-router-dom';
const { Link } = Router as any;
import { AnimatedCounter } from '../components/AnimatedCounter';

// Fix: Cast motion components to any to bypass property errors
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;
const AnyAnimatePresence = AnimatePresence as any;

const ParticleBg = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <MotionDiv
        key={i}
        className="absolute w-2 h-2 rounded-full bg-[#f03c2e]"
        initial={{ 
          x: Math.random() * 100 + "%", 
          y: Math.random() * 100 + "%", 
          scale: Math.random() * 0.5 + 0.5 
        }}
        animate={{ 
          y: [null, "-20%", "120%"],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: Math.random() * 10 + 10, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 10
        }}
      />
    ))}
  </div>
);

const Hero = () => {
  const [returningUser, setReturningUser] = useState<string | null>(null);

  useEffect(() => {
    const lastUser = localStorage.getItem('acadup_last_user_name');
    const currentUser = localStorage.getItem('acadup_user');
    if (lastUser && !currentUser) {
      setReturningUser(lastUser);
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 mesh-gradient">
      <ParticleBg />
      <div className="container mx-auto text-center relative z-10">
        <AnyAnimatePresence>
          {returningUser && (
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center justify-center gap-3 text-[#0b1c2e] font-display font-bold text-xl md:text-2xl"
            >
              <Hand className="text-[#f03c2e] animate-bounce" size={24} />
              Welcome back, {returningUser}!
            </MotionDiv>
          )}
        </AnyAnimatePresence>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#f03c2e]/10 text-[#f03c2e] px-6 py-2 rounded-full text-sm font-bold mb-8 border border-[#f03c2e]/20 tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f03c2e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f03c2e]"></span>
          </span>
          REDEFINING EDUCATION IN UP & BIHAR
        </MotionDiv>
        
        <MotionH1 
          className="text-5xl md:text-8xl font-display font-bold text-[#0b1c2e] mb-8 tracking-tighter max-w-5xl mx-auto leading-[1.1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1c2e] to-[#f03c2e]">Without Borders</span>
        </MotionH1>

        <MotionP 
          className="text-lg md:text-2xl text-[#2d3436]/80 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Bringing Kota-level coaching to every student in Tier 2/3 cities through an integrated ecosystem of Schools, Physical Centers, and Digital Learning.
        </MotionP>

        <MotionDiv 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/model" className="bg-[#f03c2e] text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl shadow-[#f03c2e]/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
            Start Your Journey <ArrowRight size={20} />
          </Link>
          <Link to="/auth?role=investor" className="bg-white text-[#0b1c2e] border-2 border-[#0b1c2e] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#0b1c2e] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-[#0b1c2e]/5">
            Partner With Us
          </Link>
        </MotionDiv>

        <MotionDiv 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono font-bold text-[#0b1c2e] mb-2 tracking-tighter">
              <AnimatedCounter value={350000} suffix="+" />
            </span>
            <span className="text-[#2d3436]/60 font-bold uppercase tracking-widest text-[10px]">Unorganized Schools</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono font-bold text-[#f03c2e] mb-2 tracking-tighter">
              <AnimatedCounter value={37} suffix="Cr" />
            </span>
            <span className="text-[#2d3436]/60 font-bold uppercase tracking-widest text-[10px]">Population Pool</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono font-bold text-[#00b894] mb-2 tracking-tighter">
              <AnimatedCounter value={1} suffix="Cr+" />
            </span>
            <span className="text-[#2d3436]/60 font-bold uppercase tracking-widest text-[10px]">Annual Students</span>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const problems = [
    { icon: AlertTriangle, title: "School Gap", desc: "No competitive resources locally." },
    { icon: School, title: "Location Gap", desc: "Forced migration to hubs." },
    { icon: Users, title: "Quality Gap", desc: "Lack of expert mentorship." },
    { icon: Laptop, title: "Flexibility Gap", desc: "Rigid balance of school/prep." },
  ];

  const solutions = [
    { title: "SIP (B2B)", type: "School Integration", desc: "Transforming schools into coaching hubs with our curriculum.", color: "bg-[#0b1c2e]", icon: School },
    { title: "ALC (Offline)", type: "Learning Centers", desc: "Tech-enabled physical classrooms within walking distance.", color: "bg-[#f03c2e]", icon: Users },
    { title: "Digital (Online)", type: "The Platform", desc: "Adaptive learning app with personalized rank forecasting.", color: "bg-[#00b894]", icon: Laptop },
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <span className="text-[#f03c2e] font-bold uppercase tracking-widest text-sm mb-4 block text-center lg:text-left">The Context</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b1c2e] mb-12 tracking-tight leading-tight text-center lg:text-left">Breaking the Cycle of Educational Limitation</h2>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {problems.map((prob, i) => (
                <MotionDiv 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#faf8f5] border border-[#2d3436]/5 hover:border-[#f03c2e]/20 hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#f03c2e]/5 rounded-bl-[2rem] group-hover:scale-110 transition-transform" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 sm:mb-6 group-hover:bg-[#f03c2e] group-hover:text-white transition-all">
                      <prob.icon className="text-[#f03c2e] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <h4 className="font-display font-bold text-sm sm:text-xl mb-1 sm:mb-3 text-[#0b1c2e] leading-tight">{prob.title}</h4>
                    <p className="text-[#2d3436]/70 leading-relaxed font-medium text-[10px] sm:text-base">{prob.desc}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>

          <div className="relative py-8 md:py-12 px-2 md:px-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c2e]/5 to-[#f03c2e]/5 rounded-[2.5rem] md:rounded-[4rem] border border-[#0b1c2e]/5 -z-10" />
            
            <div className="relative z-10 grid gap-3 md:gap-6">
              <h3 className="text-xl md:text-2xl font-display font-bold text-[#0b1c2e] mb-4 flex items-center gap-3 justify-center lg:justify-start">
                <span className="w-8 md:w-16 h-1 bg-[#f03c2e] rounded-full"></span> The Triple-Threat
              </h3>
              
              {solutions.map((sol, i) => (
                <MotionDiv 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(255,255,255,1)",
                    boxShadow: "0 10px 30px -10px rgba(11, 28, 46, 0.1)"
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex items-center gap-4 md:gap-6 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white/95 backdrop-blur-sm shadow-md md:shadow-xl shadow-[#0b1c2e]/5 border-l-[3px] md:border-l-8 transition-all duration-300 group cursor-pointer
                    ${hoveredIndex === i ? 'border-l-[#f03c2e]' : 'border-l-[#0b1c2e]'}
                    ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-50 grayscale-[0.3] scale-[0.98]' : 'opacity-100'}
                  `}
                >
                  <MotionDiv 
                    animate={{ 
                      scale: hoveredIndex === i ? 1.1 : 1
                    }}
                    className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl ${sol.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <sol.icon size={18} className="md:w-7 md:h-7" />
                  </MotionDiv>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                      <span className="text-[7px] md:text-[9px] font-bold text-[#f03c2e] uppercase tracking-widest">
                        {sol.type}
                      </span>
                    </div>
                    <h4 className="text-sm md:text-xl font-display font-bold text-[#0b1c2e] tracking-tight group-hover:text-[#f03c2e] transition-colors">{sol.title}</h4>
                    <p className="text-[#2d3436]/70 font-medium text-[10px] md:text-base leading-tight md:leading-relaxed line-clamp-2 md:line-clamp-none">
                      {sol.desc}
                    </p>
                  </div>
                  
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-[#0b1c2e]/20" />
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-350, 350], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-350, 350], [-15, 15]), springConfig);
  
  const shadowX = useTransform(mouseX, [-350, 350], [30, -30]);
  const shadowY = useTransform(mouseY, [-350, 350], [30, -30]);
  const glareX = useTransform(mouseX, [-350, 350], [0, 100]);
  const glareY = useTransform(mouseY, [-350, 350], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const segments = [
    { 
      id: "sip",
      title: "School Integration", 
      short: "SIP",
      icon: School, 
      color: "#0b1c2e", 
      tag: "STRATEGIC ASSET",
      desc: "Revolutionizing local schools into competitive hubs. We remove the need for migration to Kota.",
    },
    { 
      id: "alc",
      title: "Learning Centers", 
      short: "ALC",
      icon: Users, 
      color: "#f03c2e", 
      tag: "NEIGHBORHOOD HUB",
      desc: "Tech-enabled physical spaces for doubt clearing and focused self-study. Designed for safety.",
    },
    { 
      id: "digital",
      title: "Digital Engine", 
      short: "Platform",
      icon: Laptop, 
      color: "#00b894", 
      tag: "PERSONALIZED AI",
      desc: "Proprietary rank-forecasting and Weakness Hunter algorithms tailored for Tier 2/3 pedagogy.",
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#faf8f5] overflow-hidden relative min-h-[850px] md:min-h-[1100px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-12 relative z-30">
          <span className="text-[#f03c2e] font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">Unified Ecosystem</span>
          <h2 className="text-5xl md:text-8xl font-display font-bold text-[#0b1c2e] tracking-tighter">The AcadUp OS</h2>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[450px] md:h-[650px] w-full flex items-center justify-center [perspective:2000px] md:[perspective:3000px]"
        >
          {!isMobile && (
            <MotionDiv 
              style={{ rotateX: 75, translateZ: -400, opacity: 0.1 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="w-full h-full bg-[linear-gradient(rgba(11,28,46,0.3)_2px,transparent_2px),linear-gradient(90deg,rgba(11,28,46,0.3)_2px,transparent_2px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            </MotionDiv>
          )}

          <div className="relative w-full max-w-5xl h-full flex items-center justify-center [transform-style:preserve-3d]">
            {segments.map((seg, i) => {
              const isActive = activeIndex === i;
              const offset = i - activeIndex;
              const zIndex = isActive ? 100 : 50 - Math.abs(offset) * 10;
              
              return (
                <MotionDiv
                  key={seg.id}
                  initial={false}
                  animate={{
                    x: isMobile ? offset * 250 : offset * 380,
                    z: isActive ? (isMobile ? 350 : 450) : -600,
                    rotateY: isActive ? 0 : (offset * -35),
                    scale: isActive ? (isMobile ? 1.1 : 1.25) : (isMobile ? 0.75 : 0.75),
                    opacity: isActive ? 1 : (isMobile ? 0.3 : 0.2),
                  }}
                  style={{ 
                    rotateX: isActive ? rotateX : 0, 
                    rotateY: isActive ? rotateY : (offset * -35),
                    backgroundColor: seg.color,
                    zIndex: zIndex
                  }}
                  transition={springConfig}
                  className={`absolute w-[280px] md:w-[400px] h-[400px] md:h-[520px] cursor-pointer rounded-[3rem] md:rounded-[4rem] flex flex-col items-center justify-between p-8 md:p-12 text-center border-[6px] md:border-[8px] border-white/95 overflow-hidden [transform-style:preserve-3d] transition-shadow shadow-2xl shadow-black/20`}
                  onClick={() => setActiveIndex(i)}
                >
                  {isActive && !isMobile && (
                    <MotionDiv 
                      style={{ x: shadowX, y: shadowY, translateZ: -100, filter: 'blur(40px)' }}
                      className="absolute inset-0 bg-black/40 rounded-[4.5rem] -z-10 scale-90"
                    />
                  )}

                  {isActive && !isMobile && (
                    <MotionDiv 
                      style={{ 
                        background: useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, transparent 70%)`)
                      }}
                      className="absolute inset-0 pointer-events-none z-20"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0" />

                  <MotionDiv 
                    style={{ translateZ: isActive ? (isMobile ? 80 : 150) : 30 }} 
                    className="flex flex-col items-center gap-4 md:gap-8 relative z-30"
                  >
                    <MotionDiv 
                      animate={{ y: isActive ? [0, -6, 0] : 0 }}
                      className="p-4 md:p-7 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/20 backdrop-blur-3xl border border-white/40 shadow-xl"
                    >
                      <seg.icon size={isMobile ? 48 : 64} className="text-white drop-shadow-2xl" />
                    </MotionDiv>
                    <div className="[transform-style:preserve-3d]">
                      <span className="text-[8px] md:text-[9px] font-bold tracking-[0.4em] text-white/60 uppercase mb-2 md:mb-3 block">{seg.tag}</span>
                      <h3 className="text-white font-display font-bold text-2xl md:text-4xl leading-tight tracking-tighter drop-shadow-2xl">
                        {seg.title}
                      </h3>
                    </div>
                  </MotionDiv>

                  <MotionDiv style={{ translateZ: isActive ? (isMobile ? 60 : 100) : 15 }} className="w-full relative z-30">
                    <AnyAnimatePresence mode="wait">
                      {isActive && (
                        <MotionDiv
                          key={seg.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                        >
                          <p className="text-white/85 text-xs md:text-lg leading-relaxed font-medium mb-6 md:mb-10 max-w-[220px] md:max-w-[320px] mx-auto">
                            {seg.desc}
                          </p>
                          <Link 
                            to="/model" 
                            className="bg-white text-[#0b1c2e] px-6 md:px-12 py-3 md:py-5 rounded-full text-[9px] md:text-sm font-bold uppercase tracking-widest hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-4 mx-auto shadow-2xl"
                          >
                            Explore <ArrowRight size={isMobile ? 12 : 16} />
                          </Link>
                        </MotionDiv>
                      )}
                    </AnyAnimatePresence>
                  </MotionDiv>

                  <MotionDiv 
                    style={{ translateZ: -100 }} 
                    className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-[6rem] md:text-[12rem] font-bold text-white/5 select-none tracking-tighter leading-none pointer-events-none"
                  >
                    0{i + 1}
                  </MotionDiv>
                </MotionDiv>
              );
            })}
          </div>
        </div>

        <div className="mt-16 md:mt-24 relative z-30">
          <div className="max-w-sm md:max-w-2xl mx-auto p-1.5 md:p-2 bg-white rounded-full shadow-xl border border-black/5 flex relative overflow-hidden">
            <MotionDiv 
              className="absolute inset-y-1.5 md:inset-y-2 left-1.5 md:left-2 rounded-full z-0"
              initial={false}
              animate={{ 
                x: activeIndex * 100 + "%", 
                width: "calc(100% / 3 - 6px)", 
                backgroundColor: segments[activeIndex].color 
              }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            />
            {segments.map((seg, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative z-10 flex-1 py-3 md:py-4 px-3 md:px-6 rounded-full text-[10px] md:text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${activeIndex === i ? 'text-white' : 'text-[#0b1c2e]/40 hover:text-[#0b1c2e]'}`}
              >
                <seg.icon size={isMobile ? 14 : 18} />
                <span className="uppercase tracking-widest">{seg.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AIPromotionBanner = () => {
  return (
    <section className="py-24 relative overflow-hidden group">
      <div className="container mx-auto px-6">
        <MotionDiv 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0b1c2e] rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 overflow-hidden shadow-[0_50px_100px_-20px_rgba(11,28,46,0.3)] border border-white/5"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <MotionDiv 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/4 w-full h-full border border-white/10 rounded-full" 
            />
            <MotionDiv 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/2 -right-1/4 w-full h-full border border-[#f03c2e]/20 rounded-full" 
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <MotionDiv 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 bg-[#f03c2e]/10 border border-[#f03c2e]/20 px-6 py-2 rounded-full mb-8"
              >
                <Sparkles size={16} className="text-[#f03c2e]" />
                <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">AI-Powered Pedagogy</span>
              </MotionDiv>
              
              <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.95]">
                Stuck on a <span className="text-[#f03c2e]">Doubt</span>? <br />
                Ask Your AI Mentor.
              </h2>
              
              <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed mb-12 max-w-xl">
                Get instant, verified solutions for JEE, NEET, and Boards. Our AI engine doesn't just give answers—it builds concepts.
              </p>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <Link to="/studio">
                  <MotionButton 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-[#0b1c2e] px-12 py-6 rounded-[2rem] font-bold text-sm uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-[#f03c2e] hover:text-white transition-all group/btn"
                  >
                    <Brain size={20} className="group-hover/btn:animate-pulse" /> Try AI Studio Now
                  </MotionButton>
                </Link>
                
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0b1c2e] flex items-center justify-center text-[10px] font-bold text-white">
                        <Users size={12} />
                      </div>
                    ))}
                  </div>
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em]">Used by 10k+ Daily</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <MotionDiv 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-14 shadow-3xl"
              >
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f03c2e] flex items-center justify-center text-white">
                      <MessageSquare size={24} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Bot className="text-[#00b894]" size={20} />
                      <span className="text-[10px] font-bold text-[#00b894] uppercase tracking-widest">AcadUp AI Brain</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-[#00b894]/10 rounded-full" />
                      <div className="h-3 w-5/6 bg-[#00b894]/5 rounded-full" />
                      <div className="h-3 w-4/6 bg-[#00b894]/5 rounded-full" />
                    </div>
                    <div className="pt-4">
                      <div className="w-full aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                        <Zap size={24} className="text-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                <MotionDiv 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-24 h-24 bg-[#00b894] rounded-3xl flex items-center justify-center shadow-2xl z-20"
                >
                  <CheckCircle className="text-white" size={32} />
                </MotionDiv>
                
                <MotionDiv 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#f03c2e] rounded-2xl flex items-center justify-center shadow-2xl z-20"
                >
                  <Sparkles className="text-white" size={24} />
                </MotionDiv>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <ProblemSolution />
      <Philosophy />
      
      <AIPromotionBanner />

      <section className="py-24 bg-[#0b1c2e]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-mono font-bold text-white mb-3 tracking-tighter">95k</h3>
              <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Schools</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-mono font-bold text-[#f03c2e] mb-3 tracking-tighter">₹70Cr</h3>
              <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Revenue</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-mono font-bold text-[#00b894] mb-3 tracking-tighter">24k</h3>
              <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">High Value</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-mono font-bold text-white mb-3 tracking-tighter">40%</h3>
              <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Savings</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 bg-white text-center">
        <div className="container mx-auto px-6">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-7xl font-display font-bold text-[#0b1c2e] mb-12 tracking-tighter leading-tight">
              A Future Designed <br /> for <span className="text-[#f03c2e]">Bharat</span>.
            </h2>
            <div className="w-24 h-2 bg-[#0b1c2e] mx-auto rounded-full mb-12" />
            <p className="text-xl md:text-3xl text-[#2d3436]/40 font-medium leading-relaxed italic">
              "We aren't just building a company; we are building the intellectual backbone of India's most underserved regions."
            </p>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};
