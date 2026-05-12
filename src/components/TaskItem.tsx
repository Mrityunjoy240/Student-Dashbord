"use client";

import { useTransition } from "react";
import { toggleTask, updateTaskPriority, deleteTask } from "@/app/actions";
import { clsx } from "clsx";
import { Trash2, AlertCircle } from "lucide-react";

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

  return (
    <div className={clsx(
      "flex items-center justify-between group transition-all py-1 px-1 -mx-1 rounded-md hover:bg-gray-50",
      isPending && "opacity-50"
    )}>
      <label className="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden min-w-0">
        <input 
          type="checkbox" 
          checked={isCompleted} 
          disabled={isPending}
          onChange={(e) => {
            startTransition(async () => {
              await toggleTask(id, e.target.checked);
            });
          }}
          className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500 accent-brand-600 flex-shrink-0" 
        />
        <div className="flex flex-col truncate min-w-0">
          <span className={clsx("truncate pr-2", isCompleted ? "text-gray-400 line-through" : "text-gray-700")}>
            {title}
          </span>
          {dueDate && (
            <span className="text-[10px] text-gray-400 mt-0.5">
              Due: {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </label>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <span 
          onClick={cyclePriority}
          title={`Priority: ${priority} (Click to change)`}
          className={clsx(
            "w-2.5 h-2.5 rounded-full cursor-pointer hover:ring-2 ring-offset-1 transition-all",
            priority === "High" ? "bg-red-500 ring-red-500" : 
            priority === "Medium" ? "bg-yellow-400 ring-yellow-400" : 
            "bg-green-500 ring-green-500"
          )}
        />
        
        <span className={clsx(
          "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide",
          category === 'DBMS' && "bg-green-50 text-green-600",
          category === 'DSA' && "bg-brand-50 text-brand-600",
          category === 'OS' && "bg-orange-50 text-orange-500",
          category === 'ML' && "bg-blue-50 text-blue-500",
          category === 'CN' && "bg-blue-50 text-blue-500",
          category === 'EXAM' && "bg-red-50 text-red-500",
          !['DBMS', 'DSA', 'OS', 'ML', 'CN', 'EXAM'].includes(category) && "bg-gray-100 text-gray-600"
        )}>{category}</span>

        <button 
          onClick={handleDelete}
          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          title="Remove task"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
