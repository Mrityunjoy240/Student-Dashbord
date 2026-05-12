"use client";

import { useState, useRef } from "react";
import { X, Layers, Filter, Search, ChevronRight, Activity, Shield, Command, Globe, CheckCircle2, ListTodo } from "lucide-react";
import TaskItem from "./TaskItem";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
  priority?: string;
  dueDate?: Date | null;
}

export default function ViewAllTasksModal({ tasks }: { tasks: Task[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityWeight: Record<string, number> = { "High": 3, "Medium": 2, "Low": 1, "Normal": 2 };
    const wA = priorityWeight[a.priority || "Low"] || 1;
    const wB = priorityWeight[b.priority || "Low"] || 1;
    
    if (wA !== wB) return wB - wA;
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <>
      <button 
        onClick={openModal}
        className="w-full mt-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white bg-gray-950 hover:bg-brand-600 rounded-[2rem] transition-all shadow-2xl shadow-gray-200 active:scale-95 group flex items-center justify-center gap-4"
      >
        Expand Priority Matrix <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/80 backdrop:backdrop-blur-3xl p-0 rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-white/10 w-[95%] max-w-4xl h-[85vh] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white flex flex-col h-full font-sans antialiased text-gray-900 selection:bg-brand-100">
          
          {/* Tactical Header */}
          <div className="p-12 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <ListTodo size={200} />
            </div>
            
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-16 h-16 bg-gray-900 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-gray-200 transition-all duration-700 hover:rotate-6 hover:scale-110">
                <Command size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">Task Resolution Matrix</h3>
                <div className="flex items-center gap-4 mt-3">
                   <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg border border-green-100">
                      <CheckCircle2 size={12} className="text-green-600" />
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">{tasks.filter(t => t.isCompleted).length} / {tasks.length} Resolved</span>
                   </div>
                   <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol v4.0-Live</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              <button onClick={closeModal} className="w-16 h-16 rounded-[2rem] hover:bg-white flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100 shadow-sm active:scale-90 hover:rotate-90 duration-500">
                <X size={32} />
              </button>
            </div>
          </div>

          {/* Filtering & Search Row */}
          <div className="px-12 py-6 bg-white border-b border-gray-50 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl flex items-center gap-4 focus-within:bg-white focus-within:border-brand-100 transition-all">
                   <Search size={16} className="text-gray-400" />
                   <input type="text" placeholder="FILTER BY LOGIC ID..." className="bg-transparent text-[11px] font-black tracking-[0.2em] uppercase focus:outline-none placeholder:text-gray-300 w-64" />
                </div>
                <button className="p-3.5 bg-gray-50 border-2 border-gray-50 rounded-2xl text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
                   <Filter size={18} />
                </button>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Neural Stream Synced</span>
             </div>
          </div>
          
          {/* Main List Area */}
          <div className="flex-1 overflow-y-auto p-12 scrollbar-hide bg-[radial-gradient(#f3f3f3_1.5px,transparent_1.5px)] [background-size:40px_40px]">
            <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
              {sortedTasks.map(task => (
                <div key={task.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <TaskItem 
                    id={task.id}
                    title={task.title}
                    isCompleted={task.isCompleted}
                    category={task.category}
                    priority={task.priority}
                    dueDate={task.dueDate}
                  />
                </div>
              ))}
              {sortedTasks.length === 0 && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-md rounded-[3rem] border-4 border-dashed border-gray-50 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-sm">
                     <ListTodo size={40} className="text-gray-100" />
                  </div>
                  <h4 className="text-xl font-black text-gray-900 uppercase tracking-[0.4em] mb-4">Registry Idle</h4>
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto">No priority vectors detected in the current stream. Initialize new objectives to begin.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Status Footer */}
          <div className="p-10 px-16 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                      <Globe size={20} className="text-brand-500" />
                   </div>
                   <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block">Data Layer</span>
                      <span className="text-[12px] font-black text-gray-900 uppercase tracking-tighter">GLOBAL SYNC 01</span>
                   </div>
                </div>
                <div className="w-[1px] h-10 bg-gray-200"></div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                      <Shield size={20} className="text-green-500" />
                   </div>
                   <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block">Security Matrix</span>
                      <span className="text-[12px] font-black text-gray-900 uppercase tracking-tighter">ENCRYPTED STREAM</span>
                   </div>
                </div>
             </div>
             
             <button 
                onClick={closeModal}
                className="px-16 py-6 bg-gray-950 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-[2.5rem] hover:bg-brand-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-brand-500/20 active:scale-95 flex items-center gap-4 group/exit"
             >
                EXIT MATRIX <ChevronRight size={20} className="group-hover/exit:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

