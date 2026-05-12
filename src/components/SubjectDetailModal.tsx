"use client";

import { useRef, useState, useTransition } from "react";
import { X, CheckCircle2, Circle, Loader2, BookOpen, Layers, ChevronRight, Target, Activity, Brain, Shield, Info, Sparkles, Command, Globe, Rocket, Search, Filter, Zap } from "lucide-react";
import { toggleTask } from "@/app/actions";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Topic {
  id: string;
  title: string;
  module: string | null;
  isCompleted: boolean;
}

interface SubjectDetailModalProps {
  subjectId: string;
  subjectName: string;
  topics: Topic[];
  color: string;
}

export default function SubjectDetailModal({ subjectId, subjectName, topics, color }: SubjectDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const modules: Record<string, Topic[]> = {};
  topics.forEach(topic => {
    const moduleName = topic.module || "General Intelligence";
    if (!modules[moduleName]) modules[moduleName] = [];
    modules[moduleName].push(topic);
  });

  const moduleNames = Object.keys(modules);
  if (!activeModule && moduleNames.length > 0) {
    setActiveModule(moduleNames[0]);
  }

  const completedCount = topics.filter(t => t.isCompleted).length;
  const progress = Math.round((completedCount / topics.length) * 100) || 0;

  const handleToggle = (id: string, isCompleted: boolean) => {
    startTransition(async () => {
      await toggleTask(id, isCompleted);
    });
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="w-full text-left group appearance-none focus:outline-none"
      >
        <div className="bg-white border-2 border-gray-50 rounded-[3rem] p-10 hover:border-brand-200 transition-all duration-500 shadow-2xl shadow-gray-100 flex items-center justify-between group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
             <BookOpen size={160} />
          </div>
          
          <div className="flex items-center gap-8 relative z-10">
            <div className={cn(
              "w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:scale-110",
              color === 'brand' && "bg-brand-600 text-white shadow-brand-100",
              color === 'green' && "bg-green-600 text-white shadow-green-100",
              color === 'orange' && "bg-orange-600 text-white shadow-orange-100",
              color === 'blue' && "bg-blue-600 text-white shadow-blue-100"
            )}>
              <Layers size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">{subjectName}</h3>
              <div className="flex items-center gap-3 mt-3">
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{moduleNames.length} SECTORS</span>
                 </div>
                 <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{progress}% DEPLOYED</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 group-hover:translate-x-2 shadow-sm group-hover:shadow-xl group-hover:shadow-gray-200">
            <ChevronRight size={24} />
          </div>
        </div>
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/80 backdrop:backdrop-blur-3xl p-0 rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-white/10 w-[95%] max-w-7xl h-[90vh] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white flex h-full font-sans antialiased text-gray-900 selection:bg-brand-100">
          
          {/* Tactical Sidebar: Module Navigation */}
          <div className="w-96 border-r border-gray-50 bg-gray-50/20 flex flex-col shrink-0">
            <div className="p-12 border-b border-gray-50">
               <div className="flex items-center gap-4 mb-10">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl",
                    color === 'brand' && "bg-brand-600 text-white",
                    color === 'green' && "bg-green-600 text-white",
                    color === 'orange' && "bg-orange-600 text-white",
                    color === 'blue' && "bg-blue-600 text-white"
                  )}>
                    <Layers size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Sector Matrix</h2>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Hierarchical Node Logic</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  {moduleNames.map((name, idx) => (
                    <button 
                      key={name}
                      onClick={() => setActiveModule(name)}
                      className={cn(
                        "w-full p-6 rounded-[2rem] text-left transition-all duration-500 flex items-center justify-between group/mod shadow-sm border-2",
                        activeModule === name 
                          ? "bg-white border-brand-100 shadow-xl shadow-gray-100 translate-x-2" 
                          : "bg-transparent border-transparent hover:bg-white hover:border-gray-50"
                      )}
                    >
                      <div className="flex flex-col gap-1">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-[0.2em]",
                          activeModule === name ? "text-brand-600" : "text-gray-400"
                        )}>Module {idx + 1}</span>
                        <span className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-1">{name}</span>
                      </div>
                      <ChevronRight size={16} className={cn(
                        "transition-transform",
                        activeModule === name ? "text-brand-500 rotate-90" : "text-gray-200 group-hover/mod:translate-x-1"
                      )} />
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="p-12 mt-auto">
               <div className="bg-gray-900 rounded-[2.5rem] p-8 relative overflow-hidden group/card shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Target size={32} className="text-brand-400" />
                  </div>
                  <h4 className="text-[10px] font-black text-brand-400 uppercase tracking-[0.3em] mb-4">Mastery Vector</h4>
                  <div className="text-3xl font-black text-white mb-6">{progress}%</div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-4 p-0.5">
                     <div className="bg-brand-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Synchronization Core Active</p>
               </div>
            </div>
          </div>

          {/* Main Content Area: Topic Resolution */}
          <div className="flex-1 flex flex-col relative">
            <div className="p-12 lg:p-16 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-8">
                <div className="relative">
                   <div className={cn(
                     "w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-white transition-all hover:rotate-12 hover:scale-110 shadow-xl",
                     color === 'brand' && "bg-brand-600 shadow-brand-100",
                     color === 'green' && "bg-green-600 shadow-green-100",
                     color === 'orange' && "bg-orange-600 shadow-orange-100",
                     color === 'blue' && "bg-blue-600 shadow-blue-100"
                   )}>
                      <Rocket size={32} />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full animate-pulse shadow-lg shadow-green-100"></div>
                </div>
                <div>
                   <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">{subjectName}</h1>
                   <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                         <Shield size={14} className="text-brand-600" />
                         <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Tactical Ingestion Active</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                      <div className="flex items-center gap-2">
                         <Globe size={14} className="text-green-500" />
                         <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Matrix v2.4-STABLE</span>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                 <button onClick={closeModal} className="w-20 h-20 rounded-[2.5rem] hover:bg-gray-50 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100 shadow-sm active:scale-90 hover:rotate-90 duration-500">
                    <X size={40} />
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 lg:p-20 scrollbar-hide bg-[radial-gradient(#f3f3f3_1px,transparent_1px)] [background-size:40px_40px]">
              {activeModule && modules[activeModule] && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="flex items-center justify-between mb-16">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                           <Command size={24} />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{activeModule}</h2>
                           <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] mt-2">Active Logic Cluster Breakdown</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="px-6 py-3 bg-white border-2 border-gray-100 rounded-xl flex items-center gap-3">
                           <Search size={16} className="text-gray-300" />
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Node Locator</span>
                        </div>
                        <div className="w-12 h-12 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-950 hover:text-white transition-all cursor-pointer">
                           <Filter size={18} />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {modules[activeModule].map((topic) => (
                      <button 
                        key={topic.id}
                        onClick={() => handleToggle(topic.id, !topic.isCompleted)}
                        disabled={isPending}
                        className={cn(
                          "group/topic w-full text-left p-10 rounded-[3.5rem] border-2 transition-all duration-500 flex items-center justify-between relative overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gray-100",
                          topic.isCompleted 
                            ? "bg-gray-50/50 border-green-50" 
                            : "bg-white border-gray-50 hover:border-brand-200"
                        )}
                      >
                        <div className="flex items-center gap-10 relative z-10 flex-1">
                          <div className={cn(
                            "w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all duration-700 group-hover/topic:scale-110 group-hover/topic:rotate-6",
                            topic.isCompleted 
                              ? "bg-green-500 text-white shadow-xl shadow-green-100" 
                              : "bg-gray-100 text-gray-400 group-hover/topic:bg-brand-600 group-hover/topic:text-white shadow-sm"
                          )}>
                            {isPending ? (
                              <Loader2 size={32} className="animate-spin" />
                            ) : topic.isCompleted ? (
                              <CheckCircle2 size={32} />
                            ) : (
                              <Circle size={32} />
                            )}
                          </div>
                          <div>
                             <h4 className={cn(
                               "text-xl font-black uppercase tracking-tight transition-colors duration-500",
                               topic.isCompleted ? "text-gray-400 line-through" : "text-gray-900 group-hover/topic:text-brand-900"
                             )}>{topic.title}</h4>
                             <div className="flex items-center gap-5 mt-3">
                                <div className="flex items-center gap-2">
                                   <Activity size={12} className={topic.isCompleted ? "text-green-500" : "text-gray-300"} />
                                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                      {topic.isCompleted ? "Node Resolved" : "Operational Target"}
                                   </span>
                                </div>
                                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                   <Clock size={12} className="text-gray-300" />
                                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">T-Zero Marker</span>
                                </div>
                             </div>
                          </div>
                        </div>
                        
                        <div className="relative z-10 ml-8">
                           {topic.isCompleted ? (
                              <div className="px-6 py-2 bg-green-50 border border-green-100 rounded-xl">
                                 <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">ARCHIVED</span>
                              </div>
                           ) : (
                              <div className="w-14 h-14 bg-gray-50 border-2 border-gray-50 rounded-2xl flex items-center justify-center text-gray-200 group-hover/topic:bg-brand-50 group-hover/topic:border-brand-100 group-hover/topic:text-brand-600 transition-all duration-500">
                                 <Zap size={24} />
                              </div>
                           )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tactical Footer: Status Bar */}
            <div className="p-10 px-16 bg-white border-t border-gray-50 flex justify-between items-center relative z-20">
               <div className="flex items-center gap-12">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                        <Brain size={20} className="text-brand-500" />
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block">Cognitive Load</span>
                        <span className="text-[12px] font-black text-gray-900 uppercase tracking-tighter">NOMINAL RANGE</span>
                     </div>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-200"></div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                        <Info size={20} className="text-green-500" />
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block">Node Density</span>
                        <span className="text-[12px] font-black text-gray-900 uppercase tracking-tighter">HIGH RESOLUTION</span>
                     </div>
                  </div>
               </div>
               
               <button 
                  onClick={closeModal}
                  className="px-16 py-6 bg-gray-950 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-[2.5rem] hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-brand-500/20 active:scale-95 flex items-center gap-4 group/exit"
               >
                  DISENGAGE INTERFACE <ChevronRight size={20} className="group-hover/exit:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
