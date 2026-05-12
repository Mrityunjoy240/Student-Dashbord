"use client";

import { useRef } from "react";
import { X, TrendingUp, BarChart3, Layers, ArrowUpRight, CheckCircle2, ChevronRight, Target, Zap, Activity, Shield, Sparkles, Brain, PieChart, Info, Command, Globe, Rocket } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DetailedProgressModalProps {
  progress: number;
  targetPackage: string;
  targetRole?: string | null;
  subjects: {
    name: string;
    completed: number;
    total: number;
    color: string;
  }[];
  totalTasks: number;
  completedTasks: number;
}

export default function DetailedProgressModal({ 
  progress, 
  targetPackage, 
  targetRole, 
  subjects,
  totalTasks,
  completedTasks
}: DetailedProgressModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <>
      <button 
        onClick={openModal}
        className="cursor-pointer group h-full w-full text-left appearance-none focus:outline-none"
        aria-label="View detailed progress analytics"
      >
        <div className="bg-white border-2 border-gray-50 rounded-[4rem] p-12 shadow-2xl shadow-gray-100 group-hover:border-brand-200 transition-all duration-500 h-full flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
             <BarChart3 size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-12">
              <div className="bg-brand-50 border border-brand-100 rounded-2xl px-5 py-2 flex items-center gap-3">
                <Target size={16} className="text-brand-600" />
                <h2 className="text-[11px] font-black text-brand-900 uppercase tracking-[0.3em]">Trajectory Status</h2>
              </div>
              <div className="text-gray-200 group-hover:text-brand-500 transition-all duration-700 group-hover:rotate-12">
                <TrendingUp size={28} />
              </div>
            </div>
            
            <div className="flex items-baseline gap-4 mb-3">
              <div className="text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">{progress}%</div>
              <div className="flex items-center gap-2 text-[12px] font-black text-green-600 bg-green-50 px-4 py-1.5 rounded-xl uppercase tracking-[0.2em] border border-green-100">
                 <Activity size={14} className="animate-pulse" />
                 OPTIMAL
              </div>
            </div>
            <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
               <Rocket size={14} className="text-gray-300" /> Primary Objective: {targetPackage}
            </p>
            
            <div className="space-y-6">
              <div className="w-full bg-gray-50 border-2 border-gray-50 rounded-full h-4 overflow-hidden p-1 shadow-inner">
                <div 
                  className="bg-brand-600 h-full rounded-full transition-all duration-1000 relative shadow-lg shadow-brand-100" 
                  style={{ width: `${progress}%` }}
                >
                   <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] px-2">
                <div className="flex items-center gap-2.5">
                   <CheckCircle2 size={14} className="text-green-500" />
                   <span>{completedTasks} Nodes Resolved</span>
                </div>
                <div className="flex items-center gap-2.5">
                   <Clock size={14} className="text-orange-400" />
                   <span>{totalTasks - completedTasks} Pending Vectors</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center mt-12 pt-10 border-t border-gray-50">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
               <span className="text-gray-400 text-[11px] font-black uppercase tracking-[0.3em]">
                 Strategic Analytics Localized
               </span>
            </div>
            <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-600 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110 shadow-2xl">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/80 backdrop:backdrop-blur-3xl p-0 rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-white/10 w-[95%] max-w-6xl h-[90vh] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white flex flex-col h-full font-sans antialiased text-gray-900 selection:bg-brand-100">
          {/* High-Fidelity Modal Header: Command Level */}
          <div className="p-16 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <PieChart size={400} />
            </div>
            
            <div className="flex items-center gap-10 relative z-10">
              <div className="w-24 h-24 bg-white border-2 border-gray-100 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-gray-100 transition-all duration-700 hover:rotate-6 hover:scale-110">
                <BarChart3 size={40} className="text-brand-600" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">Operational Intelligence</h3>
                <p className="text-[12px] text-gray-400 font-black uppercase tracking-[0.4em] mt-4 flex items-center gap-3">
                  <Shield size={16} className="text-green-500" /> System Integrity Monitor & Logic Performance Hub
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 relative z-10">
              <Link 
                href="/roadmap"
                onClick={closeModal}
                className="text-[11px] font-black uppercase tracking-[0.3em] px-10 py-5 bg-white border-2 border-gray-100 rounded-[2rem] hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all flex items-center gap-4 shadow-xl shadow-gray-100/50 active:scale-95 group/btn"
              >
                Full Matrix Roadmap <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
              <button onClick={closeModal} className="w-20 h-20 rounded-[2.5rem] hover:bg-white flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100 shadow-sm active:scale-90 hover:rotate-90 duration-500">
                <X size={40} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-16 lg:p-20 scrollbar-hide bg-[radial-gradient(#f3f3f3_1px,transparent_1px)] [background-size:40px_40px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Overall Completion - Immersion Focus */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center py-10 border-r border-gray-50 pr-20">
                <div className="bg-brand-50 border border-brand-100 rounded-2xl px-8 py-3 mb-20 flex items-center gap-4 shadow-sm">
                  <div className="w-3 h-3 bg-brand-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
                  <h2 className="text-[12px] font-black text-brand-900 uppercase tracking-[0.4em]">Mastery Vector Synchronization</h2>
                </div>
                
                <div className="relative w-80 h-80 mb-20 group/circle">
                  <div className="absolute inset-0 bg-brand-500/5 rounded-full blur-3xl opacity-0 group-hover/circle:opacity-100 transition-opacity duration-1000"></div>
                  <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10 transition-transform duration-700 group-hover/circle:scale-105">
                    <circle
                      cx="160"
                      cy="160"
                      r="145"
                      stroke="currentColor"
                      strokeWidth="20"
                      fill="transparent"
                      className="text-gray-50"
                    />
                    <circle
                      cx="160"
                      cy="160"
                      r="145"
                      stroke="currentColor"
                      strokeWidth="20"
                      fill="transparent"
                      strokeDasharray={911}
                      strokeDashoffset={911 - (progress / 100) * 911}
                      strokeLinecap="round"
                      className="text-brand-600 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center relative z-20">
                    <span className="text-8xl font-black text-gray-900 tracking-tighter uppercase leading-none">{progress}%</span>
                    <span className="text-[13px] font-black text-gray-400 uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
                       <Activity size={14} className="text-brand-500" /> SYNC STATUS
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="bg-gray-50/50 border-2 border-gray-50 rounded-[3rem] p-10 text-center transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-100 hover:-translate-y-2 group/stat relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover/stat:opacity-[0.1] transition-opacity">
                       <CheckCircle2 size={48} />
                    </div>
                    <div className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-3">{completedTasks}</div>
                    <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Resolved States</div>
                  </div>
                  <div className="bg-gray-50/50 border-2 border-gray-50 rounded-[3rem] p-10 text-center transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-100 hover:-translate-y-2 group/stat relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover/stat:opacity-[0.1] transition-opacity">
                       <Target size={48} />
                    </div>
                    <div className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-3">{totalTasks - completedTasks}</div>
                    <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Pending Vectors</div>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown - Tactical Analysis List */}
              <div className="lg:col-span-7 space-y-16">
                <div>
                  <div className="flex items-center justify-between mb-12">
                     <h2 className="text-[14px] font-black text-gray-900 uppercase tracking-[0.4em] flex items-center gap-4">
                       <Layers size={22} className="text-brand-500" /> Sector Matrix Allocation
                     </h2>
                     <div className="px-5 py-2 bg-gray-50 rounded-xl border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Globe size={14} className="animate-spin-slow" /> LIVE DATA STREAM
                     </div>
                  </div>
                  <div className="space-y-10">
                    {subjects.map((subject, idx) => (
                      <div key={idx} className="space-y-5 group/item">
                        <div className="flex justify-between items-end px-3">
                          <div className="flex items-center gap-5">
                             <div className={cn(
                               "w-4 h-4 rounded-full transition-all duration-500 group-hover/item:scale-150 group-hover/item:shadow-[0_0_15px_currentColor]",
                               subject.color === 'brand' && "bg-brand-500 text-brand-500",
                               subject.color === 'green' && "bg-green-500 text-green-500",
                               subject.color === 'orange' && "bg-orange-500 text-orange-500",
                               subject.color === 'blue' && "bg-blue-500 text-blue-500"
                             )}></div>
                             <div>
                               <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover/item:text-brand-600 transition-colors">{subject.name}</h4>
                               <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                                  <ChevronRight size={12} /> {subject.completed} / {subject.total} Objective Logic States Resolved
                               </p>
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="text-xl font-black text-gray-900 uppercase tracking-tighter">{Math.round((subject.completed / subject.total) * 100)}%</span>
                             <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-0.5">SECTOR REVENUE</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-50 border-2 border-gray-50 rounded-full h-4 overflow-hidden p-1 shadow-inner relative">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000 relative shadow-2xl",
                              subject.color === 'brand' && "bg-brand-600 shadow-brand-100",
                              subject.color === 'green' && "bg-green-500 shadow-green-100",
                              subject.color === 'orange' && "bg-orange-500 shadow-orange-100",
                              subject.color === 'blue' && "bg-blue-500 shadow-blue-100"
                            )}
                            style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                          >
                             <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shimmer_3s_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Tactical Insights - High-Impact HUD */}
                <div className="pt-16 border-t border-gray-50">
                  <div className="bg-gray-950 rounded-[4rem] p-12 relative overflow-hidden group/hud shadow-2xl shadow-gray-200">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -mr-64 -mt-64 transition-all duration-1000 group-hover/hud:bg-brand-500/20"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                      <div className="relative">
                         <div className="w-20 h-20 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center shadow-2xl group-hover/hud:rotate-12 transition-transform duration-700">
                            <Zap size={36} className="text-brand-400" />
                         </div>
                         <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center border-4 border-gray-950 shadow-2xl">
                            <Sparkles size={14} className="text-white animate-pulse" />
                         </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                          <h4 className="text-[12px] font-black text-brand-400 uppercase tracking-[0.4em]">Predictive Trajectory Model</h4>
                          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                             <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">v5.0-ALPHA</span>
                          </div>
                        </div>
                        <div className="text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-6">August 12, 2025</div>
                        <p className="text-gray-400 text-base font-black uppercase tracking-widest leading-relaxed italic">
                          "Based on current velocity vectors and logic resolution patterns, you are traversing the curriculum 22% faster than the baseline. 
                          Target completion localized for mid-August. Breakthrough probability high."
                        </p>
                        
                        <div className="flex items-center justify-center md:justify-start gap-10 mt-12 pt-8 border-t border-white/5">
                           <div className="flex items-center gap-3">
                              <Brain size={18} className="text-brand-400" />
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Neural Projection Engine</span>
                           </div>
                           <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                           <div className="flex items-center gap-3">
                              <TrendingUp size={18} className="text-green-500" />
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Efficiency: +24.8%</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tactical Status Bar: Command Interface */}
          <div className="border-t border-gray-50 p-12 px-20 bg-gray-50/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-16">
              {[
                { label: "AI Prediction Engine", status: "Active", color: "text-brand-500", icon: Brain },
                { label: "Logic Matrix Synced", done: true, icon: Shield },
                { label: "Neural Flow High", done: true, icon: Activity }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group/status cursor-help">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover/status:shadow-md transition-all">
                    {item.done ? <CheckCircle2 size={18} className="text-green-500" /> : <item.icon size={18} className={item.color} />}
                  </div>
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] group-hover/status:text-gray-900 transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={closeModal}
              className="px-16 py-6 bg-gray-950 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-[2.5rem] hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-brand-500/20 active:scale-95 flex items-center gap-4 group/exit"
            >
              Exit Analytics Matrix <ChevronRight size={20} className="group-hover/exit:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}


