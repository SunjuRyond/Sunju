
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, School, Laptop, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from '../components/AnimatedCounter';

const ParticleBg = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
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
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6 mesh-gradient">
      <ParticleBg />
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#f03c2e]/10 text-[#f03c2e] px-6 py-2 rounded-full text-sm font-black mb-8 border border-[#f03c2e]/20 tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f03c2e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f03c2e]"></span>
          </span>
          REDEFINING EDUCATION IN UP & BIHAR
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-display font-black text-[#0b1c2e] mb-8 tracking-tighter max-w-5xl mx-auto leading-[1.1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1c2e] to-[#f03c2e]">Without Borders</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-[#2d3436]/80 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Bringing Kota-level coaching to every student in Tier 2/3 cities through an integrated ecosystem of Schools, Physical Centers, and Digital Learning.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/model" className="bg-[#f03c2e] text-white px-10 py-5 rounded-full text-lg font-black shadow-xl shadow-[#f03c2e]/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
            Start Your Journey <ArrowRight size={20} />
          </Link>
          <Link to="/impact" className="bg-white text-[#0b1c2e] border-2 border-[#0b1c2e] px-10 py-5 rounded-full text-lg font-black hover:bg-[#0b1c2e] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-[#0b1c2e]/5">
            Partner With Us
          </Link>
        </motion.div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono font-black text-[#0b1c2e] mb-2 tracking-tighter">
              <AnimatedCounter value={350000} suffix="+" />
            </span>
            <span className="text-[#2d3436]/60 font-black uppercase tracking-widest text-[10px]">Unorganized Schools</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono font-black text-[#f03c2e] mb-2 tracking-tighter">
              <AnimatedCounter value={37} suffix="Cr" />
            </span>
            <span className="text-[#2d3436]/60 font-black uppercase tracking-widest text-[10px]">Population Pool</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono font-black text-[#00b894] mb-2 tracking-tighter">
              <AnimatedCounter value={1} suffix="Cr+" />
            </span>
            <span className="text-[#2d3436]/60 font-black uppercase tracking-widest text-[10px]">Annual Students</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const problems = [
    { icon: AlertTriangle, title: "School Gap", desc: "Schools lack competitive resources to train students for NEET/JEE locally." },
    { icon: School, title: "Location Gap", desc: "Quality education restricted to hubs like Kota/Delhi, forcing migration." },
    { icon: Users, title: "Quality Gap", desc: "Local tuition centers lack standardized pedagogy and expert mentors." },
    { icon: Laptop, title: "Flexibility Gap", desc: "Strict schedules make it hard for students to balance school and prep." },
  ];

  const solutions = [
    { title: "SIP (B2B)", type: "School Integration", desc: "Transforming schools into coaching hubs with our curriculum.", color: "bg-[#0b1c2e]", icon: School },
    { title: "ALC (Offline)", type: "Learning Centers", desc: "Tech-enabled physical classrooms within walking distance.", color: "bg-[#f03c2e]", icon: Users },
    { title: "Digital (Online)", type: "The Platform", desc: "Adaptive learning app with personalized rank forecasting.", color: "bg-[#00b894]", icon: Laptop },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#f03c2e] font-black uppercase tracking-widest text-sm mb-4 block">The Context</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#0b1c2e] mb-12 tracking-tight leading-tight">Breaking the Cycle of Educational Limitation</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {problems.map((prob, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-[#faf8f5] border border-[#2d3436]/5 hover:shadow-2xl hover:shadow-[#2d3436]/5 transition-all group"
                >
                  <prob.icon className="text-[#f03c2e] mb-6 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-display font-black text-xl mb-3 text-[#0b1c2e]">{prob.title}</h4>
                  <p className="text-[#2d3436]/70 leading-relaxed font-medium">{prob.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative py-12 px-6 lg:px-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c2e]/5 to-[#f03c2e]/5 rounded-[4rem] border border-[#0b1c2e]/5 -z-10" />
            
            <div className="relative z-10 grid gap-8">
              <h3 className="text-2xl font-display font-black text-[#0b1c2e] mb-2 flex items-center gap-4">
                <span className="w-16 h-1.5 bg-[#f03c2e] rounded-full"></span> The Triple-Threat Solution
              </h3>
              
              {solutions.map((sol, i) => (
                <motion.div 
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
                    scale: 1.03, 
                    x: 15,
                    backgroundColor: "rgba(255,255,255,1)",
                    boxShadow: "0 25px 50px -12px rgba(11, 28, 46, 0.25)"
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex gap-8 items-start p-10 rounded-[2.5rem] bg-white/95 backdrop-blur-sm shadow-2xl shadow-[#0b1c2e]/10 border-l-8 transition-all duration-300 group cursor-pointer
                    ${hoveredIndex === i ? 'border-l-[#f03c2e]' : 'border-l-[#0b1c2e]'}
                    ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-50 grayscale-[0.5] scale-[0.98]' : 'opacity-100'}
                  `}
                >
                  <motion.div 
                    animate={{ 
                      rotate: hoveredIndex === i ? [0, -10, 10, 0] : 0,
                      scale: hoveredIndex === i ? 1.15 : 1
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`w-16 h-16 shrink-0 rounded-2xl ${sol.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <sol.icon size={28} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.span 
                        animate={{ x: hoveredIndex === i ? 5 : 0 }}
                        className="text-xs font-black text-[#f03c2e] uppercase tracking-widest"
                      >
                        {sol.type}
                      </motion.span>
                    </div>
                    <h4 className="text-2xl font-display font-black mb-3 text-[#0b1c2e] tracking-tight group-hover:text-[#f03c2e] transition-colors">{sol.title}</h4>
                    <p className="text-[#2d3436]/70 font-medium text-lg leading-relaxed">{sol.desc}</p>
                  </div>
                  
                  <motion.div 
                    animate={{ opacity: hoveredIndex === i ? 1 : 0, x: hoveredIndex === i ? 0 : -10 }}
                    className="self-center text-[#f03c2e]"
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                </motion.div>
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
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Unified spring for movement smoothness
  const springConfig = { stiffness: 120, damping: 20, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [isLocked ? 5 : 15, isLocked ? -5 : -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [isLocked ? -5 : -15, isLocked ? 5 : 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleTabSwitch = (i: number) => {
    setActiveIndex(i);
    setIsLocked(true);
    // Smoothly reset tilt when switching
    if (isLocked) {
        mouseX.set(0);
        mouseY.set(0);
    }
  };

  const segments = [
    { 
      id: "sip",
      title: "School Integration", 
      short: "SIP",
      icon: School, 
      color: "#0b1c2e", 
      tag: "STRATEGIC ASSET",
      desc: "Revolutionizing local schools into competitive hubs. We remove the need for migration to Kota, bringing national-standard faculty directly to the student's classroom.",
    },
    { 
      id: "alc",
      title: "Learning Centers", 
      short: "ALC",
      icon: Users, 
      color: "#f03c2e", 
      tag: "NEIGHBORHOOD HUB",
      desc: "Tech-enabled physical spaces for doubt clearing and focused self-study. Designed for the heartland, providing safety and community mentorship locally.",
    },
    { 
      id: "digital",
      title: "Digital Engine", 
      short: "Platform",
      icon: Laptop, 
      color: "#00b894", 
      tag: "PERSONALIZED AI",
      desc: "Proprietary rank-forecasting and 'Weakness Hunter' algorithms that map every student's unique journey with precision data analytics.",
    }
  ];

  return (
    <section className="py-32 bg-[#faf8f5] overflow-hidden relative min-h-[1050px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative z-20">
          <span className="text-[#f03c2e] font-black uppercase tracking-[0.4em] text-xs mb-4 block">Operating System</span>
          <h2 className="text-5xl md:text-7xl font-display font-black text-[#0b1c2e] tracking-tighter">The 3D Ecosystem</h2>
          
          <div className="mt-12 max-w-2xl mx-auto p-2 bg-white rounded-full shadow-2xl border border-[#0b1c2e]/5 flex relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-2 left-2 rounded-full z-0"
              initial={false}
              animate={{ 
                x: activeIndex * 100 + "%", 
                width: "calc(100% / 3 - 8px)", // Accounts for the left-2 padding
                backgroundColor: segments[activeIndex].color 
              }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            />
            {segments.map((seg, i) => (
              <button 
                key={i}
                onClick={() => handleTabSwitch(i)}
                className={`relative z-10 flex-1 py-4 px-6 rounded-full text-sm font-black transition-colors duration-300 flex items-center justify-center gap-2 ${activeIndex === i ? 'text-white' : 'text-[#0b1c2e]/40 hover:text-[#0b1c2e]'}`}
              >
                <seg.icon size={18} />
                <span className="hidden sm:inline uppercase tracking-widest">{seg.short}</span>
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative h-[650px] w-full flex items-center justify-center [perspective:2000px] ${isLocked ? 'cursor-default' : 'cursor-none'}`}
        >
          <AnimatePresence>
            {!isLocked && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
                className="absolute w-12 h-12 rounded-full border-2 border-[#f03c2e] pointer-events-none z-[100] mix-blend-difference hidden lg:flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-[#f03c2e] rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            style={{ rotateX: 75, translateZ: -200, rotateY: rotateY, x: '-50%', y: '-50%' }}
            className="absolute top-1/2 left-1/2 w-[140%] h-[140%] pointer-events-none opacity-10"
          >
            <div className="w-full h-full bg-[linear-gradient(rgba(11,28,46,0.15)_2px,transparent_2px),linear-gradient(90deg,rgba(11,28,46,0.15)_2px,transparent_2px)] bg-[size:60px_60px]" />
          </motion.div>

          <div className="relative w-full max-w-5xl h-full flex items-center justify-center [transform-style:preserve-3d]">
            {segments.map((seg, i) => {
              const isActive = activeIndex === i;
              const offset = i - activeIndex;
              // Crucial for depth - Active card must always have higher zIndex than background cards
              const zIndex = isActive ? 50 : 20 - Math.abs(offset);
              
              return (
                <motion.div
                  key={seg.id}
                  initial={false}
                  animate={{
                    x: offset * 340,
                    z: isActive ? 250 : -400,
                    rotateY: isActive ? 0 : (offset * -25),
                    scale: isActive ? 1.15 : 0.8,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  style={{ 
                    rotateX: isActive ? rotateX : 0, 
                    rotateY: isActive ? rotateY : (offset * -25),
                    backgroundColor: seg.color,
                    zIndex: zIndex
                  }}
                  transition={springConfig}
                  className={`absolute w-85 h-[500px] cursor-pointer rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-between p-12 text-center border-4 border-white overflow-hidden [transform-style:preserve-3d] group transition-shadow ${isActive && isLocked ? 'ring-8 ring-[#f03c2e]/10 shadow-[0_0_50px_rgba(240,60,46,0.2)]' : ''}`}
                  onClick={() => handleTabSwitch(i)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
                  <motion.div style={{ translateZ: 20 }} className="absolute top-0 left-0 w-full h-2 bg-white/10" />

                  <motion.div style={{ translateZ: isActive ? 80 : 20 }} className="flex flex-col items-center gap-8">
                    <motion.div 
                      animate={{ rotate: isActive ? [0, -5, 5, 0] : 0 }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="p-7 rounded-[2rem] bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl"
                    >
                      <seg.icon size={60} className="text-white" />
                    </motion.div>
                    <div>
                      <span className="text-[11px] font-black tracking-[0.4em] text-white/40 uppercase mb-3 block">{seg.tag}</span>
                      <h3 className="text-white font-black text-4xl leading-tight tracking-tighter">{seg.title}</h3>
                    </div>
                  </motion.div>

                  <motion.div style={{ translateZ: isActive ? 40 : 10 }} className="w-full">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={seg.id}
                          initial={{ opacity: 0, y: 30, translateZ: 0 }}
                          animate={{ opacity: 1, y: 0, translateZ: 20 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-white/70 text-base leading-relaxed font-medium mb-10 max-w-[240px] mx-auto">
                            {seg.desc}
                          </p>
                          <Link 
                            to="/model" 
                            onClick={(e) => isLocked && e.stopPropagation()}
                            className="bg-white text-[#0b1c2e] px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
                          >
                            Explore Model <ArrowRight size={16} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div style={{ translateZ: -50 }} className="absolute bottom-6 right-8 text-8xl font-black text-white/5 select-none tracking-tighter">
                    0{i + 1}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
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
      <section className="py-24 bg-[#0b1c2e] mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <h3 className="text-6xl font-mono font-black text-white mb-3 tracking-tighter">95k</h3>
              <p className="text-white/60 font-black text-sm uppercase tracking-widest">Unorganized Schools</p>
            </div>
            <div>
              <h3 className="text-6xl font-mono font-black text-[#f03c2e] mb-3 tracking-tighter">₹70Cr+</h3>
              <p className="text-white/60 font-black text-sm uppercase tracking-widest">Revenue Potential</p>
            </div>
            <div>
              <h3 className="text-6xl font-mono font-black text-[#00b894] mb-3 tracking-tighter">24k</h3>
              <p className="text-white/60 font-black text-sm uppercase tracking-widest">High-Value Targets</p>
            </div>
            <div>
              <h3 className="text-6xl font-mono font-black text-white mb-3 tracking-tighter">40%</h3>
              <p className="text-white/60 font-black text-sm uppercase tracking-widest">Cost Savings vs Kota</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
