
import React, { useState, useRef, useEffect } from 'react';
// Fix: Import Variants as a type
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Upload, Sparkles, BookOpen, Download, 
  Image as ImageIcon, Loader2, RefreshCw, 
  ArrowRight, AlertCircle, Trash2, Mic, MicOff,
  FileText, Brain, Phone, StopCircle,
  ShieldCheck, Globe2, Camera, Search,
  CheckCircle, Zap, Volume2, ExternalLink,
  History, X, Clock, MessageSquare, Globe,
  Award, Star, ZapOff, Trophy, Lightbulb
} from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

// Fix: Cast motion components to any to bypass property errors
const MotionDiv = motion.div as any;
const AnyAnimatePresence = AnimatePresence as any;

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

export const Studio = () => {
  const [questionText, setQuestionText] = useState('');
  const [instructionText, setInstructionText] = useState('');
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
  const [isEduSearch, setIsEduSearch] = useState(false);
  const [isToughProblem, setIsToughProblem] = useState(false);
  
  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const sessionRef = useRef<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Upload an image file (PNG/JPG).');
        return;
      }
      const base64 = await fileToBase64(file);
      setQuestionImage(base64);
      setImageMimeType(file.type);
      setError(null);
    }
  };

  const handleSolve = async () => {
    if (!questionText.trim() && !questionImage) {
      setError('Provide a question or upload an image.');
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);
    
    // Heuristic for "tough" problems (advanced keywords)
    const toughKeywords = ['complex', 'derive', 'mechanism', 'quantum', 'integration', 'advanced', 'hardest', 'tough', 'challenge', 'impossible'];
    const eduKeywords = ['best institute', 'coaching', 'preparation', 'neet', 'jee', 'iit', 'academy', 'center', 'school', 'tuition', 'physics', 'chemistry', 'math', 'biology', 'history', 'geography', 'civics', 'english', 'hindi', 'class', 'rank', 'topper'];
    
    const isEduQuery = eduKeywords.some(kw => questionText.toLowerCase().includes(kw));
    const isActuallyTough = toughKeywords.some(kw => questionText.toLowerCase().includes(kw)) || questionText.length > 100;
    
    setIsEduSearch(isEduQuery);
    setIsToughProblem(isActuallyTough);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const firstName = userName || 'Student';
      
      const systemInstruction = `You are the AcadUp Super-Fast Pedagogy Engine, the ultimate mentor for Bharat's future toppers. 
      
      YOUR PERSONALITY: You are a sharp, supportive mentor who loves tough problems. You engage students by showing them the beauty in complex topics.
      
      STRICT OPERATIONAL RULES:
      1. ACADEMIC PRIORITY: Your primary job is to solve the problem accurately and clearly. Be a world-class teacher.
      2. SITUATIONAL PLUGGING: Do NOT plug AcadUp features (SIP, ALC, App) in every response. Only mention them if the student's query suggests they are struggling with their overall preparation strategy, lack expert guidance in their local town, or need a structured hybrid learning path. If it's a simple math question, just provide a brilliant solution.
      3. SELECTIVE ENCOURAGEMENT: When a student asks a genuinely difficult question, act impressed! Use phrases like "Now THAT is a top-percentile inquiry!" to build their confidence.
      4. ACADEMIC FOCUS: If the question is clearly non-academic, use pedagogical wit to nudge them back to study. E.g., "While that's interesting, your rank would appreciate if we focused on this integration instead. Let's get back to work!"
      5. SEARCH GROUNDING: Use googleSearch tool ONLY for educational diagrams, science images, or math charts.
      6. NO LaTeX: Use plain text formulas.
      7. GREETING: Be warm but goal-oriented. "Welcome back, future ranker ${firstName}. Let's conquer this doubt."`;

      let modelToUse = 'gemini-3-flash-preview';
      
      if (isThinking) {
        modelToUse = 'gemini-3-pro-preview';
      }

      const contents: any[] = [];
      if (questionImage) {
        contents.push({ inlineData: { data: questionImage, mimeType: imageMimeType || 'image/png' } });
      }
      contents.push({ text: questionText || "Pedagogical analysis requested." });

      const solveResponse = await ai.models.generateContent({
        model: modelToUse,
        contents: [{ parts: contents }],
        config: {
          systemInstruction,
          thinkingConfig: isThinking ? { thinkingBudget: 32768 } : undefined,
          tools: useSearch ? [{ googleSearch: {} }] : undefined,
          temperature: 0.2,
        }
      });

      const resultText = solveResponse.text;
      setAnswer(resultText);

      const groundingChunks = solveResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const foundSources = groundingChunks
        ? groundingChunks.map((chunk: any) => chunk.web).filter((web: any) => web && web.uri)
        : [];
      setSources(foundSources);

      const newHistoryItem: ChatHistoryItem = {
        id: Date.now(),
        question: questionText || (questionImage ? "[Analyzed Image]" : "Question"),
        answer: resultText,
        sources: foundSources,
        timestamp: new Date().toISOString()
      };
      const updatedHistory = [newHistoryItem, ...chatHistory].slice(0, 15);
      setChatHistory(updatedHistory);
      localStorage.setItem('acadup_studio_history', JSON.stringify(updatedHistory));

    } catch (err: any) {
      console.error(err);
      setError("Intelligence engine is busy. Retrying in 2s...");
    } finally {
      setLoading(false);
    }
  };

  const startLiveTutor = async () => {
    if (isLiveActive) {
      setIsLiveActive(false);
      sessionRef.current?.close();
      return;
    }

    try {
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
          systemInstruction: 'You are an engaging academic voice mentor. Solve problems first. Only talk about AcadUp services if the student sounds lost in their general preparation journey or asks about local hubs. Be smart, quick, and supportive.',
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
            if (message.serverContent?.outputTranscription) {
              setLiveTranscript(prev => [...prev.slice(-4), `AI: ${message.serverContent?.outputTranscription?.text}`]);
            }
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
      setError("Microphone access is required for Live Tutor.");
    }
  };

  const downloadPDF = () => {
    if (!answer) return;
    const doc = new jsPDF();
    
    doc.setTextColor(245, 245, 245);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    for (let x = 0; x < 210; x += 70) {
      for (let y = 0; y < 297; y += 70) {
        doc.text("AcadUp", x + 10, y + 10, { angle: 45 });
      }
    }

    doc.setTextColor(11, 28, 46);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AcadUp AI Solution", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(240, 60, 46);
    doc.text(`Student: ${userName || 'Scholar'} | Solution Powered by AcadUp AI`, 20, 32);
    
    doc.setDrawColor(240, 60, 46);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    doc.setTextColor(45, 52, 54);
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(answer, 170);
    doc.text(splitText, 20, 45);

    if (sources.length > 0) {
      doc.addPage();
      doc.setTextColor(245, 245, 245);
      for (let x = 0; x < 210; x += 70) {
        for (let y = 0; y < 297; y += 70) {
          doc.text("AcadUp", x + 10, y + 10, { angle: 45 });
        }
      }
      doc.setTextColor(11, 28, 46);
      doc.setFontSize(16);
      doc.text("Visual Reference & AcadUp Sources", 20, 25);
      doc.setFontSize(10);
      sources.forEach((s, idx) => {
        doc.text(`${idx + 1}. ${s.title || "Academic Visual"}`, 20, 40 + (idx * 15));
        doc.setTextColor(0, 0, 255);
        doc.text(s.uri, 20, 45 + (idx * 15));
        doc.setTextColor(11, 28, 46);
      });
    }
    
    doc.save(`AcadUp_Study_Solution_${Date.now()}.pdf`);
  };

  const downloadPNG = async () => {
    if (!answerRef.current) return;
    try {
      const canvas = await html2canvas(answerRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false
      });
      const link = document.createElement('a');
      link.download = `AcadUp_Solution_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      setError('Snapshot failed.');
    }
  };

  const clearAll = () => {
    setQuestionText('');
    setQuestionImage(null);
    setAnswer(null);
    setSources([]);
    setError(null);
    setIsToughProblem(false);
  };

  const selectHistoryItem = (item: ChatHistoryItem) => {
    setQuestionText(item.question);
    setAnswer(item.answer);
    setSources(item.sources);
    setIsHistoryOpen(false);
  };

  const deleteHistoryItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedHistory = chatHistory.filter(item => item.id !== id);
    setChatHistory(updatedHistory);
    localStorage.setItem('acadup_studio_history', JSON.stringify(updatedHistory));
  };

  return (
    <div className="animate-in fade-in duration-700 pt-24 md:pt-32 pb-16 px-4 min-h-screen bg-[#faf8f5]">
      {/* Side History Drawer */}
      <AnyAnimatePresence>
        {isHistoryOpen && (
          <>
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-[#0b1c2e]/40 backdrop-blur-sm z-[100]"
            />
            <MotionDiv 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-[101] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0b1c2e]/5 flex items-center justify-center text-[#f03c2e]">
                    <History size={20} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#0b1c2e]">Doubt History</h3>
                </div>
                <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-[#faf8f5] rounded-full text-[#0b1c2e]/20 hover:text-[#f03c2e] transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-20 opacity-20">
                    <MessageSquare size={48} className="mx-auto mb-4" />
                    <p className="font-bold uppercase tracking-widest text-[10px]">No History Yet</p>
                  </div>
                ) : (
                  chatHistory.map((item) => (
                    <MotionDiv 
                      key={item.id}
                      whileHover={{ scale: 1.02, x: -4 }}
                      onClick={() => selectHistoryItem(item)}
                      className="group p-5 bg-[#faf8f5] rounded-3xl border border-black/5 hover:border-[#f03c2e]/20 cursor-pointer transition-all relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2 text-[8px] font-bold text-[#0b1c2e]/30 uppercase tracking-[0.2em]">
                          <Clock size={10} />
                          {new Date(item.id).toLocaleDateString()}
                        </div>
                        <button 
                          onClick={(e) => deleteHistoryItem(item.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#f03c2e] hover:bg-white rounded-lg transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-[#0b1c2e] line-clamp-2 leading-tight">
                        {item.question}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[8px] font-bold text-[#00b894] uppercase tracking-widest">
                        <CheckCircle size={10} /> Solution Saved
                      </div>
                    </MotionDiv>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-black/5 text-center">
                <p className="text-[9px] font-bold text-[#0b1c2e]/30 uppercase tracking-[0.3em]">
                  Storing your last 15 interactions
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnyAnimatePresence>

      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-10 relative">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-[#0b1c2e] text-white px-6 py-2 rounded-full text-xs font-bold mb-6 border border-[#f03c2e]/20 shadow-lg"
          >
            <Sparkles size={14} className="text-[#f03c2e]" />
            ULTIMATE ACADEMIC MENTOR ACTIVE
          </MotionDiv>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-[#0b1c2e] tracking-tighter mb-4">
            Acadup <span className="text-[#f03c2e]">AI</span> Solutions
          </h1>
          <p className="text-lg text-[#2d3436]/60 max-w-2xl mx-auto font-medium">
            Where tough academic problems meet Bharat's smartest pedagogical engine.
          </p>

          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white border border-black/5 rounded-2xl text-[10px] font-bold text-[#0b1c2e] uppercase tracking-widest hover:border-[#f03c2e] hover:text-[#f03c2e] shadow-lg transition-all"
          >
            <History size={16} /> Doubt History
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-[#0b1c2e]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#f03c2e]" />
              
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h3 className="text-xl font-display font-bold text-[#0b1c2e] flex items-center gap-2">
                  <BookOpen size={20} className="text-[#f03c2e]" /> Intelligence Desk
                </h3>
                <div className="flex items-center gap-2 bg-[#faf8f5] p-1 rounded-xl border border-black/5">
                  <button 
                    onClick={() => setIsThinking(!isThinking)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isThinking ? 'bg-[#0b1c2e] text-white shadow-lg' : 'text-[#0b1c2e]/40'}`}
                  >
                    <Brain size={12} /> Deep Think
                  </button>
                  <button 
                    onClick={() => setUseSearch(!useSearch)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${useSearch ? 'bg-[#00b894] text-white shadow-lg' : 'text-[#0b1c2e]/40'}`}
                  >
                    <Search size={12} /> Visual Search
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {/* Visual Capture */}
                <div className="space-y-4">
                  {!questionImage ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-black/5 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-[#faf8f5] transition-all group">
                        <Upload size={24} className="text-[#f03c2e] mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Upload Doubt</span>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                      </button>
                      <button onClick={() => cameraInputRef.current?.click()} className="border-2 border-dashed border-black/5 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-[#faf8f5] transition-all group">
                        <Camera size={24} className="text-[#00b894] mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Take Snapshot</span>
                        <input type="file" ref={cameraInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-black/5">
                      <img src={`data:${imageMimeType};base64,${questionImage}`} className="w-full max-h-48 object-contain" alt="Target" />
                      <button onClick={() => setQuestionImage(null)} className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-[#f03c2e] shadow-xl"><Trash2 size={16} /></button>
                    </div>
                  )}
                </div>

                {/* Question Text */}
                <div>
                  <textarea 
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="E.g. Help me derive the Schrodinger Equation step-by-step..."
                    className="w-full h-32 bg-[#faf8f5] border border-black/5 rounded-2xl p-4 text-[#0b1c2e] focus:outline-none focus:border-[#f03c2e] transition-all resize-none text-sm font-medium"
                  />
                </div>

                <div className="flex gap-4">
                  <button onClick={handleSolve} disabled={loading} className="flex-1 bg-[#0b1c2e] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-110 shadow-xl disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} className="text-[#f03c2e]" /> {isThinking ? 'Pro Solve' : 'Rapid Solve'}</>}
                  </button>
                  <button onClick={clearAll} className="p-5 bg-white border border-black/5 text-black/20 rounded-2xl hover:text-[#f03c2e] transition-all"><RefreshCw size={24} /></button>
                </div>
              </div>
            </div>

            {/* Voice Tutor */}
            <div className={`p-8 rounded-[2.5rem] shadow-xl transition-all border ${isLiveActive ? 'bg-[#f03c2e] text-white border-transparent scale-[1.02]' : 'bg-white border-black/5 text-[#0b1c2e]'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone size={24} className={isLiveActive ? 'animate-pulse' : 'text-[#f03c2e]'} />
                  <div>
                    <h4 className="font-display font-bold text-lg">Live Academic Mentor</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isLiveActive ? 'text-white/60' : 'text-black/30'}`}>
                      {isLiveActive ? 'ENGAGED SESSION' : 'REAL-TIME VOICE'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={startLiveTutor}
                  className={`p-4 rounded-full transition-all ${isLiveActive ? 'bg-white text-[#f03c2e]' : 'bg-[#0b1c2e] text-white shadow-xl hover:scale-105'}`}
                >
                  {isLiveActive ? <StopCircle size={28} /> : <Mic size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] h-full min-h-[600px] flex flex-col relative overflow-hidden shadow-2xl border border-white">
              <AnyAnimatePresence mode="wait">
                {!answer && !loading ? (
                  <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#0b1c2e]/20">
                    <Brain size={64} className="mb-6 opacity-50" />
                    <h3 className="text-2xl font-display font-bold text-[#0b1c2e]/40">Intelligence Desk</h3>
                    <p className="max-w-xs mx-auto mt-2 text-sm">Facing a tough one? AcadUp is ready to crush it with you. Submit your doubt.</p>
                  </MotionDiv>
                ) : loading ? (
                  <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-12">
                    <div className="relative mb-8">
                       <MotionDiv animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-24 h-24 rounded-full border-4 border-[#faf8f5] border-t-[#0b1c2e]" />
                       <Zap size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f03c2e] animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-[#0b1c2e]">Analyzing...</h3>
                    <p className="text-[#0b1c2e]/40 font-bold uppercase text-[10px] tracking-widest mt-2">Connecting to High-Speed Pedagogical Nodes</p>
                  </MotionDiv>
                ) : (
                  <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="p-8 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#00b894]/10 text-[#00b894] rounded-2xl flex items-center justify-center"><CheckCircle size={24} /></div>
                        <div>
                          <h4 className="font-display font-bold">Concept Mastered</h4>
                          <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Grounding Diagrams via Search</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={downloadPDF} title="Download PDF" className="p-3 bg-[#0b1c2e] text-white rounded-xl shadow-lg hover:scale-105 transition-all"><Download size={20} /></button>
                        <button onClick={downloadPNG} title="Save Image" className="p-3 bg-white border border-black/5 text-[#0b1c2e] rounded-xl shadow-lg hover:scale-105 transition-all"><ImageIcon size={20} /></button>
                      </div>
                    </div>

                    <div 
                      ref={answerRef} 
                      className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 relative"
                      style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Poppins' font-weight='bold' font-size='16' fill='%230b1c2e' fill-opacity='0.03' transform='rotate(-45, 100, 100)'%3EAcadUp%3C/text%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat'
                      }}
                    >
                      {/* Engaging Recognition Banner */}
                      {(isToughProblem || isEduSearch) && (
                        <MotionDiv 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-gradient-to-r from-[#0b1c2e] to-[#1a4d8f] p-6 rounded-[2rem] text-white relative overflow-hidden shadow-xl"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full" />
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                              {isToughProblem ? <Trophy className="text-[#f03c2e]" size={24} /> : <Lightbulb className="text-yellow-400" size={24} />}
                            </div>
                            <div>
                              <h5 className="font-display font-bold text-lg">
                                {isToughProblem ? "Now that's a Rank-Booster Problem!" : "Top Performance Strategy Detected"}
                              </h5>
                              <p className="text-white/60 text-xs">
                                {isToughProblem 
                                  ? "Analyzing this helps you beat the 99th percentile. Glad you brought this to AcadUp." 
                                  : "AcadUp's SIP/ALC models ensure this level of guidance is always within your reach."}
                              </p>
                            </div>
                          </div>
                        </MotionDiv>
                      )}

                      <div className="prose max-w-none relative z-10">
                        {answer?.split('\n').map((line, i) => {
                          const isHeading = line.startsWith('**');
                          return (
                            <p key={i} className={`text-base md:text-xl leading-relaxed mb-4 ${isHeading ? 'font-display font-bold text-[#0b1c2e] text-2xl' : 'text-[#2d3436]/70'}`}>
                              {line.replace(/\*\*/g, '')}
                            </p>
                          );
                        })}
                      </div>

                      {sources.length > 0 && (
                        <MotionDiv 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-8 border-t border-black/5 relative z-10"
                        >
                          <h5 className="text-xs font-bold text-[#0b1c2e] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <ImageIcon size={14} className="text-[#00b894]" /> Search-Grounded Diagrams & Visuals
                          </h5>
                          <div className="grid grid-cols-1 gap-4">
                            {sources.slice(0, 5).map((source, idx) => (
                              <a 
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 bg-[#faf8f5] rounded-[1.5rem] border border-black/5 flex items-center justify-between group hover:border-[#00b894]/30 hover:shadow-lg transition-all"
                              >
                                <div className="flex flex-col flex-1 min-w-0 pr-4">
                                  <span className="text-sm font-bold text-[#0b1c2e] group-hover:text-[#00b894] transition-colors truncate">{source.title || "Academic Diagram/Visual"}</span>
                                  <span className="text-[10px] text-black/30 truncate mt-1">{new URL(source.uri).hostname}</span>
                                </div>
                                <div className="p-3 bg-white rounded-xl text-[#0b1c2e]/20 group-hover:text-[#00b894] group-hover:bg-[#00b894]/5 transition-all">
                                  <ExternalLink size={18} />
                                </div>
                              </a>
                            ))}
                          </div>
                          <p className="mt-6 text-[10px] font-bold text-[#0b1c2e]/30 uppercase tracking-widest text-center italic">
                            Sources verified via Google Search Grounding for high-fidelity academic learning.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnyAnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
