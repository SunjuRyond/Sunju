
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Sparkles, Heart, Users, ExternalLink, Zap } from 'lucide-react';

// Fix: Cast motion components to any to bypass property errors
const MotionDiv = motion.div as any;
const AnyAnimatePresence = AnimatePresence as any;

export const InstallPwaBanner: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Custom event to trigger modal manually from other pages (like Home/Vision)
    const handleManualTrigger = () => {
      setShowModal(true);
    };

    window.addEventListener('trigger-pwa-install', handleManualTrigger);

    // Automatic trigger for new visitors after 12 seconds
    const dismissed = sessionStorage.getItem('instagram_prompt_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowModal(true), 12000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('trigger-pwa-install', handleManualTrigger);
    };
  }, []);

  const dismissModal = () => {
    setShowModal(false);
    sessionStorage.setItem('instagram_prompt_dismissed', 'true');
  };

  const handleFollowClick = () => {
    window.open('https://www.instagram.com/_just_sunju?igsh=YWdtMGIwbnk0ZjZ3', '_blank');
    dismissModal();
  };

  return (
    <AnyAnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0b1c2e]/80 backdrop-blur-lg">
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-md bg-white rounded-[3.5rem] overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] border border-white/20"
          >
            {/* Close Button */}
            <button 
              onClick={dismissModal}
              className="absolute top-8 right-8 p-3 text-white/60 hover:text-white hover:bg-white/20 rounded-full transition-all z-30 bg-black/10 backdrop-blur-md"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header / Brand Area with Instagram Gradient */}
            <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 opacity-50" />
              <MotionDiv 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative z-10"
              >
                <div className="w-24 h-24 bg-white rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center shadow-2xl relative">
                   <Instagram className="text-[#ee2a7b]" size={48} />
                   <div className="absolute -top-2 -right-2 bg-[#f03c2e] text-white p-2 rounded-full shadow-lg border-4 border-white">
                      <Heart size={14} fill="white" />
                   </div>
                </div>
                <h3 className="text-white text-4xl font-display font-bold tracking-tighter mb-2">Join the Club</h3>
                <p className="text-white/70 text-sm font-medium uppercase tracking-[0.2em]">@AcadUp_Official</p>
              </MotionDiv>
            </div>

            {/* Main Content */}
            <div className="p-10 pt-12 text-center">
              <div className="space-y-6 mb-12">
                {[
                  { icon: Sparkles, text: "Daily Academic Motivation", sub: "Stay inspired every morning" },
                  { icon: Zap, text: "Quick Concept Reels", sub: "Learn JEE/NEET topics in 60s" },
                  { icon: Users, text: "Bharat's Largest Community", sub: "Connect with Tier-2/3 toppers" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-[#ee2a7b]/10 flex items-center justify-center text-[#ee2a7b] shrink-0">
                      <item.icon size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#0b1c2e] font-bold text-base leading-tight">{item.text}</span>
                      <span className="text-[#0b1c2e]/40 text-xs font-medium">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleFollowClick}
                  className="w-full bg-gradient-to-r from-[#ee2a7b] to-[#6228d7] text-white py-6 rounded-3xl font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#ee2a7b]/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                >
                  Follow on Instagram <ExternalLink size={18} />
                </button>
                
                <button 
                  onClick={dismissModal}
                  className="w-full mt-4 py-4 text-[#0b1c2e]/40 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-[#0b1c2e] transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 w-full flex">
              <div className="flex-1 bg-[#f9ce34]" />
              <div className="flex-1 bg-[#ee2a7b]" />
              <div className="flex-1 bg-[#6228d7]" />
            </div>
          </motion.div>
        </div>
      )}
    </AnyAnimatePresence>
  );
};
