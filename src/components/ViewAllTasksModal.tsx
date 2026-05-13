"use client";

import { useState } from "react";
import { X } from "lucide-react";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
  priority?: string;
  dueDate?: Date | null;
}

export default function ViewAllTasksModal({ tasks }: { tasks: Task[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-100"
      >
        View All Tasks
      </button>
    );
  }

  // Sort tasks: Priority (High > Medium > Low) then Due Date (soonest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityWeight: Record<string, number> = { "High": 3, "Medium": 2, "Low": 1, "Normal": 2 };
    const wA = priorityWeight[a.priority || "Low"] || 1;
    const wB = priorityWeight[b.priority || "Low"] || 1;
    
    if (wA !== wB) {
      return wB - wA; // Higher weight first
    }

    // If priority is same, sort by due date
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1; // nulls last
    if (!b.dueDate) return -1;
    
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-100"
      >
        View All Tasks
      </button>

      <div className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-[95%] max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
          <div className="border-b border-gray-100 p-5 flex justify-between items-center bg-gray-50/50 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">All Tasks</h2>
              <p className="text-xs text-gray-500 mt-1">Sorted by importance, then deadline.</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 bg-white shadow-sm border border-gray-200 p-1.5 rounded-md transition-all hover:bg-gray-50"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="flex flex-col gap-3">
              {sortedTasks.map(task => (
                <div key={task.id} className="bg-white border border-gray-100 p-2 rounded-lg shadow-sm">
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
                <div className="text-center text-gray-400 text-sm py-10">No tasks found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
