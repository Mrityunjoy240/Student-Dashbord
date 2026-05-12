import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import TaskItem from "@/components/TaskItem";
import { Plus, ListTodo, CheckCircle2, Circle, LayoutGrid } from "lucide-react";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { isCompleted: 'asc' } });
  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200">
                <ListTodo size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Mission Control</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">
                  {tasks.length - completedCount} Active Objectives • {completedCount} Synchronized
                </p>
              </div>
            </div>
            <button className="bg-brand-600 text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 flex items-center gap-2.5 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Initialize Objective
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Stats */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Execution Metrics</h3>
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-gray-900 tracking-tighter">{Math.round((completedCount / (tasks.length || 1)) * 100)}%</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Efficiency Rate</p>
                    </div>
                    <div className="w-24 h-12 bg-brand-50 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-brand-600 opacity-20" />
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-2 overflow-hidden p-0.5">
                    <div 
                      className="bg-brand-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(124,58,237,0.3)]" 
                      style={{ width: `${(completedCount / (tasks.length || 1)) * 100}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                      <p className="text-lg font-bold text-gray-900">{tasks.length}</p>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Total</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                      <p className="text-lg font-bold text-brand-600">{tasks.length - completedCount}</p>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-950 rounded-3xl p-6 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-500/30 transition-colors"></div>
                <div className="relative z-10">
                  <h3 className="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-6">AI Insight</h3>
                  <p className="text-sm font-medium leading-relaxed italic opacity-80">
                    "You're most productive between 10 AM and 1 PM. Schedule your hardest modules then."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Task List */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <LayoutGrid size={14} className="text-gray-400" />
                    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global task Registry</h2>
                  </div>
                  <div className="flex gap-4 text-[9px] font-black text-gray-300 uppercase tracking-widest">
                    <span>Priority</span>
                    <span>Domain</span>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {tasks.map((task) => (
                    <div key={task.id} className="px-8 py-5 hover:bg-gray-50/50 transition-all group">
                      <TaskItem 
                        id={task.id}
                        title={task.title}
                        isCompleted={task.isCompleted}
                        category={task.category}
                      />
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="p-20 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-100">
                        <Circle size={24} className="text-gray-200" />
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No objectives identified</p>
                      <p className="text-[10px] text-gray-300 font-medium mt-2">Initialize your first objective to start tracking progress.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


