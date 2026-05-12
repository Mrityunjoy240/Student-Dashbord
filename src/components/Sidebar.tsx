"use client";

import { Layers, Home, BookOpen, Calendar, FileText, CheckSquare, StickyNote, FolderOpen, Briefcase, Code, TrendingUp, Bot, Settings, Clock, Play, Map, ChevronRight, Activity, Terminal, Shield, Zap, Target, Sparkles, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFocus } from "./FocusMode";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const { toggleFocusMode } = useFocus();
  const pathname = usePathname();

  const groups = [
    {
      title: "Tactical Matrix",
      items: [
        { icon: Home, label: "Command Center", href: "/" },
        { icon: Target, label: "Mission Roadmap", href: "/roadmap" },
        { icon: Briefcase, label: "Career Vector", href: "/career" },
      ]
    },
    {
      title: "Academic Intelligence",
      items: [
        { icon: BookOpen, label: "Knowledge Registry", href: "/subjects" },
        { icon: Calendar, label: "Temporal Feed", href: "/calendar" },
        { icon: Shield, label: "Exam Protocols", href: "/exams" },
      ]
    },
    {
      title: "Execution Layer",
      items: [
        { icon: CheckSquare, label: "Operations", href: "/tasks" },
        { icon: StickyNote, label: "Neural Logs", href: "/notes" },
        { icon: Code, label: "Logic Drills", href: "/dsa" },
        { icon: FolderOpen, label: "Archive Registry", href: "/resources" },
      ]
    }
  ];

  return (
    <aside className="w-80 border-r-2 border-gray-50 flex flex-col bg-white h-screen sticky top-0 font-sans antialiased shrink-0 overflow-hidden group/sidebar shadow-2xl shadow-gray-100">
      {/* Premium Header: Mission Command */}
      <div className="p-12 pb-8">
        <Link href="/" className="flex items-center gap-6 group">
          <div className="relative">
            <div className="w-16 h-16 bg-gray-900 rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:-rotate-6 transition-all duration-700">
              <Layers size={32} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-gray-900 text-2xl leading-none uppercase">Academic</span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-600">OS v3.0</span>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                 <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">LIVE</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Matrix: The Backbone */}
      <nav className="flex-1 px-8 mt-12 space-y-16 overflow-y-auto scrollbar-hide pb-16">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="relative">
            <div className="flex items-center justify-between px-4 mb-8">
              <h3 className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">
                {group.title}
              </h3>
              <div className="w-12 h-[1.5px] bg-gray-50"></div>
            </div>
            <div className="space-y-2">
              {group.items.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className={cn(
                      "flex items-center justify-between px-6 py-4 text-[12px] font-black uppercase tracking-[0.15em] rounded-2xl transition-all duration-500 group/item relative", 
                      isActive 
                        ? "bg-gray-900 text-white shadow-2xl shadow-gray-300 translate-x-3" 
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <item.icon size={20} className={cn("transition-all duration-700", isActive ? "text-brand-400 scale-125 rotate-6" : "text-gray-300 group-hover/item:text-gray-900")} />
                      <span className="relative z-10">{item.label}</span>
                    </div>
                    {isActive ? (
                       <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_15px_rgba(124,58,237,1)] animate-pulse"></div>
                    ) : (
                       <ChevronRight size={16} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all text-gray-300" />
                    )}
                    {/* Active Background Glow */}
                    {isActive && (
                       <div className="absolute inset-0 bg-brand-500/5 blur-2xl rounded-2xl -z-10"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Status Interface: The Pilot Profile */}
      <div className="p-10 mt-auto border-t-2 border-gray-50 bg-gray-50/20 backdrop-blur-md">
        <div className="bg-white rounded-[2.5rem] p-7 mb-8 border-2 border-gray-50 group cursor-pointer hover:border-brand-200 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
             <Globe size={80} />
          </div>
          
          <div className="flex items-center gap-5 mb-8 relative z-10">
            <div className="relative group/avatar">
              <div className="w-14 h-14 rounded-[1.25rem] bg-gray-900 flex items-center justify-center text-[14px] font-black text-white shadow-2xl transition-transform group-hover/avatar:scale-110">
                RA
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black text-gray-900 truncate uppercase tracking-widest leading-none">Rajendra A.</p>
              <div className="flex items-center gap-2 mt-2">
                 <Terminal size={12} className="text-brand-500" />
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Rank Alpha-4</p>
              </div>
            </div>
            <div className="p-2 rounded-xl hover:bg-gray-50 transition-colors">
               <Settings size={20} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
            </div>
          </div>
          <button 
            onClick={toggleFocusMode}
            className="w-full flex items-center justify-center gap-4 bg-gray-900 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 group/focus"
          >
            <Play size={14} fill="currentColor" className="group-hover/focus:scale-125 group-hover/focus:rotate-12 transition-transform" /> Start Deep Focus
          </button>
        </div>
        
        <div className="flex items-center justify-between px-4">
           <div className="flex items-center gap-3">
              <Activity size={16} className="text-green-500" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Neural Stream Stable</span>
           </div>
           <div className="flex items-center gap-2">
              <Shield size={12} className="text-gray-200" />
              <span className="text-[10px] font-black text-gray-200 tracking-tighter">v3.0.0-PRO</span>
           </div>
        </div>
      </div>
    </aside>
  );
}



