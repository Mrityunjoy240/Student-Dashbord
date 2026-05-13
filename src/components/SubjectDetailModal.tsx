"use client";

import { useRef, useState } from "react";
import { X, CheckCircle2, Circle, Loader2, BookOpen, Layers, ChevronRight } from "lucide-react";
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
  const [toggling, setToggling] = useState<string | null>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  // Group topics by module
  const modules: Record<string, Topic[]> = {};
  topics.forEach(topic => {
    const moduleName = topic.module || "General Topics";
    if (!modules[moduleName]) modules[moduleName] = [];
    modules[moduleName].push(topic);
  });

  const completedCount = topics.filter(t => t.isCompleted).length;
  const progress = Math.round((completedCount / topics.length) * 100) || 0;

  const handleToggle = async (id: string, isCompleted: boolean) => {
    setToggling(id);
    await toggleTask(id, isCompleted);
    setToggling(null);
  };

  return (
    <>
      <div 
        onClick={openModal}
        className="cursor-pointer group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
      >
        <div className="absolute top-0 right-0 p-3 text-gray-300 group-hover:text-gray-400 transition-colors">
          <ChevronRight size={16} />
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            "p-2 rounded-lg",
            color === 'brand' && "bg-brand-50 text-brand-600",
            color === 'green' && "bg-green-50 text-green-600",
            color === 'orange' && "bg-orange-50 text-orange-600",
            color === 'blue' && "bg-blue-50 text-blue-600",
            color === 'yellow' && "bg-yellow-50 text-yellow-600"
          )}>
            <BookOpen size={18} />
          </div>
          <h3 className="font-bold text-gray-900 tracking-tight">{subjectName}</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>{completedCount}/{topics.length} Topics</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                color === 'brand' && "bg-brand-600",
                color === 'green' && "bg-green-500",
                color === 'orange' && "bg-orange-500",
                color === 'blue' && "bg-blue-500",
                color === 'yellow' && "bg-yellow-500"
              )}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/40 backdrop:backdrop-blur-sm p-0 rounded-xl shadow-2xl border border-gray-200 w-[95%] max-w-2xl h-[85vh] max-h-[85vh] outline-none m-auto"
      >
        <div className="bg-white flex flex-col h-full font-sans antialiased text-gray-900">
          <div className="border-b border-gray-100 p-5 flex justify-between items-center shrink-0 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-2 rounded-lg",
                color === 'brand' && "bg-brand-50 text-brand-600",
                color === 'green' && "bg-green-50 text-green-600",
                color === 'orange' && "bg-orange-50 text-orange-600",
                color === 'blue' && "bg-blue-50 text-blue-600",
                color === 'yellow' && "bg-yellow-50 text-yellow-600"
              )}>
                <Layers size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-tight">{subjectName} Syllabus</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Module-wise Breakdown</p>
              </div>
            </div>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 transition-colors">
            <div className="space-y-10">
              {Object.entries(modules).map(([moduleName, moduleTopics], idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className={cn(
                      "w-1 h-4 rounded-full",
                      color === 'brand' && "bg-brand-500",
                      color === 'green' && "bg-green-500",
                      color === 'orange' && "bg-orange-500",
                      color === 'blue' && "bg-blue-500",
                      color === 'yellow' && "bg-yellow-500"
                    )}></div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] leading-relaxed">{moduleName}</h4>
                  </div>
                  <div className="space-y-1 bg-gray-50/30 rounded-xl p-1 border border-gray-100/50">
                    {moduleTopics.map((topic) => (
                      <div 
                        key={topic.id}
                        onClick={() => !toggling && handleToggle(topic.id, !topic.isCompleted)}
                        className={cn(
                          "flex items-start justify-between p-3 rounded-lg border border-transparent hover:border-gray-100 hover:bg-white transition-all cursor-pointer group",
                          topic.isCompleted && "opacity-60"
                        )}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div className={cn(
                            "transition-colors mt-0.5 shrink-0",
                            topic.isCompleted ? "text-green-500" : "text-gray-300 group-hover:text-gray-400"
                          )}>
                            {toggling === topic.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : topic.isCompleted ? (
                              <CheckCircle2 size={18} />
                            ) : (
                              <Circle size={18} />
                            )}
                          </div>
                          <span className={cn(
                            "text-xs font-medium tracking-tight transition-all leading-normal",
                            topic.isCompleted ? "text-gray-400 line-through" : "text-gray-700"
                          )}>
                            {topic.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50/50 border-t flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 flex-1 mr-8">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    color === 'brand' && "bg-brand-600",
                    color === 'green' && "bg-green-500",
                    color === 'orange' && "bg-orange-500"
                  )}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">{progress}% Done</span>
            </div>
            <button 
              onClick={closeModal}
              className="px-4 py-1.5 bg-white border border-gray-200 text-gray-500 font-bold uppercase tracking-widest rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all text-[9px]"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
