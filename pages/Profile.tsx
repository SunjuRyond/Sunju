
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Smartphone, Edit3, Camera, 
  LogOut, ShieldCheck, GraduationCap, 
  Briefcase, TrendingUp, Save, X, 
  CheckCircle2, Building2, MapPin,
  // Added missing Target and BookOpen icons
  Target, BookOpen
} from 'lucide-react';
import { ROUTES } from '../constants';

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('acadup_user');
    if (!stored) {
      navigate(ROUTES.AUTH);
      return;
    }
    const userData = JSON.parse(stored);
    setUser(userData);
    setEditedData(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('acadup_user');
    window.dispatchEvent(new Event('storage'));
    navigate(ROUTES.AUTH);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updatedUser = { ...user, avatar: base64 };
        setUser(updatedUser);
        setEditedData(updatedUser);
        localStorage.setItem('acadup_user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      setUser(editedData);
      localStorage.setItem('acadup_user', JSON.stringify(editedData));
      window.dispatchEvent(new Event('storage'));
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  if (!user) return null;

  const roleColors: any = {
    Student: 'text-[#00b894] bg-[#00b894]/10 border-[#00b894]/20',
    Teacher: 'text-[#f03c2e] bg-[#f03c2e]/10 border-[#f03c2e]/20',
    Investor: 'text-[#0b1c2e] bg-[#0b1c2e]/10 border-[#0b1c2e]/20'
  };

  const roleIcons: any = {
    Student: GraduationCap,
    Teacher: Briefcase,
    Investor: TrendingUp
  };

  const RoleIcon = roleIcons[user.role] || User;

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Panel: Profile Overview */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white relative overflow-hidden text-center"
            >
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-[#faf8f5] border-4 border-[#0b1c2e]/5 overflow-hidden shadow-inner flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                    <User size={48} className="text-[#0b1c2e]/20" />
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-10 h-10 bg-[#0b1c2e] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera size={18} />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </div>

              <h2 className="text-2xl font-display font-bold text-[#0b1c2e] mb-2">{user.fullName}</h2>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${roleColors[user.role]}`}>
                <RoleIcon size={14} /> {user.role}
              </div>

              <div className="mt-8 pt-8 border-t border-[#0b1c2e]/5 flex flex-col gap-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#0b1c2e] text-white font-bold hover:bg-[#1a4d8f] transition-all"
                >
                  {isEditing ? <><X size={18} /> Cancel Edit</> : <><Edit3 size={18} /> Edit Profile</>}
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white border border-[#0b1c2e]/10 text-[#0b1c2e] font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0b1c2e] rounded-[2.5rem] p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f03c2e] opacity-10 rounded-bl-[5rem]" />
              <ShieldCheck className="text-[#f03c2e] mb-4" size={32} />
              <h4 className="text-xl font-display font-bold mb-2">Account Secure</h4>
              <p className="text-white/50 text-xs font-medium leading-relaxed">
                Your educational data is protected by AcadUp's enterprise-grade encryption.
              </p>
            </motion.div>
          </div>

          {/* Right Panel: Details / Edit Form */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white h-full"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-display font-bold text-[#0b1c2e]">
                  {isEditing ? 'Update Information' : 'Personal Details'}
                </h3>
                {isEditing && (
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-[#00b894] text-white px-6 py-3 rounded-2xl font-bold hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                    <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                      <User size={18} className="text-[#0b1c2e]/20" />
                      {isEditing ? (
                        <input 
                          value={editedData.fullName}
                          onChange={(e) => setEditedData({...editedData, fullName: e.target.value})}
                          className="bg-transparent w-full focus:outline-none text-[#0b1c2e] font-medium"
                        />
                      ) : (
                        <span className="text-[#0b1c2e] font-medium">{user.fullName}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                    <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5 opacity-60">
                      <Mail size={18} className="text-[#0b1c2e]/20" />
                      <span className="text-[#0b1c2e] font-medium">{user.email}</span>
                      <ShieldCheck size={14} className="ml-auto text-[#00b894]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Mobile Number</label>
                    <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                      <Smartphone size={18} className="text-[#0b1c2e]/20" />
                      {isEditing ? (
                        <input 
                          value={editedData.mobile}
                          onChange={(e) => setEditedData({...editedData, mobile: e.target.value})}
                          className="bg-transparent w-full focus:outline-none text-[#0b1c2e] font-medium"
                        />
                      ) : (
                        <span className="text-[#0b1c2e] font-medium">{user.mobile}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {user.role === 'Student' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Current Class</label>
                        <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                          <GraduationCap size={18} className="text-[#0b1c2e]/20" />
                          <span className="text-[#0b1c2e] font-medium">{user.currentClass}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Target Goal</label>
                        <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                          <Target size={18} className="text-[#0b1c2e]/20" />
                          <span className="text-[#0b1c2e] font-medium">{user.targetGoal}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {user.role === 'Teacher' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Expertise</label>
                        <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                          <BookOpen size={18} className="text-[#0b1c2e]/20" />
                          <span className="text-[#0b1c2e] font-medium">{user.expertise}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Qualification</label>
                        <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                          <ShieldCheck size={18} className="text-[#0b1c2e]/20" />
                          <span className="text-[#0b1c2e] font-medium">{user.qualification}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {user.role === 'Investor' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">Thesis</label>
                        <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                          <TrendingUp size={18} className="text-[#0b1c2e]/20" />
                          <span className="text-[#0b1c2e] font-medium">{user.investmentThesis}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#0b1c2e]/40 uppercase tracking-[0.2em] mb-2 ml-1">LinkedIn</label>
                        <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#0b1c2e]/5">
                          <Building2 size={18} className="text-[#0b1c2e]/20" />
                          <span className="text-[#0b1c2e] font-medium truncate max-w-[150px]">{user.linkedin}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { icon: CheckCircle2, text: "Verified Profile", sub: "KYC Completed" },
                   { icon: Building2, text: "Region Active", sub: "UP/Bihar Zone" },
                   { icon: MapPin, text: "Hub Access", sub: "3 Centers Nearby" }
                 ].map((stat, i) => (
                   <div key={i} className="p-6 rounded-3xl bg-[#faf8f5] border border-[#0b1c2e]/5 text-center">
                     <stat.icon className="mx-auto mb-3 text-[#f03c2e]/60" size={24} />
                     <h5 className="text-sm font-bold text-[#0b1c2e]">{stat.text}</h5>
                     <p className="text-[10px] font-medium text-[#0b1c2e]/40 uppercase tracking-widest">{stat.sub}</p>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
