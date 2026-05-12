"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/app/actions";
import { Calendar, Trash2, Clock, MapPin, Hash } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EventItemProps {
  id: string;
  title: string;
  date: Date;
  color: string;
}

export default function EventItem({ id, title, date, color }: EventItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await deleteEvent(id);
    });
  };

  const colorMap: Record<string, { bg: string, text: string, border: string, dot: string }> = {
    green: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", dot: "bg-emerald-500" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", dot: "bg-orange-500" },
    brand: { bg: "bg-brand-50", text: "text-brand-600", border: "border-brand-100", dot: "bg-brand-500" },
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", dot: "bg-red-500" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", dot: "bg-blue-500" },
  };

  const style = colorMap[color] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100", dot: "bg-gray-500" };

  return (
    <div className={cn(
      "group relative flex items-center gap-6 p-5 rounded-[2rem] border-2 border-transparent hover:border-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500",
      isPending && "opacity-50 pointer-events-none"
    )}>
      {/* Visual Indicator Layer */}
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
        style.bg,
        style.text
      )}>
        <Calendar size={22} strokeWidth={2.5} />
      </div>

      {/* Content Layer */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
           <div className={cn("w-2 h-2 rounded-full", style.dot)}></div>
           <h4 className={cn("text-[13px] font-black uppercase tracking-tight truncate", style.text)}>
             {title}
           </h4>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 px-2 py-0.5 rounded-lg border border-gray-100">
              <Clock size={10} />
              {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
              <Hash size={10} />
              {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
           </div>
        </div>
      </div>

      {/* Action Layer */}
      <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 flex items-center gap-2">
        <button 
          onClick={handleDelete}
          disabled={isPending}
          className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          title="Archive Vector"
        >
          <Trash2 size={18} strokeWidth={2.5} />
        </button>
        <div className="w-1.5 h-6 bg-gray-100 rounded-full"></div>
      </div>

      {/* Interactive Background Glow */}
      <div className={cn(
        "absolute inset-0 -z-10 rounded-[2rem] opacity-0 group-hover:opacity-5 transition-opacity duration-1000",
        style.bg
      )}></div>
    </div>
  );
}

