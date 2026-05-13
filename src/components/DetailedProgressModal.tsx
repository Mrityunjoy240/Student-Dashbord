"use client";

import { useRef } from "react";
import { X, TrendingUp, BarChart3, Layers, ArrowUpRight, CheckCircle2, ChevronRight, Target, Zap } from "lucide-react";
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
      <div 
        onClick={openModal}
        className="cursor-pointer group h-full"
      >
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Linear-like background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-500/10 transition-colors"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-brand-50 border border-brand-100 rounded-lg px-2.5 py-1 flex items-center gap-2">
                <Target size={12} className="text-brand-600" />
                <h2 className="text-[10px] font-black text-brand-900 uppercase tracking-widest">Goal Achievement</h2>
              </div>
              <div className="text-gray-400 group-hover:text-brand-500 transition-colors">
                <TrendingUp size={14} />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-semibold text-gray-900 tracking-tight">{progress}%</div>
              <div className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">On Track</div>
            </div>
            <p className="text-gray-500 text-xs font-medium mb-6">Target: {targetPackage}</p>
            
            <div className="space-y-3 mb-4">
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-brand-600 h-full rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_8px_rgba(124,58,237,0.2)]" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <span>{completedTasks} Tasks Solved</span>
                <span>{totalTasks - completedTasks} Remaining</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
            <button className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">
              Analytics
            </button>
            <Link 
              href="/roadmap"
              onClick={(e) => e.stopPropagation()}
              className="text-brand-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4"
            >
              Roadmap <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/40 backdrop:backdrop-blur-sm p-0 rounded-xl shadow-2xl border border-gray-200 w-[95%] max-w-4xl h-[90vh] max-h-[90vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden outline-none"
      >
        <div className="bg-white flex flex-col h-full font-sans antialiased text-gray-900 overscroll-contain">
          {/* Header - Minimalist Linear Style */}
          <div className="border-b border-gray-100 p-5 flex justify-between items-center shrink-0 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="bg-white border border-gray-200 p-2 rounded-lg shadow-sm">
                <BarChart3 size={18} className="text-brand-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Performance Analytics</h3>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-0.5">Global Progress & Efficiency Metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href="/roadmap"
                onClick={closeModal}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Roadmap <ArrowUpRight size={12} />
              </Link>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-all">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 lg:p-10 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Overall Completion - Centered Focus */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 border-r border-gray-100 pr-8">
                <div className="bg-brand-50 border border-brand-100 rounded-lg px-3 py-1.5 mb-10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                  <h2 className="text-[10px] font-black text-brand-900 uppercase tracking-[0.2em]">Goal Progress</h2>
                </div>
                
                <div className="relative w-48 h-48 mb-8">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-100"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={552}
                      strokeDashoffset={552 - (progress / 100) * 552}
                      strokeLinecap="round"
                      className="text-brand-600 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{progress}%</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completion</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{completedTasks}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Solved</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{totalTasks - completedTasks}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Remaining</div>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown - Detailed List */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Layers size={14} /> Subject Breakdown
                  </h2>
                  <div className="space-y-6">
                    {subjects.map((subject, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">{subject.name}</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{subject.completed}/{subject.total} Topics</p>
                          </div>
                          <span className="text-xs font-black text-gray-900">{Math.round((subject.completed / subject.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-2 overflow-hidden p-0.5">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              subject.color === 'brand' && "bg-brand-600 shadow-[0_0_8px_rgba(124,58,237,0.4)]",
                              subject.color === 'green' && "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]",
                              subject.color === 'orange' && "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]",
                              subject.color === 'blue' && "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]",
                              subject.color === 'yellow' && "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                            )}
                            style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights / Predictions */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="bg-gray-950 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap size={14} className="text-brand-400" />
                        <h4 className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em]">Predicted Target</h4>
                      </div>
                      <div className="text-3xl font-bold text-white tracking-tight mb-2">August 12, 2025</div>
                      <p className="text-gray-400 text-xs leading-relaxed max-w-md">
                        Based on your recent activity, you are on track to complete all prerequisite modules 2 months ahead of your graduation goal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status Bar */}
          <div className="border-t border-gray-100 p-4 px-8 bg-gray-50/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-6">
              {[
                { label: "AI Prediction", status: "Active", color: "text-brand-500" },
                { label: "Syllabus Parsed", done: true },
                { label: "Data Real-time", done: true }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {item.done ? <CheckCircle2 size={12} className="text-green-500" /> : <div className={cn("w-2 h-2 rounded-full", item.color)}></div>}
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={closeModal}
              className="px-6 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
