"use client";

import { useRef, useState, useEffect } from "react";
import { Bot, Send, X, Loader2, Sparkles, Brain, Cpu, MessageSquare, Terminal, Zap, ShieldCheck, Activity, ChevronRight, Globe, Command } from "lucide-react";
import { clsx } from "clsx";

export default function AIManagerModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string, timestamp: string }[]>([
    { role: 'ai', content: "Tactical Support Engine initialized. Systems at 100% capacity. How can I assist your trajectory today?", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (data.text) {
        setMessages(prev => [...prev, { role: 'ai', content: data.text, timestamp: aiTimestamp }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', content: `CRITICAL ERROR: ${data.error}`, timestamp: aiTimestamp }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "CONNECTION FAILURE: Unable to link with neural core.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="bg-gray-900 text-white px-10 py-5 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-brand-500/20 flex items-center gap-5 group active:scale-95"
      >
        <Sparkles size={20} className="group-hover:animate-pulse group-hover:rotate-12 transition-transform duration-500" /> 
        Initialize Intelligence Hub
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/80 backdrop:backdrop-blur-3xl p-0 rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-white/10 w-[600px] h-[850px] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="flex flex-col h-full bg-white font-sans selection:bg-brand-100">
          {/* Advanced AI Header: Tactical Command Center Style */}
          <div className="p-12 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Cpu size={240} />
            </div>
            
            <div className="flex items-center gap-8 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-20 h-20 bg-gray-900 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:scale-110">
                  <Bot size={36} className="text-brand-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg shadow-green-100 animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tighter text-2xl">Academic Brain</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 rounded-lg border border-brand-100">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">NEURAL v5.0</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                     <Activity size={14} className="text-green-500" />
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logic Stream Stable</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={closeModal} className="w-16 h-16 rounded-[2rem] hover:bg-white flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100 shadow-sm active:scale-90 hover:rotate-90 duration-500">
              <X size={32} />
            </button>
          </div>

          {/* Tactical Chat Canvas: Immersive Scrolling Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide bg-[radial-gradient(#f3f3f3_1px,transparent_1px)] [background-size:32px_32px]">
            {messages.map((m, i) => (
              <div key={i} className={clsx("flex flex-col group/msg animate-in fade-in slide-in-from-bottom-4 duration-500", m.role === 'user' ? "items-end" : "items-start")} style={{ animationDelay: `${i * 100}ms` }}>
                <div className={clsx(
                  "max-w-[85%] p-10 rounded-[3rem] text-[15px] font-black tracking-tight leading-relaxed shadow-sm transition-all relative overflow-hidden group/bubble",
                  m.role === 'user' 
                    ? "bg-gray-900 text-white rounded-tr-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]" 
                    : "bg-white border-2 border-gray-50 text-gray-800 rounded-tl-none hover:border-brand-100"
                )}>
                  {m.role === 'ai' && (
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none group-hover/bubble:rotate-12 transition-transform duration-700">
                       <Zap size={64} />
                    </div>
                  )}
                  {m.content}
                </div>
                <div className="flex items-center gap-4 mt-4 px-4 opacity-40 group-hover/msg:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    {m.role === 'user' ? "Authorized Vector" : "Neural Engine Core"}
                  </span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{m.timestamp}</span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white border-2 border-gray-50 p-10 rounded-[3rem] rounded-tl-none flex items-center gap-8 shadow-sm">
                  <div className="flex gap-2.5">
                    <div className="w-3 h-3 bg-brand-600 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-brand-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-3 h-3 bg-brand-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Traversing Neural Latent Space...</span>
                </div>
              </div>
            )}
          </div>

          {/* Precision Command Console: High-Tech Input Area */}
          <div className="p-12 bg-white border-t border-gray-50 bg-gray-50/20 backdrop-blur-3xl">
            <form onSubmit={handleSend} className="relative group">
              <div className="absolute inset-0 bg-brand-500/10 rounded-[3.5rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative flex items-center">
                <div className="absolute left-8 text-gray-300 group-focus-within:text-brand-500 transition-colors duration-500">
                   <Command size={24} />
                </div>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Execute tactical command..."
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-[3.5rem] pl-20 pr-28 py-9 text-[17px] font-black text-gray-900 focus:outline-none focus:ring-[12px] focus:ring-brand-500/5 focus:bg-white focus:border-brand-300 transition-all placeholder:text-gray-200 uppercase tracking-tight shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-5 w-20 h-20 bg-gray-900 text-white rounded-[2rem] flex items-center justify-center hover:bg-brand-600 transition-all disabled:opacity-10 shadow-2xl active:scale-90 group/btn overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  <Send size={28} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative z-10" />
                </button>
              </div>
            </form>
            
            <div className="flex items-center justify-between mt-10 px-6">
               <div className="flex items-center gap-10">
                  <div className="flex items-center gap-3 group/stat cursor-help">
                    <Cpu size={16} className="text-gray-300 group-hover/stat:text-brand-500 transition-colors" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] group-hover/stat:text-gray-900 transition-colors">GROQ v3.5-TURBO</span>
                  </div>
                  <div className="flex items-center gap-3 group/stat cursor-help">
                    <Brain size={16} className="text-gray-300 group-hover/stat:text-brand-500 transition-colors" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] group-hover/stat:text-gray-900 transition-colors">Context: 128K</span>
                  </div>
                  <div className="flex items-center gap-3 group/stat cursor-help">
                    <Globe size={16} className="text-gray-300 group-hover/stat:text-brand-500 transition-colors" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] group-hover/stat:text-gray-900 transition-colors">Real-time Web Access</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-xl border border-green-100">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">Core Secure</span>
               </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}




