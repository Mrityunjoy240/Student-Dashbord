"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/app/actions";
import { Calendar, Trash2 } from "lucide-react";
import { clsx } from "clsx";

interface EventItemProps {
  id: string;
  title: string;
  date: Date;
  color: string;
}

export default function EventItem({ id, title, date, color }: EventItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteEvent(id);
    });
  };

  return (
    <div className={clsx("flex gap-3 items-center group relative", isPending && "opacity-50")}>
      <div className={clsx(
        "w-8 h-8 rounded flex items-center justify-center shrink-0",
        color === 'green' && "bg-green-50 text-green-500",
        color === 'orange' && "bg-orange-50 text-orange-400",
        color === 'brand' && "bg-brand-50 text-brand-500",
        color === 'red' && "bg-red-50 text-red-500",
        color === 'blue' && "bg-blue-50 text-blue-500",
        !['green', 'orange', 'brand', 'red', 'blue'].includes(color) && "bg-gray-50 text-gray-400"
      )}>
        <Calendar size={16} />
      </div>
      <div className="flex-1 min-w-0 pr-8">
        <div className={clsx(
          "text-xs font-semibold truncate",
          color === 'green' && "text-green-600",
          color === 'orange' && "text-orange-400",
          color === 'brand' && "text-brand-500",
          color === 'red' && "text-red-500",
          color === 'blue' && "text-blue-500",
        )}>{title}</div>
        <div className="text-[10px] text-gray-400">{new Date(date).toLocaleDateString()}</div>
      </div>
      
      <button 
        onClick={handleDelete}
        disabled={isPending}
        className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-300 hover:text-red-500 rounded"
        title="Delete Event"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
