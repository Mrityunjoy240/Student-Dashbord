"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { X, Clock, Play, Pause, RotateCcw, Brain, Zap, Target, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

interface FocusContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    if (isFocusMode) setIsActive(false); // Stop timer when exiting
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a subtle notification sound or show a notice
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  }, []);

  return (
    <FocusContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
      {isFocusMode && (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center text-white font-sans selection:bg-brand-500/30 overflow-hidden animate-in fade-in duration-700">
          {/* Advanced Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[160px] animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>
          </div>

          {/* HUD Elements */}
          <div className="absolute top-10 left-10 flex items-center gap-4 animate-in slide-in-from-left duration-700 delay-200">
             <div className="w-1.5 h-10 bg-brand-500 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]"></div>
             <div>
                <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.3em]">Neural Protocol</p>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Focus State: ACTIVE</h3>
             </div>
          </div>

          <button 
            onClick={toggleFocusMode}
            className="absolute top-10 right-10 text-gray-500 hover:text-white transition-all p-3 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-white/20 animate-in slide-in-from-right duration-700 delay-200"
            aria-label="Exit Focus Mode"
          >
            <X size={28} />
          </button>
          
          <div className="text-center relative z-10 max-w-2xl px-10 animate-in zoom-in duration-1000">
            <div className="mb-16 relative">
              <div className={clsx(
                "w-32 h-32 mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex items-center justify-center shadow-2xl transition-all duration-1000",
                isActive && "scale-110 rotate-6 border-brand-500/30"
              )}>
                <Brain size={48} className={clsx("transition-all duration-1000", isActive ? "text-brand-400 animate-pulse" : "text-gray-600")} />
              </div>
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-brand-500/10 rounded-[4rem] animate-ping"></div>
                </div>
              )}
            </div>
            
            <div className="space-y-4 mb-20">
               <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white/90">Deep Work</h2>
               <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-[1px] bg-white/10"></div>
                  <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.4em]">Operational Synchronization</p>
                  <div className="w-8 h-[1px] bg-white/10"></div>
               </div>
            </div>
            
            <div className="mb-20">
              <div className="text-[160px] font-black tabular-nums tracking-tighter leading-none mb-12 text-white drop-shadow-[0_0_50px_rgba(124,58,237,0.4)] transition-all duration-500">
                {formatTime(timeLeft)}
              </div>
              
              <div className="flex items-center justify-center gap-10">
                <button 
                  onClick={() => setIsActive(!isActive)}
                  className="w-24 h-24 bg-white text-gray-950 rounded-[2.5rem] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-white/10 group"
                  aria-label={isActive ? "Pause Timer" : "Start Timer"}
                >
                  {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="ml-1.5" fill="currentColor" />}
                </button>
                <button 
                  onClick={resetTimer}
                  className="w-20 h-20 bg-gray-900 text-gray-500 border border-white/5 rounded-[2rem] flex items-center justify-center hover:bg-gray-800 hover:text-white active:scale-95 transition-all shadow-xl"
                  aria-label="Reset Timer"
                >
                  <RotateCcw size={28} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              {["25", "45", "60"].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setIsActive(false);
                    setTimeLeft(parseInt(mins) * 60);
                  }}
                  className={clsx(
                    "py-4 px-10 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all duration-300",
                    timeLeft === parseInt(mins) * 60 
                      ? "bg-brand-600 border-brand-500 text-white shadow-xl shadow-brand-500/20" 
                      : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:border-white/10"
                  )}
                >
                  {mins} Phase
                </button>
              ))}
            </div>
          </div>

          {/* Bottom HUD */}
          <div className="absolute bottom-10 flex items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <div className="flex items-center gap-3">
                <Zap size={14} className="text-brand-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Peak Performance</span>
             </div>
             <div className="w-1 h-1 bg-white/20 rounded-full"></div>
             <div className="flex items-center gap-3">
                <Target size={14} className="text-brand-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Objective Locked</span>
             </div>
          </div>
        </div>
      )}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) throw new Error("useFocus must be used within FocusProvider");
  return context;
}



export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) throw new Error("useFocus must be used within FocusProvider");
  return context;
}
