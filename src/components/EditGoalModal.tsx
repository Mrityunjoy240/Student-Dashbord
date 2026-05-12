"use client";

import { useRef, useTransition, useState } from "react";
import { updateGoal } from "@/app/actions";
import { Settings, X, Target, Rocket, Briefcase, Map, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EditGoalModalProps {
  initialPackage: string;
  initialRole?: string;
  initialBranch?: string;
  initialDate: string;
}

export default function EditGoalModal({ initialPackage, initialRole, initialBranch, initialDate }: EditGoalModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleSubmit = (formData: FormData) => {
    const pkg = formData.get("package") as string;
    const role = formData.get("role") as string;
    const branch = formData.get("branch") as string;
    const date = new Date(formData.get("date") as string);
    
    startTransition(async () => {
      await updateGoal(pkg, date, role, branch); 
      closeModal();
    });
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="px-6 py-3 bg-white border-2 border-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 hover:border-gray-900 hover:shadow-2xl hover:shadow-gray-100/50 transition-all active:scale-95 flex items-center gap-3 group"
      >
        <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" /> 
        Configure Trajectory
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/80 backdrop:backdrop-blur-3xl p-0 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-white/10 w-[500px] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white p-16 font-sans antialiased text-gray-900">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-100">
                 <Rocket size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Mission Config</h3>
                <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Update Primary Objective Parameters</p>
              </div>
            </div>
            <button onClick={closeModal} className="w-16 h-16 rounded-[2.5rem] hover:bg-gray-50 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all hover:rotate-90 duration-500">
              <X size={32} />
            </button>
          </div>
          
          <form action={handleSubmit} className="space-y-12">
            <div className="space-y-10">
              <div className="group/field">
                <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 group-focus-within/field:text-brand-600 transition-colors">
                  <Briefcase size={12} /> Target Compensation
                </label>
                <input 
                  name="package"
                  defaultValue={initialPackage}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2.5rem] px-10 py-7 text-xl font-black focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:bg-white focus:border-brand-200 transition-all placeholder:text-gray-200 shadow-inner uppercase tracking-tight"
                  placeholder="e.g. 45 LPA"
                  required
                />
              </div>

              <div className="group/field">
                <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 group-focus-within/field:text-brand-600 transition-colors">
                  <Target size={12} /> Strategic Role
                </label>
                <input 
                  name="role"
                  defaultValue={initialRole}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2.5rem] px-10 py-7 text-xl font-black focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:bg-white focus:border-brand-200 transition-all placeholder:text-gray-200 shadow-inner uppercase tracking-tight"
                  placeholder="e.g. Principal Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="group/field">
                  <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 group-focus-within/field:text-brand-600 transition-colors">
                    <Map size={12} /> Sector
                  </label>
                  <input 
                    name="branch"
                    defaultValue={initialBranch}
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2rem] px-8 py-6 text-base font-black focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:bg-white focus:border-brand-200 transition-all placeholder:text-gray-200 shadow-inner uppercase tracking-tight"
                    placeholder="e.g. AI/ML"
                  />
                </div>
                <div className="group/field">
                  <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 group-focus-within/field:text-brand-600 transition-colors">
                    <Map size={12} /> Deadline
                  </label>
                  <input 
                    name="date"
                    type="date"
                    defaultValue={initialDate}
                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-[2rem] px-8 py-6 text-base font-black focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:bg-white focus:border-brand-200 transition-all shadow-inner uppercase tracking-tight"
                    required
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-900 text-white py-8 rounded-[3rem] text-[12px] font-black uppercase tracking-[0.4em] hover:bg-brand-600 transition-all shadow-2xl shadow-gray-200 disabled:opacity-10 mt-10 active:scale-95 group flex items-center justify-center gap-4"
            >
              {isPending ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> SYNCHRONIZING CORE...
                </>
              ) : (
                <>
                  COMMIT TO TRAJECTORY <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}


