"use client";

import { useTransition } from "react";
import { toggleTask, updateTaskPriority, deleteTask } from "@/app/actions";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Trash2, CheckCircle2, Circle, Loader2, Hash, Calendar, ArrowRight, Shield, Zap, AlertCircle } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TaskItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
  priority?: string;
  dueDate?: Date | null;
}

export default function TaskItem({ id, title, isCompleted, category, priority = "Low", dueDate }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();

  const cyclePriority = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextPriority = priority === "Low" ? "Medium" : priority === "Medium" ? "High" : "Low";
    startTransition(async () => {
      await updateTaskPriority(id, nextPriority);
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await deleteTask(id);
    });
  };

  const priorityStyles = {
    High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", icon: AlertCircle },
    Medium: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", icon: Zap },
    Low: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-100", icon: Shield },
  };

  const currentPriority = priorityStyles[priority as keyof typeof priorityStyles] || priorityStyles.Low;

  return (
    <div className={cn(
      "flex items-center justify-between group transition-all p-5 rounded-[2rem] border-2 border-transparent hover:border-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 relative overflow-hidden",
      isPending && "opacity-50 pointer-events-none",
      isCompleted && "bg-gray-50/30"
    )}>
      <div className="flex items-center gap-6 flex-1 min-w-0 relative z-10">
        <button 
          onClick={() => {
            startTransition(async () => {
              await toggleTask(id, !isCompleted);
            });
          }}
          className={cn(
            "shrink-0 transition-all duration-500 relative",
            isCompleted ? "text-emerald-500 scale-110" : "text-gray-300 hover:text-brand-500 hover:scale-110"
          )}
        >
          {isPending ? (
            <Loader2 size={24} className="animate-spin text-brand-600" />
          ) : isCompleted ? (
            <div className="relative">
              <CheckCircle2 size={28} strokeWidth={2.5} />
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md animate-pulse"></div>
            </div>
          ) : (
            <Circle size={28} strokeWidth={2} />
          )}
        </button>

        <div className="flex flex-col min-w-0">
          <span className={cn(
            "text-[15px] font-black tracking-tight transition-all truncate pr-6 uppercase", 
            isCompleted ? "text-gray-400 line-through decoration-2" : "text-gray-900"
          )}>
            {title}
          </span>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
              <Hash size={10} className="text-gray-300" /> {category}
            </span>
            {dueDate && (
              <span className="text-[10px] text-brand-600 font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} />
                {new Date(dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 flex-shrink-0 relative z-10">
        <button 
          onClick={cyclePriority}
          className={cn(
            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center gap-2",
            currentPriority.bg,
            currentPriority.text,
            currentPriority.border
          )}
        >
          <currentPriority.icon size={12} />
          {priority}
        </button>

        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={handleDelete}
            className="text-gray-300 hover:text-red-600 p-3 rounded-xl hover:bg-red-50 transition-all"
            aria-label="Archive objective"
          >
            <Trash2 size={18} strokeWidth={2.5} />
          </button>
          <div className="w-1.5 h-6 bg-gray-100 rounded-full"></div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className={cn(
        "absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white to-transparent"
      )}></div>
    </div>
  );
}




