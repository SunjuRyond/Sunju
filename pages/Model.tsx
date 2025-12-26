
import React, { useState } from 'react';
// Fix: Import Variants as a type
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Check, X, Smartphone, School, Building, 
  ArrowRight, Wallet, Activity, TrendingUp, 
  Users, Instagram, Heart, Zap, ShieldCheck,
  LayoutGrid, Layers, Cpu
} from 'lucide-react';
import { COMPARISON_DATA } from '../constants';

// Fix: Cast motion components to any to bypass property errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;
const AnyAnimatePresence = AnimatePresence as any;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const TripleThreatShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'sip',
      title: 'School Integration',
      short: 'SIP',
      icon: School,
      color: '#0b1c2e',
      accent: '#f03c2e',
      desc: 'We transform existing schools into competitive coaching powerhouses. By integrating Kota-level faculty into regular school hours, we eliminate the need for costly and stressful migration.',
      features: [
        "Top faculty during school hours",
        "Hybrid classroom infrastructure",
        "Synchronized board & JEE/NEET prep",
        "School branding & revenue sharing"
      ]
    },
    {
      id: 'alc',
      title: 'Learning Centers',
      short: 'ALC',
      icon: Building,
      color: '#f03c2e',
      accent: '#0b1c2e',
      desc: 'Our tech-enabled neighborhood hubs provide a safe, focused environment for self-study and real-time doubt clearing. We bring physical accountability to the digital learning journey.',
      features: [
        "Tech-enabled neighborhood hubs",
        "Personalized doubt resolution",
        "Safe, supervised self-study",
        "Local mentor mentorship"
      ]
    },
    {
      id: 'digital',
      title: 'Digital Platform',
      short: 'APP',
      icon: Smartphone,
      color: '#00b894',
      accent: '#0b1c2e',
      desc: 'The backbone of our ecosystem. Our proprietary algorithms predict ranks and hunt weaknesses, ensuring every minute of study is focused on the highest-yield improvement areas.',
      features: [
        "Adaptive Rank Forecaster",
        "Weakness Hunter algorithm",
        "Daily practice & testing",
        "Parent monitoring dashboard"
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-4 lg:p-10 shadow-2xl border border-black/5 overflow-hidden">
        
        {/* Modern Tab Switcher - Segmented Style on Mobile */}
        <div className="lg:w-1/3 flex lg:flex-col p-1.5 lg:p-3 bg-[#faf8f5] rounded-3xl lg:rounded-[2.5rem] border border-black/5 h-fit gap-1 lg:gap-3">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`flex flex-1 lg:flex-none items-center justify-center lg:justify-start gap-2 lg:gap-4 p-3 lg:p-5 rounded-2xl lg:rounded-[2rem] transition-all duration-500 relative overflow-hidden group ${
                  isActive ? 'bg-[#0b1c2e] text-white shadow-lg' : 'text-[#0b1c2e]/40 hover:bg-black/5'
                }`}
              >
                <div className={`p-2 lg:p-3 rounded-xl lg:rounded-2xl transition-all duration-500 ${isActive ? 'bg-white/10' : 'bg-white shadow-sm group-hover:scale-110'}`}>
                  <tab.icon size={16} className={isActive ? 'text-white' : 'text-[#0b1c2e]'} />
                </div>
                <div className="text-left">
                  <p className={`text-[7px] lg:text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5 hidden lg:block ${isActive ? 'text-white/40' : 'text-[#0b1c2e]/20'}`}>Segment 0{idx + 1}</p>
                  <p className="font-display font-bold text-[10px] lg:text-sm tracking-tight whitespace-nowrap">{tab.title}</p>
                </div>
                {isActive && (
                  <MotionDiv 
                    layoutId="active-indicator"
                    className="absolute bottom-0 lg:bottom-auto lg:right-0 left-0 lg:left-auto w-full lg:w-1 h-1 lg:h-full bg-[#f03c2e]" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Display - Optimized for Mobile Space */}
        <div className="lg:w-2/3 flex flex-col min-h-[350px] lg:min-h-[400px]">
          <AnyAnimatePresence mode="wait">
            <MotionDiv
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="p-2 lg:p-0">
                <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-3xl flex items-center justify-center text-white shadow-xl relative overflow-hidden" style={{ backgroundColor: tabs[activeTab].color }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    {React.createElement(tabs[activeTab].icon, { size: 24, className: "relative z-10 lg:w-8 lg:h-8" })}
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-4xl font-display font-bold text-[#0b1c2e] tracking-tighter">
                      {tabs[activeTab].title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5 lg:mt-1">
                      <Zap size={10} className="text-[#f03c2e] lg:w-3 lg:h-3" />
                      <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-black/30">Integrated Solution Active</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm lg:text-xl text-[#2d3436]/60 leading-relaxed font-medium mb-6 lg:mb-10 max-w-2xl">
                  {tabs[activeTab].desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  {tabs[activeTab].features.map((feat, i) => (
                    <MotionDiv 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 lg:gap-4 p-4 lg:p-5 bg-[#faf8f5] rounded-xl lg:rounded-2xl border border-black/5 group hover:border-[#f03c2e]/20 hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-white flex items-center justify-center text-[#00b894] shadow-sm group-hover:bg-[#00b894] group-hover:text-white transition-all">
                        <Check size={12} className="lg:w-4 lg:h-4" />
                      </div>
                      <span className="text-xs lg:text-sm font-bold text-[#0b1c2e]">{feat}</span>
                    </MotionDiv>
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6 border-t border-black/5 pt-6 lg:pt-8">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white bg-[#faf8f5] flex items-center justify-center text-[8px] lg:text-[10px] font-bold text-[#0b1c2e]/40">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-black/30">Verified Ecosystem Component</span>
                </div>
                <button 
                  className="w-full sm:w-auto px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-[11px] lg:text-sm uppercase tracking-widest flex items-center justify-center gap-2 lg:gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg lg:shadow-xl"
                  style={{ backgroundColor: tabs[activeTab].color, color: 'white' }}
                >
                  Explore Details <ArrowRight size={14} className="lg:w-4 lg:h-4" />
                </button>
              </div>
            </motion.div>
          </AnyAnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ComparisonMatrix = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b-2 border-[#1a4d8f]/10">
            <th className="py-6 font-display text-xl text-[#1a4d8f]">Comparison Feature</th>
            <th className="py-6 font-display text-xl text-[#ff6b35]">AcadUp</th>
            <th className="py-6 font-display text-xl text-[#2d3436]/40">Competitors</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2d3436]/5">
          {COMPARISON_DATA.map((row, i) => (
            <tr key={i} className="hover:bg-[#faf8f5] transition-colors group">
              <td className="py-5 font-semibold text-[#2d3436] group-hover:text-[#1a4d8f] transition-colors">{row.feature}</td>
              <td className="py-5">
                {typeof row.acadup === 'boolean' ? (
                  row.acadup ? <Check className="text-[#00b894]" /> : <X className="text-[#ff6b35]" />
                ) : (
                  <span className="font-mono font-bold text-[#ff6b35]">{row.acadup}</span>
                )}
              </td>
              <td className="py-5">
                {typeof row.others === 'boolean' ? (
                  row.others ? <Check className="text-[#2d3436]/20" /> : <X className="text-[#ff6b35]/20" />
                ) : (
                  <span className="text-[#2d3436]/40">{row.others}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SocialPromotion = () => {
  const triggerSocial = () => {
    window.dispatchEvent(new Event('trigger-pwa-install'));
  };

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-[#0b1c2e] rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-[0_50px_100px_-20px_rgba(11,28,46,0.13)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ee2a7b]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6228d7]/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <div className="flex-1 text-center lg:text-left relative z-10">
            <MotionDiv 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8"
            >
              <Instagram size={16} className="text-[#ee2a7b]" />
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Join Our Community</span>
            </MotionDiv>
            
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter leading-[0.9]">
              Connect <br /> <span className="text-[#ee2a7b]">with</span> AcadUp.
            </h2>
            
            <p className="text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-12 max-w-xl">
              Get the latest updates, toppers' strategies, and quick academic tips daily on our Instagram journey.
            </p>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <MotionButton 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerSocial}
                className="bg-white text-[#0b1c2e] px-12 py-6 rounded-3xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl hover:bg-gradient-to-r hover:from-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all"
              >
                <Instagram size={20} /> Follow us on Instagram
              </MotionButton>
              
              <div className="flex -space-x-3 items-center">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0b1c2e] bg-[#2d3436] flex items-center justify-center text-[10px] font-bold text-white/50">
                    <Heart size={16} className="text-[#ee2a7b]" fill="#ee2a7b" />
                  </div>
                ))}
                <span className="pl-6 text-white/40 text-[10px] font-bold uppercase tracking-widest">50k+ Followers</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md">
            <MotionDiv 
              initial={{ rotate: 5, y: 50, opacity: 0 }}
              whileInView={{ rotate: -5, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative z-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3.5rem] p-4 shadow-3xl"
            >
              <div className="bg-white rounded-[2.8rem] overflow-hidden aspect-[9/16] relative">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] to-[#6228d7]" />
                    <div className="flex gap-2">
                       <div className="w-6 h-6 rounded-md bg-[#0b1c2e]/5" />
                       <div className="w-6 h-6 rounded-md bg-[#0b1c2e]/5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-40 bg-gray-100 rounded-3xl overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-[#ee2a7b]/10 to-transparent" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Instagram size={32} className="text-[#0b1c2e]/10" />
                       </div>
                    </div>
                    <div className="h-4 w-3/4 bg-[#0b1c2e]/5 rounded-full" />
                    <div className="h-4 w-1/2 bg-[#0b1c2e]/5 rounded-full" />
                    <div className="grid grid-cols-3 gap-2 mt-8">
                      <div className="aspect-square bg-[#0b1c2e]/5 rounded-xl" />
                      <div className="aspect-square bg-[#0b1c2e]/5 rounded-xl" />
                      <div className="aspect-square bg-[#0b1c2e]/5 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <MotionDiv 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-3xl flex items-center justify-center shadow-2xl z-30"
            >
              <Heart className="text-white" size={32} fill="white" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const marketData = [
  { region: 'Patna', students: '4.2M', capacity: '55k', height: 95 },
  { region: 'Lucknow', students: '3.8M', capacity: '60k', height: 88 },
  { region: 'Varanasi', students: '2.5M', capacity: '45k', height: 75 },
  { region: 'Kanpur', students: '3.1M', capacity: '50k', height: 82 },
  { region: 'Gorakhpur', students: '1.9M', capacity: '38k', height: 60 },
  { region: 'Prayagraj', students: '2.2M', capacity: '42k', height: 68 },
  { region: 'Muzf.', students: '1.4M', capacity: '35k', height: 48 },
  { region: 'Gaya', students: '1.2M', capacity: '32k', height: 42 },
];

export const Model = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="pt-24 pb-32 bg-white">
        <div className="container mx-auto px-6">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <span className="bg-[#f03c2e]/10 text-[#f03c2e] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block border border-[#f03c2e]/20">
              The Triple-Threat Engine
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-[#0b1c2e] mb-10 tracking-tighter leading-[1.1]">
              How We Solve <span className="text-[#f03c2e]">Tier-2/3</span>
            </h1>
            <p className="text-2xl text-[#2d3436]/60 leading-relaxed max-w-2xl mx-auto font-medium">
              We don't just provide content; we integrate with the student's daily lifecycle through a unified hybrid ecosystem.
            </p>
          </motion.div>

          {/* Redesigned Triple Threat Showcase */}
          <MotionDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <TripleThreatShowcase />
          </MotionDiv>
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="py-32 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold text-[#0b1c2e] tracking-tight">The Competitive Edge</h2>
              <p className="text-xl text-[#2d3436]/60 mt-4 font-medium">Why AcadUp dominates where others struggle.</p>
            </MotionDiv>
            
            <MotionDiv 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl shadow-[#0b1c2e]/5 border border-[#0b1c2e]/5"
            >
              <ComparisonMatrix />
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Technology Showcase Section */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#0b1c2e_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <MotionDiv 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-[#f03c2e]/10 rounded-full blur-2xl" 
              />

              <MotionDiv 
                initial={{ rotate: -2, opacity: 0, scale: 0.95 }}
                whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 glass p-8 rounded-[3rem] border border-[#0b1c2e]/10 shadow-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent,rgba(11,28,46,0.02),transparent)] h-2 w-full animate-scanline" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f03c2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00b894]" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#0b1c2e]/5 rounded-full border border-[#0b1c2e]/10">
                    <span className="w-1.5 h-1.5 bg-[#f03c2e] rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-[#0b1c2e] uppercase tracking-widest">LIVE ANALYTICS ENGINE</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#0b1c2e] p-6 rounded-3xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2 mb-3 text-white/40">
                      <Users size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">UP Target</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white tracking-tighter mb-1">3.2 Cr</div>
                  </div>
                  <div className="bg-[#f03c2e] p-6 rounded-3xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2 mb-3 text-white/40">
                      <Users size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Bihar Target</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white tracking-tighter mb-1">1.8 Cr</div>
                  </div>
                </div>

                <div className="space-y-6 pb-4">
                  <div className="flex items-end gap-2 md:gap-3 h-48 md:h-56 relative group px-2">
                    {marketData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center h-full">
                        <div className="relative flex-1 w-full flex items-end">
                          <MotionDiv 
                            initial={{ height: 0 }}
                            whileInView={{ height: `${data.height}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="w-full bg-gradient-to-t from-[#0b1c2e] to-[#f03c2e] rounded-t-lg relative group/bar cursor-pointer"
                          >
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-[#0b1c2e] text-white p-3 rounded-xl shadow-2xl whitespace-nowrap z-20 pointer-events-none border border-white/10">
                              <p className="text-[10px] font-bold text-[#f03c2e] uppercase mb-1">{data.region}</p>
                              <p className="text-[12px] font-bold">{data.students} Total Students</p>
                              <p className="text-[10px] text-[#00b894] font-semibold">Paying Cap: {data.capacity}</p>
                            </div>
                          </MotionDiv>
                        </div>
                        <span className="text-[7px] sm:text-[9px] font-bold text-[#0b1c2e]/40 mt-3 sm:rotate-0 rotate-45 origin-left whitespace-nowrap transition-colors group-hover:text-[#0b1c2e]/60">
                          {data.region}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <span className="text-[10px] font-bold text-[#2d3436]/30 uppercase tracking-[0.3em]">Market Density & Capacity Index</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div>
              <span className="text-[#00b894] font-bold uppercase tracking-widest text-sm mb-4 block">Regional Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b1c2e] mb-10 tracking-tight">Data-Driven Renaissance</h2>
              <div className="space-y-12">
                {[
                  { title: "Predictive Rank Modeling", desc: "Our AI calculates exactly where a student stands in the national pool every week using regional performance indexing." },
                  { title: "Weakness Hunter Algorithm", desc: "Automated flagging of conceptual gaps with instant remedial path generation tailored for Tier 2/3 pedagogy." },
                  { title: "Parent Live Connect", desc: "Real-time attendance, test performance, and behavioral tracking designed for transparency and accessibility." }
                ].map((item, i) => (
                  <MotionDiv 
                    key={i} 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8"
                  >
                    <div className="w-16 h-16 bg-white shadow-xl shadow-[#0b1c2e]/5 rounded-2xl flex items-center justify-center text-[#f03c2e] shrink-0 font-bold border border-[#0b1c2e]/5 text-2xl">
                      {i+1}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-2xl text-[#0b1c2e] mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-[#2d3436]/60 leading-relaxed font-medium text-lg">{item.desc}</p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(1000%); }
          }
          .animate-scanline {
            animation: scanline 3s linear infinite;
          }
        `}} />
      </section>

      {/* Relocated Social Promotion Banner */}
      <SocialPromotion />
    </div>
  );
};
