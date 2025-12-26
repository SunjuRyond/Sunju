
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  TrendingUp, Users, MapPin, BarChart3, Quote, 
  ArrowRight, Target, Zap, Globe, LayoutGrid, 
  Layers, Sparkles, ChevronRight, Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Year 1', rev: 12 },
  { name: 'Year 2', rev: 35 },
  { name: 'Year 3', rev: 70 },
  { name: 'Year 4', rev: 150 },
  { name: 'Year 5', rev: 310 },
];

const STRATEGIC_NODES = [
  { name: 'Agra', state: 'UP', students: '450k', growth: '+22%', color: '#00b894', icon: <Target size={24} />, phase: 1 },
  { name: 'Lucknow', state: 'UP', students: '1.2M', growth: '+35%', color: '#ff6b35', icon: <Zap size={24} />, phase: 1 },
  { name: 'Prayagraj', state: 'UP', students: '850k', growth: '+18%', color: '#3b82f6', icon: <Globe size={24} />, phase: 1 },
  { name: 'Varanasi', state: 'UP', students: '950k', growth: '+28%', color: '#fbbf24', icon: <Users size={24} />, phase: 1 },
  { name: 'Patna', state: 'Bihar', students: '1.5M', growth: '+42%', color: '#f03c2e', icon: <TrendingUp size={24} />, phase: 1 },
  { name: 'Samastipur', state: 'Bihar', students: '350k', growth: '+15%', color: '#a855f7', icon: <BarChart3 size={24} />, phase: 2 },
  { name: 'Begusarai', state: 'Bihar', students: '420k', growth: '+12%', color: '#84cc16', icon: <MapPin size={24} />, phase: 2 },
];

// Explicitly typed as React.FC to allow 'key' prop in mapping
const AestheticCard: React.FC<{ node: typeof STRATEGIC_NODES[0], index: number }> = ({ node, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-white/50 rounded-[3rem] -z-10 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
      
      <div className="glass-card p-10 h-full flex flex-col rounded-[3rem] border border-white/40 overflow-hidden relative transition-all duration-500 group-hover:translate-y-[-10px] group-hover:shadow-[0_40px_80px_-20px_rgba(11,28,46,0.1)]">
        {/* Animated Glow Border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent animate-shimmer" style={{ color: node.color }} />
        </div>

        <div className="flex justify-between items-start mb-10 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -10 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: node.color }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
            <span className="relative z-10">{node.icon}</span>
          </motion.div>
          <div className="text-right">
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] block mb-1">Impact Pool</span>
            <span className="text-xl font-display font-bold text-[#0b1c2e] leading-none">{node.students}</span>
          </div>
        </div>

        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block" style={{ color: node.color }}>{node.state} HUB</span>
          <h3 className="text-4xl font-display font-bold text-[#0b1c2e] tracking-tighter leading-none mb-6 group-hover:text-[#f03c2e] transition-colors">
            {node.name}
          </h3>
          
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 inline-flex shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#00b894] animate-pulse" />
            <span className="text-[10px] font-semibold text-[#0b1c2e] uppercase tracking-widest">{node.growth} Growth</span>
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0b1c2e]/40">Active Nodes: 12</span>
          <div className="w-10 h-10 rounded-full border border-[#0b1c2e]/10 flex items-center justify-center text-[#0b1c2e] hover:bg-[#0b1c2e] hover:text-white transition-all">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NeuralRoadmap = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-24 relative">
      {/* The Glow Path */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#f03c2e]/0 via-[#f03c2e]/20 to-[#f03c2e]/0 hidden md:block">
        <motion.div 
          className="w-full h-40 bg-gradient-to-b from-transparent via-[#f03c2e] to-transparent"
          animate={{ y: ["0%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {STRATEGIC_NODES.filter(n => n.phase === 1).map((node, i) => (
        <motion.div 
          key={node.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col md:flex-row items-center gap-12 relative ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
          {/* Node Point */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
             <motion.div 
              whileInView={{ scale: [0.8, 1.2, 1] }}
              className="w-4 h-4 rounded-full bg-white border-4 border-[#0b1c2e] shadow-[0_0_20px_rgba(240,60,46,0.5)]" 
             />
          </div>

          <div className="flex-1 w-full">
            <div className="glass-card p-12 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full" style={{ backgroundColor: node.color }} />
              <h4 className="text-sm font-bold text-[#f03c2e] uppercase tracking-[0.4em] mb-4">{node.state} Intelligence Hub</h4>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-[#0b1c2e] mb-6 tracking-tight">{node.name}</h3>
              <p className="text-xl text-[#2d3436]/60 font-medium leading-relaxed max-w-md">
                Orchestrating educational logistics for over {node.students} students across {node.state}.
              </p>
            </div>
          </div>
          <div className="flex-1 hidden md:block" />
        </motion.div>
      ))}
    </div>
  );
};

export const Impact = () => {
  const [viewMode, setViewMode] = useState<'matrix' | 'roadmap'>('matrix');

  return (
    <div className="min-h-screen bg-[#faf8f5] relative overflow-hidden">
      {/* Background Glow Blobs */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="glow-blob w-[600px] h-[600px] bg-[#f03c2e]/5 top-[-300px] left-[-200px]" 
      />
      <motion.div 
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="glow-blob w-[700px] h-[700px] bg-[#0b1c2e]/5 bottom-[-300px] right-[-200px]" 
      />

      <section className="pt-48 pb-32 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-3 bg-[#0b1c2e] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-12 inline-flex items-center gap-4 shadow-2xl"
            >
              <Sparkles size={14} className="text-[#f03c2e]" /> Region of Opportunity
            </motion.div>
            
            <h1 className="text-7xl md:text-[10rem] font-display font-bold text-[#0b1c2e] mb-12 tracking-tighter leading-[0.8] shimmer-text">
              The Golden <br /> Corridor
            </h1>
            
            <p className="text-2xl md:text-3xl text-[#2d3436]/50 font-medium max-w-3xl mx-auto leading-relaxed mb-20">
              Transforming the intellectual map of Uttar Pradesh & Bihar through high-density nodal scaling.
            </p>

            <div className="inline-flex glass-card p-2 rounded-[2rem] shadow-xl border border-white/30 backdrop-blur-3xl">
              <button 
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-3 px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'matrix' ? 'bg-[#0b1c2e] text-white shadow-2xl scale-105' : 'text-[#0b1c2e]/40 hover:text-[#0b1c2e]'}`}
              >
                <LayoutGrid size={18} /> Matrix
              </button>
              <button 
                onClick={() => setViewMode('roadmap')}
                className={`flex items-center gap-3 px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'roadmap' ? 'bg-[#0b1c2e] text-white shadow-2xl scale-105' : 'text-[#0b1c2e]/40 hover:text-[#0b1c2e]'}`}
              >
                <Layers size={18} /> Roadmap
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {viewMode === 'matrix' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {STRATEGIC_NODES.map((node, i) => (
                    <AestheticCard key={node.name} node={node} index={i} />
                  ))}
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-[#0b1c2e] p-12 rounded-[3.5rem] flex flex-col justify-center text-white relative overflow-hidden group shadow-3xl"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#f03c2e]/10 rounded-bl-[10rem] group-hover:scale-125 transition-transform duration-1000" />
                    <Activity className="text-[#f03c2e] mb-10" size={48} />
                    <h4 className="text-3xl font-display font-bold mb-4 tracking-tight leading-none">Market Intelligence</h4>
                    <p className="text-white/50 mb-12 font-medium text-lg leading-relaxed">
                      Tracking 3.2M student sessions to optimize nodal capacity.
                    </p>
                    <button className="flex items-center gap-2 text-[#f03c2e] font-bold uppercase tracking-[0.3em] text-[10px] group-hover:gap-4 transition-all">
                      Open API Docs <ChevronRight size={14} />
                    </button>
                  </motion.div>
                </div>
              ) : (
                <NeuralRoadmap />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Aesthetic Stats */}
      <section className="py-20 md:py-40 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f03c2e]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="glass-card p-6 md:p-16 rounded-[2rem] md:rounded-[4rem] border border-white/50 relative z-10 overflow-hidden shadow-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-16 gap-4">
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-[#0b1c2e] tracking-tight">Growth Velocity</h3>
                  <div className="px-4 py-2 bg-[#0b1c2e]/5 rounded-full text-[10px] font-bold text-[#0b1c2e] uppercase tracking-widest border border-[#0b1c2e]/10">
                    Real-Time Index
                  </div>
                </div>

                <div className="h-[250px] md:h-[400px] w-full mb-8 md:mb-12">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="impactRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f03c2e" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f03c2e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(11,28,46,0.05)" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                          itemStyle={{ color: '#0b1c2e', fontWeight: '700' }}
                        />
                        <Area type="monotone" dataKey="rev" stroke="#f03c2e" strokeWidth={10} fillOpacity={1} fill="url(#impactRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-12 pt-8 md:pt-12 border-t border-[#0b1c2e]/5">
                  <div>
                    <span className="text-[10px] font-bold text-[#0b1c2e]/30 uppercase tracking-[0.4em] block mb-2">Target ARR</span>
                    <div className="text-3xl md:text-6xl font-display font-bold text-[#0b1c2e] tracking-tighter">₹310Cr</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[#0b1c2e]/30 uppercase tracking-[0.4em] block mb-2">CAGR Focus</span>
                    <div className="text-3xl md:text-6xl font-display font-bold text-[#f03c2e] tracking-tighter">+82%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              <div className="max-w-md">
                <span className="text-[#f03c2e] font-bold uppercase tracking-[0.5em] text-xs mb-6 block">Economies of Scale</span>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-[#0b1c2e] mb-12 tracking-tighter leading-[0.9]">
                  Efficiency <br /> By Design.
                </h2>
                <p className="text-xl md:text-2xl text-[#2d3436]/50 font-medium leading-relaxed">
                  Our nodal architecture allows us to deploy top-tier coaching centers with 70% lower CAPEX than traditional brick-and-mortar competitors.
                </p>
              </div>

              <div className="grid gap-6 md:gap-8">
                {[
                  { title: "Modular Tech Stacks", desc: "Proprietary offline/online sync protocols for unreliable internet zones." },
                  { title: "Partner Integration", desc: "Turning existing school assets into revenue-generating powerhouses." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 20 }}
                    className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/60 flex items-center gap-6 md:gap-10 transition-all duration-500"
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold text-[#0b1c2e]/10">0{i+1}</div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-display font-bold text-[#0b1c2e] mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-base md:text-lg text-[#2d3436]/40 font-medium leading-tight">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Aesthetic */}
      <section className="py-40 md:py-60 bg-[#0b1c2e] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(#f03c2e_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.05]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[12rem] font-display font-bold text-white mb-16 md:mb-24 tracking-tighter leading-[0.8] shimmer-text"
          >
            Join the <br /> Renaissance.
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto bg-[#f03c2e] text-white px-12 md:px-20 py-6 md:py-8 rounded-full text-lg md:xl font-bold uppercase tracking-[0.2em] shadow-[0_25px_50px_-12px_rgba(240,60,46,0.5)] hover:brightness-110 transition-all"
            >
              Partner Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto bg-transparent text-white border-2 border-white/20 backdrop-blur-xl px-12 md:px-20 py-6 md:py-8 rounded-full text-lg md:xl font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#0b1c2e] transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
