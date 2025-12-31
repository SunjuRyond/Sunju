
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Upload, Sparkles, BookOpen, Download, 
  Image as ImageIcon, Loader2, RefreshCw, 
  ArrowRight, AlertCircle, Trash2, Mic, MicOff,
  FileText, Brain, Phone, StopCircle,
  ShieldCheck, Globe2, Camera, Search,
  CheckCircle, Zap, Volume2, ExternalLink,
  History, X, Clock, MessageSquare, Globe,
  Award, Star, ZapOff, Trophy, Lightbulb,
  CornerDownRight, Send, Bot, Cpu, Orbit,
  Terminal, Activity, Radio, FileImage, FileDown,
  HelpCircle
} from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

// Fix: Cast motion components to any to bypass property errors
const MotionDiv = motion.div as any;
const AnyAnimatePresence = AnimatePresence as any;

// Mascot States
type MascotState = 'IDLE' | 'LISTENING' | 'THINKING' | 'RESOLVED' | 'SCANNING';

// Helper for image to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Base64 Helpers for Live API
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface ChatHistoryItem {
  id: number;
  question: string;
  answer: string;
  sources: any[];
  timestamp: string;
}

const NeonAIOsphere = ({ state, insight, size = 'md' }: { state: MascotState, insight?: string, size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16 md:w-20 md:h-20',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-40 h-40 md:w-56 md:h-56'
  };

  const iconSizes = {
    sm: 24,
    md: 40,
    lg: 72
  };

  const animations = {
    IDLE: { 
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    LISTENING: { 
      scale: [1, 1.2, 1],
      boxShadow: ["0 0 20px rgba(124,58,237,0.2)", "0 0 60px rgba(124,58,237,0.6)", "0 0 20px rgba(124,58,237,0.2)"],
      transition: { duration: 1, repeat: Infinity }
    },
    THINKING: { 
      rotate: [0, 360],
      scale: [1, 0.9, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    RESOLVED: { 
      scale: [1, 1.3, 1],
      y: [0, -30, 0],
      transition: { duration: 0.5, times: [0, 0.5, 1] }
    },
    SCANNING: { 
      x: [-20, 20, -20],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <AnyAnimatePresence>
        {insight && (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className={`${size === 'lg' ? 'mb-10' : 'mb-6'} bg-[#4b0082] text-white px-6 py-3 rounded-2xl shadow-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest max-w-[220px] text-center`}
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-[#a855f7]" /> {insight}
            </span>
          </MotionDiv>
        )}
      </AnyAnimatePresence>

      <div className="relative">
        <MotionDiv 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 ${size === 'lg' ? '-m-12' : '-m-4'} border border-[#7c3aed]/20 rounded-full`}
        />
        <MotionDiv 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 ${size === 'lg' ? '-m-20' : '-m-8'} border border-[#4b0082]/10 rounded-full`}
        />

        <MotionDiv
          animate={animations[state]}
          className={`${sizeClasses[size]} rounded-full bg-[#0b1c2e] flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.3)] border border-white/10`}
        >
          <MotionDiv 
            animate={{ 
              scale: state === 'THINKING' ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: state === 'THINKING' ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed] via-[#4b0082] to-transparent"
          />
          
          <div className="relative z-10">
            {state === 'THINKING' ? (
              <Cpu size={iconSizes[size]} className="text-white animate-pulse" />
            ) : state === 'LISTENING' ? (
              <Orbit size={iconSizes[size]} className="text-[#a855f7]" />
            ) : state === 'RESOLVED' ? (
              <CheckCircle size={iconSizes[size]} className="text-[#00b894]" />
            ) : (
              <Bot size={iconSizes[size]} className="text-white/80" />
            )}
          </div>

          {state === 'SCANNING' && (
            <MotionDiv 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-0 right-0 h-[2px] bg-[#7c3aed] shadow-[0_0_10px_#7c3aed] z-20"
            />
          )}
        </MotionDiv>
      </div>
    </div>
  );
};

export const Studio = () => {
  const [questionText, setQuestionText] = useState('');
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // States to keep track of the question that generated the current result
  const [activeResultQuestion, setActiveResultQuestion] = useState<string | null>(null);
  const [activeResultImage, setActiveResultImage] = useState<string | null>(null);
  const [activeResultImageMime, setActiveResultImageMime] = useState<string | null>(null);
  
  // Mascot logic
  const [mascotState, setMascotState] = useState<MascotState>('IDLE');
  const [aiInsight, setAiInsight] = useState<string | undefined>(undefined);
  const [processLogs, setProcessLogs] = useState<string[]>([]);
  
  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const sessionRef = useRef<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  const processingMessages = [
    "Identifying pedagogical core...",
    "Querying regional curriculum indices...",
    "Synthesizing conceptual solution...",
    "Validating rank-impact potential...",
    "Optimizing remedial path architecture...",
    "Cross-referencing verified empirical data...",
    "Finalizing structural output..."
  ];

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('acadup_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user && user.fullName) {
          setUserName(user.fullName.split(' ')[0]);
        }
      }

      const storedHistory = localStorage.getItem('acadup_studio_history');
      if (storedHistory) {
        setChatHistory(JSON.parse(storedHistory));
      }
    } catch (e) { console.error(e); }
  }, []);

  // Mascot typing reaction
  useEffect(() => {
    if (questionText.length > 0 && !loading) {
      setMascotState('LISTENING');
      setAiInsight('Capturing intent...');
    } else if (!loading) {
      setMascotState('IDLE');
      setAiInsight(undefined);
    }
  }, [questionText, loading]);

  // Loading process simulation
  useEffect(() => {
    if (loading) {
      setProcessLogs([]);
      let index = 0;
      const interval = setInterval(() => {
        if (index < processingMessages.length) {
          setProcessLogs(prev => [...prev, processingMessages[index]]);
          setAiInsight(processingMessages[index]);
          index++;
        }
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      const base64 = await fileToBase64(file);
      setQuestionImage(base64);
      setImageMimeType(file.type);
      setError(null);
      setMascotState('SCANNING');
      setAiInsight('Optical character analysis...');
    }
  };

  const handleSolve = async (manualText?: string) => {
    const finalQuestion = manualText || questionText;
    
    if (!finalQuestion.trim() && !questionImage) {
      setError('Please provide a question or upload an image.');
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);
    setMascotState('THINKING');
    
    // Lock in the current question details for the solution void
    setActiveResultQuestion(finalQuestion);
    setActiveResultImage(questionImage);
    setActiveResultImageMime(imageMimeType);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const firstName = userName || 'Student';
      
      const systemInstruction = `Role: You are the AcadUp Strategic AI Tutor. 
Digital Representative: A high-tech Floating Orb.

PROTOCOLS:
1. NO LaTeX: Use Unicode (H₂O, x², Δ, π).
2. STRUCTURE: **[Answer]**, Theoretical Basis, Derivation, Application.
3. CONTEXT: Focus on Tier-2/3 India student needs (clarity, Hindi-English fusion where helpful).
4. IDENTITY: Led by a 26-year-old visionary from Bihar, Instagram @_just_sunju.

GREETING: "System engaged. Hello ${firstName}. Solving..."`;

      let modelToUse = 'gemini-3-flash-preview'; 
      if (isThinking) modelToUse = 'gemini-3-pro-preview';

      const contents: any[] = [];
      if (questionImage) {
        contents.push({ inlineData: { data: questionImage, mimeType: imageMimeType || 'image/png' } });
      }
      contents.push({ text: finalQuestion || "Conceptual analysis requested." });

      const solveResponse = await ai.models.generateContent({
        model: modelToUse,
        contents: [{ parts: contents }],
        config: {
          systemInstruction,
          thinkingConfig: isThinking ? { thinkingBudget: 32768 } : undefined,
          tools: useSearch ? [{ googleSearch: {} }] : undefined,
          temperature: 0.1,
        }
      });

      const resultText = solveResponse.text || "No solution generated.";
      setMascotState('RESOLVED');
      setAiInsight('Analysis Verified.');
      setAnswer(resultText);

      const groundingChunks = solveResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const foundSources = groundingChunks
        ? groundingChunks.map((chunk: any) => chunk.web).filter((web: any) => web && web.uri)
        : [];
      setSources(foundSources);

      const newHistoryItem: ChatHistoryItem = {
        id: Date.now(),
        question: finalQuestion || (questionImage ? "[Diagram Analysis]" : "Question"),
        answer: resultText,
        sources: foundSources,
        timestamp: new Date().toISOString()
      };
      const updatedHistory = [newHistoryItem, ...chatHistory].slice(0, 15);
      setChatHistory(updatedHistory);
      localStorage.setItem('acadup_studio_history', JSON.stringify(updatedHistory));

    } catch (err: any) {
      setError("System overload. Please retry.");
      setMascotState('IDLE');
    } finally {
      setLoading(false);
    }
  };

  const startLiveTutor = async () => {
    if (isLiveActive) {
      setIsLiveActive(false);
      sessionRef.current?.close();
      setMascotState('IDLE');
      return;
    }

    try {
      setMascotState('LISTENING');
      setAiInsight('Live Link Active.');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: `You are the AcadUp Live AI Tutor. Be concise.`,
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsLiveActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn) setMascotState('RESOLVED');
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const buf = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buf;
              source.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buf.duration;
              sourcesRef.current.add(source);
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: () => setIsLiveActive(false)
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setError("Microphone required.");
    }
  };

  const downloadAsImage = async () => {
    if (!downloadRef.current) return;
    try {
      const canvas = await html2canvas(downloadRef.current, { scale: 3, useCORS: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `AcadUp_Solution_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) { setError('Image export failed.'); }
  };

  const downloadAsPDF = async () => {
    if (!downloadRef.current) return;
    try {
      const canvas = await html2canvas(downloadRef.current, { scale: 3, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AcadUp_Solution_${Date.now()}.pdf`);
    } catch (err) { setError('PDF export failed.'); }
  };

  const clearAll = () => {
    setQuestionText('');
    setQuestionImage(null);
    setAnswer(null);
    setSources([]);
    setError(null);
    setMascotState('IDLE');
    setActiveResultQuestion(null);
    setActiveResultImage(null);
  };

  const watermarkUrl = `data:image/svg+xml;utf8,<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-45 90 90)"><text x="10" y="95" font-family="Poppins, sans-serif" font-weight="900" font-size="28" fill="%234b0082" fill-opacity="0.12">AcadUp</text></g></svg>`;

  return (
    <div className="animate-in fade-in duration-700 pt-24 md:pt-32 pb-16 px-4 min-h-screen bg-[#faf8f5]">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-10">
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white px-6 py-2 rounded-full text-[10px] font-bold mb-4 shadow-xl"
          >
            <Bot size={12} className="text-white animate-pulse" /> ENTERPRISE AI TUTOR CORE
          </MotionDiv>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-[#0b1c2e] tracking-tighter">
            AcadUp <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#4b0082] drop-shadow-sm">AI Tutor</span>
          </h1>
          <button onClick={() => setIsHistoryOpen(true)} className="mt-6 flex items-center gap-2 px-6 py-2 bg-white border border-purple-100 rounded-2xl text-[10px] font-bold text-[#4b0082] mx-auto uppercase tracking-widest hover:border-[#7c3aed] transition-colors"><History size={16} /> Solution Logs</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-black/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#7c3aed] to-[#6d28d9]" />
              <h3 className="text-xl font-display font-bold text-[#0b1c2e] mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-[#7c3aed]" /> System Parameters
              </h3>

              <div className="space-y-5">
                {!questionImage ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-[#7c3aed]/10 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-purple-50 transition-all group">
                      <Upload size={24} className="text-[#7c3aed] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase text-[#4b0082]">Image Input</span>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    </button>
                    <button onClick={() => cameraInputRef.current?.click()} className="border-2 border-dashed border-[#7c3aed]/10 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-purple-50 transition-all group">
                      <Camera size={24} className="text-[#a855f7] mb-2" />
                      <span className="text-[10px] font-bold uppercase text-[#4b0082]">Capture</span>
                      <input type="file" ref={cameraInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-purple-100 bg-purple-50/30">
                    <img src={`data:${imageMimeType};base64,${questionImage}`} className="w-full max-h-48 object-contain p-4" />
                    <button onClick={() => setQuestionImage(null)} className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-[#f03c2e] hover:bg-white transition-colors"><Trash2 size={16} /></button>
                  </div>
                )}

                <textarea 
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Describe your academic query..."
                  className="w-full h-32 bg-[#faf8f5] border border-black/5 rounded-2xl p-4 text-[#0b1c2e] focus:border-[#7c3aed] outline-none text-sm font-medium transition-all"
                />

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-4 py-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3">
                      <Brain size={18} className="text-[#7c3aed]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4b0082]">Mastery Thinking</span>
                    </div>
                    <button onClick={() => setIsThinking(!isThinking)} className={`w-12 h-6 rounded-full transition-colors relative ${isThinking ? 'bg-[#7c3aed]' : 'bg-gray-300'}`}>
                      <MotionDiv animate={{ x: isThinking ? 24 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>

                  <button onClick={() => handleSolve()} disabled={loading} className="w-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 mt-4 hover:scale-[1.02] shadow-xl shadow-purple-500/20 transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} className="text-white" /> Process Logic</>}
                  </button>
                  <button onClick={clearAll} className="w-full py-4 text-[10px] font-bold text-[#4b0082]/40 uppercase tracking-widest hover:text-[#7c3aed]">Reset Environment</button>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-[2.5rem] shadow-xl border transition-all ${isLiveActive ? 'bg-gradient-to-br from-[#7c3aed] to-[#4b0082] text-white' : 'bg-white text-[#0b1c2e]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isLiveActive ? 'bg-white animate-pulse' : 'bg-purple-50'}`}>
                    <Mic size={24} className={isLiveActive ? 'text-[#7c3aed]' : 'text-[#7c3aed]'} />
                  </div>
                  <div>
                    <h4 className={`font-display font-bold ${isLiveActive ? 'text-white' : 'text-[#0b1c2e]'}`}>Voice Uplink</h4>
                    <p className={`text-[9px] font-bold opacity-60 uppercase tracking-widest ${isLiveActive ? 'text-white' : 'text-[#4b0082]'}`}>Live session</p>
                  </div>
                </div>
                <button onClick={startLiveTutor} className={`p-4 rounded-full ${isLiveActive ? 'bg-white text-[#7c3aed]' : 'bg-[#7c3aed] text-white shadow-lg'}`}>
                  {isLiveActive ? <StopCircle size={24} /> : <Mic size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Solution / Loading Matrix */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] h-full min-h-[500px] flex flex-col relative overflow-hidden shadow-2xl border border-white">
              <AnyAnimatePresence mode="wait">
                {!answer && !loading ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#4b0082]/10">
                    <Orbit size={80} className="mb-4 opacity-5 animate-spin-slow text-purple-600" />
                    <h3 className="text-xl font-display font-bold">Awaiting Input</h3>
                    <p className="text-xs mt-2">Submit parameters for pedagogical synthesis.</p>
                  </motion.div>
                ) : loading ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-12 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
                    
                    {/* Synchronized Processing Mascot - Only shown during loading */}
                    <NeonAIOsphere state="THINKING" size="lg" />
                    
                    <div className="mt-16 w-full max-w-md">
                      <div className="bg-[#0b1c2e] rounded-3xl p-6 border border-white/10 shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent animate-shimmer" />
                        
                        <div className="flex items-center gap-3 mb-4 text-[#7c3aed]">
                          <Terminal size={18} />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Processing Thought Stream</span>
                        </div>

                        <div className="space-y-3">
                          {processLogs.map((log, idx) => (
                            <MotionDiv 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                              <span className="text-[11px] font-mono text-white/80 lowercase">{log}</span>
                              {idx === processLogs.length - 1 && (
                                <MotionDiv 
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.8, repeat: Infinity }}
                                  className="w-2 h-4 bg-[#7c3aed]/50"
                                />
                              )}
                            </MotionDiv>
                          ))}
                          
                          {processLogs.length < processingMessages.length && (
                            <div className="flex items-center gap-3 opacity-30">
                              <Loader2 size={12} className="text-white animate-spin" />
                              <span className="text-[11px] font-mono text-white/40 italic">pending_task_{processLogs.length + 1}...</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-center gap-8">
                        <div className="flex items-center gap-2">
                           <Activity size={14} className="text-[#7c3aed] animate-pulse" />
                           <span className="text-[9px] font-bold text-[#0b1c2e]/40 uppercase tracking-widest">Neural Link Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Radio size={14} className="text-[#00b894] animate-ping" />
                           <span className="text-[9px] font-bold text-[#0b1c2e]/40 uppercase tracking-widest">Core Synchronized</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="p-8 border-b border-purple-50 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-[#00b894]" />
                        <h4 className="font-display font-bold text-[#0b1c2e]">System Verified</h4>
                      </div>
                      <div className="flex gap-2">
                         <button 
                          onClick={downloadAsImage}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-100 rounded-xl text-[10px] font-bold text-[#4b0082] uppercase tracking-widest hover:border-[#7c3aed] transition-all shadow-sm"
                        >
                          <FileImage size={16} className="text-[#7c3aed]" /> PNG
                        </button>
                        <button 
                          onClick={downloadAsPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-xl text-[10px] font-bold text-white uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-purple-500/10"
                        >
                          <FileDown size={16} className="text-white" /> PDF
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-white">
                      <div ref={downloadRef} className="p-8 md:p-12 space-y-10 relative bg-white min-h-full">
                        <div 
                          className="absolute inset-0 pointer-events-none z-0 opacity-[0.2]" 
                          style={{ 
                            backgroundImage: `url('${watermarkUrl}')`, 
                            backgroundRepeat: 'repeat', 
                            backgroundSize: '180px 180px' 
                          }} 
                        />

                        <div className="relative z-10 space-y-10">
                          <div className="hidden download-branding mb-10 border-b-2 border-purple-100 pb-6 flex items-center justify-between">
                             <div>
                                <h2 className="text-3xl font-display font-bold text-[#0b1c2e]">AcadUp <span className="text-[#7c3aed]">AI Tutor</span></h2>
                                <p className="text-[10px] font-bold text-[#4b0082]/40 uppercase tracking-[0.3em]">Strategic AI Solution Hub</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-bold text-[#4b0082]/40 uppercase tracking-widest">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                             </div>
                          </div>

                          <div className="bg-purple-50/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-100 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 rounded-bl-[4rem]" />
                             <div className="flex items-center gap-3 mb-6 relative z-10">
                                <HelpCircle size={18} className="text-[#7c3aed]" />
                                <h5 className="text-[10px] font-bold text-[#4b0082]/40 uppercase tracking-widest">Inquiry Received</h5>
                             </div>
                             
                             <div className="relative z-10">
                               {activeResultImage && (
                                 <div className="mb-6 rounded-2xl overflow-hidden border border-purple-100 max-w-sm shadow-md bg-white p-2">
                                    <img src={`data:${activeResultImageMime};base64,${activeResultImage}`} className="w-full object-contain" alt="Original Inquiry" />
                                 </div>
                               )}
                               <p className="text-xl md:text-2xl font-display font-bold text-[#0b1c2e] leading-tight italic">
                                 "{activeResultQuestion || "Diagram analysis in progress..."}"
                               </p>
                             </div>
                          </div>

                          <div className="prose max-w-none">
                             <div className="flex items-center gap-3 mb-8">
                                <Sparkles size={18} className="text-[#7c3aed]" />
                                <h5 className="text-[10px] font-bold text-[#4b0082]/40 uppercase tracking-widest">Verified Solution</h5>
                             </div>
                             {answer?.split('\n').map((line, i) => (
                               <p key={i} className={`text-base md:text-lg mb-4 ${i === 0 && line.startsWith('**') ? 'text-3xl font-display font-bold text-[#7c3aed] border-b-2 border-purple-100 pb-6 mb-8' : line.startsWith('**') ? 'font-bold text-[#0b1c2e] text-xl mt-10' : 'text-[#2d3436]/80 leading-relaxed'}`}>
                                 {line.replace(/\*\*/g, '')}
                               </p>
                             ))}
                          </div>

                          {sources.length > 0 && (
                            <div className="pt-10 border-t border-purple-100">
                              <h5 className="text-[10px] font-bold text-[#4b0082]/40 uppercase tracking-widest mb-6 text-purple-600">Pedagogical Sources</h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {sources.slice(0, 4).map((s, idx) => (
                                  <a key={idx} href={s.uri} target="_blank" className="flex flex-col p-4 bg-purple-50/50 rounded-2xl border border-purple-100 hover:border-[#7c3aed] transition-all group">
                                    <span className="text-xs font-bold text-[#0b1c2e] mb-1 truncate group-hover:text-[#7c3aed]">{s.title}</span>
                                    <span className="text-[9px] font-medium text-[#4b0082]/30 uppercase truncate">{new URL(s.uri).hostname}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="hidden download-branding mt-12 pt-8 border-t border-purple-100 flex items-center justify-between opacity-40">
                             <p className="text-[8px] font-bold uppercase tracking-widest text-[#4b0082]">© 2024 AcadUp EdTech Private Limited</p>
                             <p className="text-[8px] font-bold uppercase tracking-widest text-[#4b0082]">Enterprise AI Verification</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnyAnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        @media screen {
          .download-branding { display: none !important; }
        }
      `}} />
    </div>
  );
};
