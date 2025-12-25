
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, BarChart3, Star, Quote, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Year 1', rev: 12 },
  { name: 'Year 2', rev: 35 },
  { name: 'Year 3', rev: 70 },
  { name: 'Year 4', rev: 150 },
  { name: 'Year 5', rev: 310 },
];

const RevenueCalculator = () => {
  const [schools, setSchools] = useState(50);
  const [studentsPerSchool, setStudentsPerSchool] = useState(150);
  const revenue = (schools * studentsPerSchool * 40000) / 10000000; // in Crores

  return (
    <div className="bg-[#1a4d8f] p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl">
      <h3 className="text-2xl font-display font-bold mb-8">Revenue Projection Calculator</h3>
      <div className="space-y-10">
        <div>
          <div className="flex justify-between mb-4">
            <span className="text-white/60 font-semibold">Number of Schools (SIP)</span>
            <span className="text-2xl font-mono text-[#ff6b35] font-bold">{schools}</span>
          </div>
          <input 
            type="range" min="10" max="500" value={schools} 
            onChange={(e) => setSchools(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
          />
        </div>
        <div>
          <div className="flex justify-between mb-4">
            <span className="text-white/60 font-semibold">Students per School</span>
            <span className="text-2xl font-mono text-[#ff6b35] font-bold">{studentsPerSchool}</span>
          </div>
          <input 
            type="range" min="50" max="500" value={studentsPerSchool} 
            onChange={(e) => setStudentsPerSchool(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ff6b35]"
          />
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col items-center">
          <span className="text-white/40 uppercase tracking-widest text-xs mb-2">Annual Revenue Potential</span>
          <div className="text-5xl md:text-7xl font-mono font-bold text-[#00b894]">
            ₹{revenue.toFixed(1)}<span className="text-2xl">Cr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Impact = () => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Map Hero */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#ff6b35] font-bold uppercase tracking-widest text-sm mb-4 block">Regional Dominance</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-[#1a4d8f] mb-8">The UP & Bihar Strategy</h1>
              <p className="text-xl text-[#2d3436]/60 leading-relaxed mb-12">
                With a combined population of 37 Crore, these two states represent a massive underserved market. Our "Golden Corridor" strategy targets districts with highest density of aspirational students.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "Phase 1: Golden Corridor", districts: "Varanasi, Patna, Gorakhpur, Prayagraj, Muzaffarpur, Lucknow" },
                  { label: "Phase 2: Hinterland Expansion", districts: "50+ tier-3 towns across Purvanchal & Mithilanchal" }
                ].map((phase, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#faf8f5] border-l-4 border-[#1a4d8f]">
                    <h4 className="font-bold text-[#1a4d8f] mb-1">{phase.label}</h4>
                    <p className="text-sm text-[#2d3436]/60">{phase.districts}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-2xl">
                {/* Simplified UP/Bihar Outline Shape */}
                <path d="M50,150 L150,50 L350,100 L380,250 L200,280 L50,250 Z" fill="#1a4d8f" fillOpacity="0.05" stroke="#1a4d8f" strokeWidth="2" strokeDasharray="5,5" />
                <motion.circle initial={{ r: 0 }} whileInView={{ r: 6 }} cx="120" cy="80" fill="#ff6b35" />
                <motion.circle initial={{ r: 0 }} whileInView={{ r: 6 }} transition={{ delay: 0.1 }} cx="200" cy="120" fill="#ff6b35" />
                <motion.circle initial={{ r: 0 }} whileInView={{ r: 6 }} transition={{ delay: 0.2 }} cx="180" cy="180" fill="#ff6b35" />
                <motion.circle initial={{ r: 0 }} whileInView={{ r: 6 }} transition={{ delay: 0.3 }} cx="280" cy="140" fill="#ff6b35" />
                <motion.circle initial={{ r: 0 }} whileInView={{ r: 6 }} transition={{ delay: 0.4 }} cx="320" cy="220" fill="#ff6b35" />
                <text x="135" y="75" className="text-[10px] font-bold fill-[#1a4d8f]">Prayagraj</text>
                <text x="215" y="115" className="text-[10px] font-bold fill-[#1a4d8f]">Varanasi</text>
                <text x="295" y="135" className="text-[10px] font-bold fill-[#1a4d8f]">Patna</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Projections */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevenueCalculator />
            <div>
              <h2 className="text-4xl font-display font-bold text-[#1a4d8f] mb-6">Unlocking Hyper-Growth</h2>
              <p className="text-lg text-[#2d3436]/60 mb-10">Our unit economics are designed for scale. By utilizing existing school infrastructure, we reduce CAPEX by 80% compared to traditional coaching institutes.</p>
              
              <div className="h-[300px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d343610" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#2d343660', fontSize: 12}} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                      itemStyle={{ color: '#1a4d8f', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="rev" stroke="#ff6b35" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-mono text-[#2d3436]/40 text-center uppercase tracking-widest">Projected Revenue Growth (in ₹ Crore)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-display font-bold text-[#1a4d8f] mb-4">Student & Parent Success</h2>
            <p className="text-[#2d3436]/60">Driving impact where it matters the most.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Aryan Singh", 
                loc: "Varanasi", 
                story: "Saved 4 hours of travel daily because AcadUp integrated with my school. Secured AIR 542 in JEE Advanced.",
                tag: "IIT Aspirant"
              },
              { 
                name: "Anjali Kumari", 
                loc: "Muzaffarpur", 
                story: "The local ALC doubt center was a lifesaver. My parents felt safe letting me study nearby.",
                tag: "NEET Top Ranker"
              },
              { 
                name: "Rajesh Mishra", 
                loc: "Prayagraj", 
                story: "As a parent, I saved ₹2 Lakhs in hostel fees while getting better results than Kota.",
                tag: "Parent Testimonial"
              }
            ].map((test, i) => (
              <div key={i} className="p-10 rounded-[2rem] bg-[#faf8f5] border border-[#2d3436]/5 relative">
                <Quote className="absolute top-8 right-8 text-[#1a4d8f]/5" size={48} />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-[#ff6b35] text-[#ff6b35]" />)}
                </div>
                <p className="text-lg text-[#2d3436]/80 italic mb-8">"{test.story}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full border border-[#2d3436]/10 flex items-center justify-center text-[#1a4d8f] font-bold">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#1a4d8f]">{test.name}</h4>
                    <p className="text-xs text-[#ff6b35] font-bold uppercase tracking-wide">{test.tag} • {test.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#ff6b35]">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-display font-bold mb-8">Ready to Join the Revolution?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <button className="bg-white text-[#ff6b35] px-8 py-6 rounded-3xl font-bold hover:scale-105 transition-transform flex flex-col items-center gap-2">
              <span className="text-2xl">Schools</span>
              <span className="text-sm opacity-60">Partner with SIP</span>
            </button>
            <button className="bg-white text-[#ff6b35] px-8 py-6 rounded-3xl font-bold hover:scale-105 transition-transform flex flex-col items-center gap-2">
              <span className="text-2xl">Students</span>
              <span className="text-sm opacity-60">Enroll for 2024</span>
            </button>
            <button className="bg-white text-[#ff6b35] px-8 py-6 rounded-3xl font-bold hover:scale-105 transition-transform flex flex-col items-center gap-2">
              <span className="text-2xl">Investors</span>
              <span className="text-sm opacity-60">See Pitchedeck</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
