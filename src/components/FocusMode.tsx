"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { X, Clock } from "lucide-react";

interface FocusContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false);

  const toggleFocusMode = () => setIsFocusMode(!isFocusMode);

  return (
    <FocusContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
      {isFocusMode && (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center text-white">
          <button 
            onClick={toggleFocusMode}
            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="text-center">
            <Clock size={80} className="mx-auto mb-8 text-brand-500 animate-pulse" />
            <h2 className="text-4xl font-black mb-4 tracking-tighter">Focus Mode Active</h2>
            <p className="text-gray-400 text-lg mb-12">No distractions, just you and your goals.</p>
            
            <div className="text-6xl font-mono tabular-nums">25:00</div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mt-4">Pomodoro Timer</p>
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
