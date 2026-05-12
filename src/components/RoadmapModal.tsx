"use client";

import { useRef, useState } from "react";
import { X, Map, Target, Calendar, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { toggleTask } from "@/app/actions";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Milestone {
  month: string;
  task: string;
  details: string;
}

interface RoadmapData {
  milestones: Milestone[];
}

interface RoadmapTask {
  id: string;
  isCompleted: boolean;
  milestoneIndex: number;
}

export default function RoadmapModal({ roadmapJson, targetRole, tasks = [] }: { roadmapJson?: string | null, targetRole?: string | null, tasks?: RoadmapTask[] }) {
  const [toggling, setToggling] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  let roadmap: RoadmapData | null = null;
  try {
    if (roadmapJson) roadmap = JSON.parse(roadmapJson);
  } catch (e) {
    console.error("Failed to parse roadmap:", e);
  }

  return (
    <>
      <button 
        onClick={openModal}
        className="text-brand-600 border border-brand-100 hover:bg-brand-50 font-medium text-xs px-4 py-1.5 rounded-lg transition-colors"
      >
        View Roadmap
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-black/50 p-0 rounded-3xl shadow-2xl border-none w-[600px] max-h-[80vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white flex flex-col h-full overflow-hidden">
          <div className="bg-brand-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Map size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Career Roadmap</h3>
                <p className="text-brand-100 text-xs uppercase tracking-widest font-bold mt-1">Goal: {targetRole || "Success"}</p>
              </div>
            </div>
            <button onClick={closeModal} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
            {roadmap ? (
              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[1.35rem] top-2 bottom-2 w-0.5 bg-brand-200"></div>

                {roadmap.milestones.map((m, i) => {
                  const task = tasks.find(t => t.milestoneIndex === i);
                  const isCompleted = task?.isCompleted || false;
                  
                  const handleToggle = async () => {
                    if (!task) return;
                    setToggling(task.id);
                    await toggleTask(task.id, !isCompleted);
                    setToggling(null);
                  };

                  return (
                    <div key={i} className="relative flex gap-6 animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                      <button 
                        onClick={handleToggle}
                        disabled={!task || toggling === task?.id}
                        className={cn(
                          "z-10 bg-white border-4 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm transition-all",
                          isCompleted ? "border-green-500 text-green-600" : "border-brand-500 text-brand-600",
                          !task && "opacity-50 grayscale"
                        )}
                      >
                        {toggling === task?.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : isCompleted ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <div className="text-brand-600 font-bold text-xs">{i + 1}</div>
                        )}
                      </button>
                      <div className={cn(
                        "bg-white border card-border rounded-2xl p-5 shadow-sm flex-1 transition-all",
                        isCompleted && "opacity-75 bg-gray-50/50"
                      )}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={cn(
                            "font-bold text-sm flex items-center gap-2",
                            isCompleted ? "text-gray-500 line-through" : "text-gray-900"
                          )}>
                            {m.task}
                          </h4>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter",
                            isCompleted ? "bg-gray-100 text-gray-400" : "bg-brand-50 text-brand-600"
                          )}>{m.month}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{m.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target size={48} className="mx-auto mb-4 text-gray-200" />
                <h4 className="font-bold text-gray-900">Roadmap is being generated...</h4>
                <p className="text-sm text-gray-500 mt-1">Check back in a few seconds.</p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t text-center">
            <button 
              onClick={closeModal}
              className="bg-brand-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-700 transition-all text-sm"
            >
              Let's Crush It!
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
