"use client";

import { useRef, useTransition } from "react";
import { updateExam } from "@/app/actions";
import { Pen, X, Calendar, AlertTriangle, ChevronRight, Loader2, Clock } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EditExamModalProps {
  initialName: string;
  initialDate: string;
}

export default function EditExamModal({ initialName, initialDate }: EditExamModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const date = new Date(formData.get("date") as string);
    
    startTransition(async () => {
      await updateExam(name, date);
      closeModal();
    });
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="px-6 py-3 bg-white border-2 border-red-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 hover:border-red-600 hover:shadow-2xl hover:shadow-red-50/50 transition-all active:scale-95 flex items-center gap-3 group"
      >
        <Pen size={14} className="group-hover:rotate-12 transition-transform duration-500" /> 
        Adjust Deadline
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-red-950/20 backdrop:backdrop-blur-3xl p-0 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(239,68,68,0.2)] border-2 border-red-100/20 w-[500px] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white p-16 font-sans antialiased text-gray-900">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-red-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-100">
                 <AlertTriangle size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Temporal Shift</h3>
                <p className="text-[11px] text-red-400 font-black uppercase tracking-[0.2em] mt-2">Critical Vector Calibration</p>
              </div>
            </div>
            <button onClick={closeModal} className="w-16 h-16 rounded-[2.5rem] hover:bg-red-50 flex items-center justify-center text-red-200 hover:text-red-600 transition-all hover:rotate-90 duration-500">
              <X size={32} />
            </button>
          </div>
          
          <form action={handleSubmit} className="space-y-12">
            <div className="space-y-10">
              <div className="group/field">
                <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 group-focus-within/field:text-red-600 transition-colors">
                  <Clock size={12} /> Objective Identity
                </label>
                <input 
                  name="name"
                  defaultValue={initialName}
                  className="w-full bg-red-50/20 border-2 border-red-50 rounded-[2.5rem] px-10 py-7 text-xl font-black focus:outline-none focus:ring-8 focus:ring-red-500/5 focus:bg-white focus:border-red-200 transition-all placeholder:text-red-100 shadow-inner uppercase tracking-tight text-red-900"
                  placeholder="e.g. Final Breakthrough"
                  required
                />
              </div>

              <div className="group/field">
                <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5 group-focus-within/field:text-red-600 transition-colors">
                  <Calendar size={12} /> Target Timestamp
                </label>
                <input 
                  name="date"
                  type="date"
                  defaultValue={initialDate}
                  className="w-full bg-red-50/20 border-2 border-red-50 rounded-[2.5rem] px-10 py-7 text-xl font-black focus:outline-none focus:ring-8 focus:ring-red-500/5 focus:bg-white focus:border-red-200 transition-all shadow-inner uppercase tracking-tight text-red-900"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isPending}
              className="w-full bg-red-600 text-white py-8 rounded-[3rem] text-[12px] font-black uppercase tracking-[0.4em] hover:bg-red-700 transition-all shadow-2xl shadow-red-100 disabled:opacity-10 mt-10 active:scale-95 group flex items-center justify-center gap-4"
            >
              {isPending ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> LOCKING TEMPORAL COORDINATES...
                </>
              ) : (
                <>
                  SYNC CRITICAL CLOCK <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}


