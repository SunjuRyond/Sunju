
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, Smartphone, School, Building, ArrowRight, Star, TrendingUp, Users, Wallet, Activity } from 'lucide-react';
import { COMPARISON_DATA, COLORS } from '../constants';

const FeatureCard = ({ title, items, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl shadow-xl shadow-[#1a4d8f]/5 border border-[#2d3436]/5 h-full"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white mb-6 shadow-lg`}>
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-display font-bold text-[#1a4d8f] mb-6">{title}</h3>
    <ul className="space-y-4">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-1 w-5 h-5 rounded-full bg-[#00b894]/10 flex items-center justify-center shrink-0">
            <Check size={12} className="text-[#00b894]" />
          </div>
          <span className="text-[#2d3436]/70 leading-tight">{item}</span>
        </li>
      ))}
    </ul>
    <button className={`mt-10 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${color} text-white hover:opacity-90`}>
      Learn More <ArrowRight size={18} />
    </button>
  </motion.div>
);

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="pt-12 pb-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="bg-[#ff6b35]/10 text-[#ff6b35] px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">The Triple-Threat Engine</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-[#1a4d8f] mb-8">How We Solve Tier-2/3</h1>
            <p className="text-xl text-[#2d3436]/60 leading-relaxed">
              We don't just provide content; we integrate with the student's daily lifecycle—school, neighborhood, and personal mobile space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <FeatureCard 
              title="SIP: School Integration" 
              icon={School}
              color="bg-[#1a4d8f]"
              items={[
                "Top faculty during school hours",
                "Hybrid classroom setup",
                "Synchronized board & JEE/NEET prep",
                "School branding & revenue sharing"
              ]}
            />
            <FeatureCard 
              title="ALC: Learning Centers" 
              icon={Building}
              color="bg-[#ff6b35]"
              items={[
                "Tech-enabled neighborhood hubs",
                "Personalized doubt sessions",
                "Peer-to-peer learning environment",
                "Local mentor supervision"
              ]}
            />
            <FeatureCard 
              title="Digital Platform" 
              icon={Smartphone}
              color="bg-[#00b894]"
              items={[
                "Adaptive Rank Forecaster",
                "Weakness Hunter algorithm",
                "Daily practice & testing",
                "Parent monitoring dashboard"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-[#1a4d8f] mb-12 text-center">Unfair Competitive Advantage</h2>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-[#1a4d8f]/5">
              <ComparisonMatrix />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-24 bg-white overflow-hidden relative">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#0b1c2e_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#f03c2e]/5 to-transparent rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0b1c2e]/5 to-transparent rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Animated Floating Accents */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#f03c2e]/10 to-transparent rounded-full blur-2xl" 
              />
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#0b1c2e]/10 to-transparent rounded-full blur-2xl" 
              />

              <motion.div 
                initial={{ rotate: -2, opacity: 0, scale: 0.95 }}
                whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 glass p-8 rounded-[2.5rem] border border-[#0b1c2e]/10 shadow-2xl overflow-hidden group"
              >
                {/* Dashboard Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(11,28,46,0.02)_50%,transparent_100%)] h-1 w-full animate-scanline" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f03c2e]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00b894]/60" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#0b1c2e]/5 rounded-full border border-[#0b1c2e]/10">
                    <span className="w-1.5 h-1.5 bg-[#f03c2e] rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-[#0b1c2e] uppercase tracking-widest">LIVE ANALYTICS ENGINE</span>
                  </div>
                  <span className="ml-auto text-[10px] font-black text-[#2d3436]/40 uppercase tracking-widest">V2.4 • BETA ACCESS</span>
                </div>
                
                {/* State Wise Stats Panel */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-[#0b1c2e] to-[#153a6b] p-5 rounded-3xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2 mb-3 text-white/60">
                      <Users size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">UP Students</span>
                    </div>
                    <div className="text-3xl font-mono font-black text-white tracking-tighter mb-1">3.2 Cr</div>
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Targetable Region</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#f03c2e] to-[#e02e21] p-5 rounded-3xl border border-white/10 shadow-xl">
                    <div className="flex items-center gap-2 mb-3 text-white/60">
                      <Users size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Bihar Students</span>
                    </div>
                    <div className="text-3xl font-mono font-black text-white tracking-tighter mb-1">1.8 Cr</div>
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Targetable Region</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#0b1c2e]/5">
                    <div>
                      <h4 className="text-xs font-black text-[#0b1c2e] uppercase tracking-tighter">Market Distribution Hub</h4>
                      <p className="text-[9px] text-[#2d3436]/40 font-bold uppercase tracking-widest">District Density Analysis</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Activity size={12} className="text-[#00b894]" />
                       <span className="text-[9px] font-mono font-bold text-[#00b894]">STABLE SYNC</span>
                    </div>
                  </div>
                  
                  {/* Detailed Market Graph */}
                  <div className="flex items-end gap-2.5 h-56 relative group px-2">
                    {marketData.map((data, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${data.height}%` }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          height: `${Math.min(data.height + 5, 100)}%`, 
                          filter: 'brightness(1.1)',
                          transition: { type: "spring", stiffness: 400, damping: 20 }
                        }}
                        className="flex-1 bg-gradient-to-t from-[#0b1c2e] to-[#f03c2e] rounded-t-lg relative group/bar cursor-pointer origin-bottom shadow-lg"
                      >
                        {/* Enhanced High-Fidelity Tooltip */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-3 transition-all duration-300 z-30 pointer-events-none">
                          <div className="bg-[#0b1c2e] text-white text-xs p-4 rounded-2xl shadow-2xl whitespace-nowrap border border-white/10 relative backdrop-blur-md">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 mb-2">
                               <span className="font-black text-[#f03c2e] text-sm tracking-tight">{data.region}</span>
                               <span className="text-[8px] font-black bg-white/10 px-1.5 py-0.5 rounded">DISTRICT</span>
                            </div>
                            <div className="flex justify-between gap-8 mb-1.5">
                              <span className="text-white/40 font-black uppercase text-[8px] tracking-widest">Student Density</span>
                              <span className="font-mono font-black text-[#00b894]">{data.students}</span>
                            </div>
                            <div className="flex justify-between gap-8">
                              <span className="text-white/40 font-black uppercase text-[8px] tracking-widest">Parent Capacity</span>
                              <span className="font-mono font-black text-[#f03c2e]">₹{data.capacity}</span>
                            </div>
                            {/* Visual Pointer/Arrow */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0b1c2e] rotate-45 border-r border-b border-white/10 shadow-xl"></div>
                          </div>
                        </div>
                        
                        {/* Static Labels */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <span className="text-[8px] font-black text-[#2d3436]/30 uppercase rotate-45 origin-left whitespace-nowrap group-hover/bar:text-[#0b1c2e] transition-colors tracking-tighter">{data.region}</span>
                        </div>
                        
                        {/* Student Count Badge inside bar */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-white/80 font-black rotate-90 tracking-tighter">
                           {data.students}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Paying Capacity Metrics Summary */}
                  <div className="grid grid-cols-1 gap-4 pt-14">
                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#0b1c2e]/5 to-transparent rounded-[2rem] border border-[#0b1c2e]/5 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-2xl shadow-xl border border-[#0b1c2e]/5">
                          <Wallet size={20} className="text-[#00b894]" />
                        </div>
                        <div>
                          <p className="text-[9px] text-[#2d3436]/40 uppercase font-black tracking-widest mb-1">Avg. District Affordability Scale</p>
                          <p className="text-xl font-mono font-black text-[#0b1c2e] tracking-tighter">₹35,000 — ₹60,000 <span className="text-[10px] font-medium text-[#2d3436]/40 uppercase tracking-widest ml-1">/ annum</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <TrendingUp size={24} className="text-[#00b894]/40 ml-auto mb-1" />
                        <span className="text-[9px] text-[#00b894] font-black bg-[#00b894]/10 px-2 py-0.5 rounded-full">+12.4% GROWTH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div>
              <span className="text-[#00b894] font-black uppercase tracking-widest text-sm mb-4 block">Regional Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#0b1c2e] mb-8 tracking-tight">Data-Driven Renaissance</h2>
              <div className="space-y-10">
                {[
                  { title: "Predictive Rank Modeling", desc: "Our AI calculates exactly where a student stands in the national pool every week using regional performance indexing." },
                  { title: "Weakness Hunter Algorithm", desc: "Automated flagging of conceptual gaps with instant remedial path generation tailored for Tier 2/3 pedagogy." },
                  { title: "Parent Live Connect", desc: "Real-time attendance, test performance, and behavioral tracking designed for transparency and accessibility." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-14 h-14 bg-white shadow-xl shadow-[#0b1c2e]/5 rounded-2xl flex items-center justify-center text-[#f03c2e] shrink-0 font-black border border-[#0b1c2e]/5 text-xl">
                      0{i+1}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-2xl text-[#0b1c2e] mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-[#2d3436]/60 leading-relaxed font-medium text-lg">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Style injection for the custom scanline animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(1000%); }
          }
          .animate-scanline {
            animation: scanline 4s linear infinite;
          }
        `}} />
      </section>
    </div>
  );
};
