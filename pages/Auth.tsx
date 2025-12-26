import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import { 
  User, Mail, Smartphone, ArrowRight, 
  GraduationCap, Briefcase, TrendingUp, 
  ChevronDown, CheckCircle2, ShieldCheck,
  Building2, Linkedin, Target, BookOpen, Globe2,
  Loader2, PartyPopper, Lock, KeyRound
} from 'lucide-react';
import { ROUTES } from '../constants';

type Role = 'Student' | 'Teacher' | 'Investor';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXR_OoojBgAvqdZuDGssUhXIyiHzYAObeNNTu8EkqopH1I5l9zwb8zq1QcJFQ0Vsyv/exec';

const InputField = ({ icon: Icon, label, type = "text", placeholder, value, onChange, options, required = false }: any) => {
  return (
    <framerMotion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2 mb-4"
    >
      <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] ml-1">
        {label} {required && <span className="text-[#f03c2e]">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0b1c2e]/20 group-focus-within:text-[#f03c2e] transition-colors">
          <Icon size={18} />
        </div>
        
        {options ? (
          <select 
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white/50 backdrop-blur-sm border border-[#0b1c2e]/5 rounded-2xl py-4 pl-14 pr-10 appearance-none focus:outline-none focus:border-[#f03c2e] focus:bg-white transition-all text-[#0b1c2e] font-medium"
          >
            <option value="" disabled>Select {label}</option>
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            required={required}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white/50 backdrop-blur-sm border border-[#0b1c2e]/5 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#f03c2e] focus:bg-white transition-all text-[#0b1c2e] placeholder:text-[#0b1c2e]/20 font-medium"
          />
        )}
        {options && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#0b1c2e]/20">
            <ChevronDown size={18} />
          </div>
        )}
      </div>
    </framerMotion.div>
  );
};

export const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignIn, setIsSignIn] = useState(false);
  const [role, setRole] = useState<Role>('Student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    currentClass: '',
    targetGoal: '',
    expertise: '',
    qualification: '',
    investmentThesis: '',
    ticketSize: '',
    strategicValue: '',
    linkedin: ''
  });

  useEffect(() => {
    if (localStorage.getItem('acadup_user')) {
      navigate(ROUTES.PROFILE);
    }

    const roleParam = searchParams.get('role')?.toLowerCase();
    if (roleParam === 'investor') setRole('Investor');
    else if (roleParam === 'teacher') setRole('Teacher');
    else if (roleParam === 'student') setRole('Student');
  }, [navigate, searchParams]);

  const updateField = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simulate OTP generation and "sending mail" from the developer/system
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    // In a real scenario, the backend SCRIPT_URL would handle MailApp.sendEmail()
    console.log(`[DEBUG] OTP for ${formData.email} is: ${newOtp}`);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
    }, 1500);
  };

  const verifyOtpAndFinalize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue !== generatedOtp && otpValue !== '123456') { // Allow '123456' as back door for demo
      setError("Invalid OTP. Please check the code sent to your mail.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        role,
        timestamp: new Date().toISOString(),
        type: isSignIn ? 'Login' : 'Signup'
      };

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Save user session
      localStorage.setItem('acadup_user', JSON.stringify({ ...payload, avatar: null }));
      // Save last known user globally (for greeting after logout)
      localStorage.setItem('acadup_last_user_name', formData.fullName);
      
      window.dispatchEvent(new Event('storage'));
      setIsSuccess(true);
      setTimeout(() => navigate(ROUTES.PROFILE), 2000);
    } catch (err) {
      setError("Connection failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleIcons = {
    Student: GraduationCap,
    Teacher: Briefcase,
    Investor: TrendingUp
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 pt-32 pb-20 relative overflow-hidden">
      <framerMotion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f03c2e] rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none"
      />
      <framerMotion.div 
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0b1c2e] rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none"
      />

      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8 text-center lg:text-left hidden lg:block">
          <framerMotion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-[#f03c2e] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Join the Revolution</span>
            <h1 className="text-6xl font-display font-bold text-[#0b1c2e] tracking-tighter leading-[0.9] mb-8">
              Unlock the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b1c2e] to-[#f03c2e]">AcadUp Advantage</span>
            </h1>
            <p className="text-xl text-[#2d3436]/60 font-medium leading-relaxed max-w-md">
              Verified education for Bharat. Bridging the gap from remote towns to top-tier universities.
            </p>
          </framerMotion.div>
        </div>

        <framerMotion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[540px] bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(11,28,46,0.12)] border border-white relative z-10"
        >
          <FramerAnimatePresence mode="wait">
            {isSuccess ? (
              <framerMotion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-24 h-24 bg-[#00b894]/10 rounded-full flex items-center justify-center text-[#00b894] mx-auto mb-8">
                  <PartyPopper size={48} />
                </div>
                <h2 className="text-3xl font-display font-bold text-[#0b1c2e] mb-4">Verification Successful!</h2>
                <p className="text-[#2d3436]/60 font-medium mb-8 leading-relaxed">
                  Welcome to the AcadUp ecosystem, {formData.fullName}.
                </p>
              </framerMotion.div>
            ) : step === 'otp' ? (
              <framerMotion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-[#f03c2e]/10 rounded-full flex items-center justify-center text-[#f03c2e] mx-auto mb-6">
                    <ShieldCheck size={32} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-[#0b1c2e] mb-2">Verify Email</h2>
                  <p className="text-[#2d3436]/40 text-sm font-medium">We've sent a 6-digit code to <br /><span className="text-[#0b1c2e]">{formData.email}</span></p>
                </div>

                <form onSubmit={verifyOtpAndFinalize} className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0b1c2e]/20">
                      <KeyRound size={20} />
                    </div>
                    <input 
                      required
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#faf8f5] border border-[#0b1c2e]/5 rounded-2xl py-5 pl-14 pr-5 text-center text-3xl font-mono tracking-[0.3em] focus:outline-none focus:border-[#f03c2e] transition-all"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting || otpValue.length < 6}
                    type="submit"
                    className="w-full bg-[#f03c2e] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#d93429] transition-all shadow-xl shadow-[#f03c2e]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'Verify & Continue'}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setStep('form')}
                    className="w-full text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] hover:text-[#0b1c2e] transition-colors"
                  >
                    Back to Edit Details
                  </button>
                </form>
              </framerMotion.div>
            ) : (
              <framerMotion.div key="form">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-[#0b1c2e] mb-8">
                    {isSignIn ? 'Welcome Back' : 'Get Started'}
                  </h2>
                  <div className="bg-[#faf8f5] p-1.5 rounded-2xl flex relative overflow-hidden">
                    <framerMotion.div 
                      className="absolute inset-y-1.5 rounded-xl bg-[#0b1c2e] z-0 shadow-lg"
                      animate={{ x: isSignIn ? '100%' : '0%', width: 'calc(50% - 3px)' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button onClick={() => setIsSignIn(false)} className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors ${!isSignIn ? 'text-white' : 'text-[#0b1c2e]/40'}`}>SIGN UP</button>
                    <button onClick={() => setIsSignIn(true)} className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors ${isSignIn ? 'text-white' : 'text-[#0b1c2e]/40'}`}>LOG IN</button>
                  </div>
                </div>

                <form onSubmit={handleInitialSubmit} className="space-y-2">
                  {!isSignIn && (
                    <>
                      <div className="mb-8">
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-4 text-center">Select Your Path</label>
                        <div className="grid grid-cols-3 gap-3">
                          {(['Student', 'Teacher', 'Investor'] as Role[]).map((r) => {
                            const Icon = roleIcons[r];
                            const isActive = role === r;
                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all group ${
                                  isActive ? 'bg-[#f03c2e]/5 border-[#f03c2e] text-[#f03c2e]' : 'bg-[#faf8f5] border-transparent text-[#0b1c2e]/40 hover:border-[#0b1c2e]/10'
                                }`}
                              >
                                <Icon size={20} className={isActive ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{r}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <InputField required icon={User} label="Full Name" placeholder="Rahul Sharma" value={formData.fullName} onChange={(v: string) => updateField('fullName', v)} />
                      <InputField required icon={Smartphone} label="Mobile Number" placeholder="+91 98765 43210" value={formData.mobile} onChange={(v: string) => updateField('mobile', v)} />
                    </>
                  )}
                  <InputField required icon={Mail} label="Email Address" type="email" placeholder="rahul@example.com" value={formData.email} onChange={(v: string) => updateField('email', v)} />
                  
                  {!isSignIn && (
                    <FramerAnimatePresence mode="wait">
                      <framerMotion.div key={role} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        {role === 'Student' && (
                          <>
                            <InputField required icon={GraduationCap} label="Current Class" options={["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Repeater"]} value={formData.currentClass} onChange={(v: string) => updateField('currentClass', v)} />
                            <InputField required icon={Target} label="Target Goal" options={["JEE Main/Adv", "NEET-UG", "Board Exams", "Foundation/Olympiad"]} value={formData.targetGoal} onChange={(v: string) => updateField('targetGoal', v)} />
                          </>
                        )}
                        {role === 'Teacher' && (
                          <>
                            <InputField required icon={BookOpen} label="Subject Expertise" placeholder="Physics / Mathematics" value={formData.expertise} onChange={(v: string) => updateField('expertise', v)} />
                            <InputField required icon={Briefcase} label="Academic Qualification" placeholder="IIT Graduate / PhD / MSc" value={formData.expertise} onChange={(v: string) => updateField('expertise', v)} />
                          </>
                        )}
                        {role === 'Investor' && (
                          <>
                            <InputField required icon={Target} label="Investment Thesis" options={["Early Stage EdTech", "Tier-2/3 Growth", "Social Impact", "Scalable SaaS"]} value={formData.investmentThesis} onChange={(v: string) => updateField('investmentThesis', v)} />
                            <InputField required icon={ArrowRight} label="Typical Check Size" options={["₹10 Lakh - ₹50 Lakh", "₹50 Lakh - ₹2 Crore", "₹2 Crore - ₹10 Crore", "₹10 Crore+"]} value={formData.ticketSize} onChange={(v: string) => updateField('ticketSize', v)} />
                            <InputField required icon={Globe2} label="Strategic Value Add" placeholder="Scaling expertise" value={formData.strategicValue} onChange={(v: string) => updateField('strategicValue', v)} />
                            <InputField required icon={Linkedin} label="LinkedIn Profile" placeholder="linkedin.com/in/username" value={formData.linkedin} onChange={(v: string) => updateField('linkedin', v)} />
                          </>
                        )}
                      </framerMotion.div>
                    </FramerAnimatePresence>
                  )}

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#0b1c2e] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 mt-8 hover:bg-[#1a4d8f] transition-all shadow-xl shadow-[#0b1c2e]/10 group disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : (isSignIn ? 'Verify Login' : 'Send Verification OTP')}
                    {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                  {error && <p className="text-center text-[#f03c2e] text-xs mt-4 font-bold">{error}</p>}
                </form>
              </framerMotion.div>
            )}
          </FramerAnimatePresence>
        </framerMotion.div>
      </div>
    </div>
  );
};