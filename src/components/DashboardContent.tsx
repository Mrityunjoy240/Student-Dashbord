import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, ArrowRight, Bot, Layers, BookOpen, Target, Brain, Zap, Activity, Sparkles, Cpu, TrendingUp, Shield, Terminal, Globe, Rocket, Compass, Filter, CheckCircle2 } from "lucide-react";
import TaskItem from "./TaskItem";
import EditGoalModal from "./EditGoalModal";
import EditExamModal from "./EditExamModal";
import AIManagerModal from "./AIManagerModal";
import CalendarWidget from "./CalendarWidget";
import DetailedProgressModal from "./DetailedProgressModal";
import LiveTimer from "./LiveTimer";
import SubjectDetailModal from "./SubjectDetailModal";
import ViewAllTasksModal from "./ViewAllTasksModal";
import EventItem from "./EventItem";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default async function DashboardContent() {
  const userGoal = await prisma.userGoal.findFirst();
  const exam = await prisma.exam.findFirst();
  const subjectsData = await prisma.subject.findMany();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const events = await prisma.event.findMany({ 
    where: { date: { gte: today } },
    take: 4, 
    orderBy: { date: 'asc' } 
  });
  
  const allTasks = await prisma.task.findMany();
  const syllabusTasks = allTasks.filter(t => t.subjectId !== null);
  
  const previewTasks = [...allTasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  }).slice(0, 6);

  const calculateProgress = () => {
    const totalTopics = allTasks.length;
    const completedTopics = allTasks.filter(t => t.isCompleted).length;
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  };

  const progress = calculateProgress();
  const activeTasks = allTasks.filter(t => !t.isCompleted).length;
  const examDays = exam ? Math.max(0, Math.ceil((new Date(exam.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-24 pb-32 max-w-[1600px] mx-auto px-4 lg:px-8">
      {/* Tactical Overview: Command Hub */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-2 h-10 bg-gray-900 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)]"></div>
            <div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-[0.4em] leading-none">Operational Matrices</h2>
              <div className="flex items-center gap-3 mt-3">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Tactical Readiness</p>
                 <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                 <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 rounded-lg border border-green-100">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Synced</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6 bg-white border-2 border-gray-50 px-8 py-4 rounded-[2rem] shadow-xl shadow-gray-50">
            <div className="flex flex-col items-end gap-1">
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Logic Stream Stability</span>
               <div className="flex items-center gap-3">
                  <Activity size={16} className="text-brand-500" />
                  <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">NOMINAL</span>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { label: "Syllabus Sync", value: `${progress}%`, sub: "Synchronization Level", icon: Brain, color: "text-brand-600", bg: "bg-brand-50", trend: "+2.4%" },
            { label: "Active Vectors", value: activeTasks, sub: "Pending Execution", icon: Target, color: "text-orange-600", bg: "bg-orange-50", trend: "Priority Alpha" },
            { label: "Exam Window", value: examDays, sub: "Temporal Distance", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", trend: "Critical Lock" },
            { label: "Neural Velocity", value: `94%`, sub: "Execution Efficiency", icon: Zap, color: "text-green-600", bg: "bg-green-50", trend: "High Impact" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-50 p-12 rounded-[4rem] shadow-2xl shadow-gray-100/50 hover:border-brand-200 hover:shadow-brand-100/20 hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50 rounded-full blur-[80px] -mr-24 -mt-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-2xl",
                  stat.bg
                )}>
                  <stat.icon size={32} className={stat.color} />
                </div>
                <div className="flex items-center justify-between mb-4">
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                   <span className={cn("text-[9px] font-black uppercase px-2 py-1 rounded-lg border", stat.color, stat.bg, "border-current/10")}>{stat.trend}</span>
                </div>
                <h3 className="text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-none">{stat.value}</h3>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(j => <div key={j} className="w-5 h-5 rounded-full border-2 border-white bg-gray-100"></div>)}
                   </div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goal & Exam Section: Tactical Deadline Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Trajectory Target Card */}
        <div className="bg-white border-2 border-gray-50 rounded-[4.5rem] p-12 shadow-2xl shadow-gray-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
             <Rocket size={200} />
          </div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-brand-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-100 group-hover:rotate-6 transition-all duration-700">
                <Target size={36} className="text-white" />
              </div>
              <div>
                <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.3em]">Master Trajectory</h3>
                <p className="text-3xl font-black text-gray-900 tracking-tighter uppercase mt-2">{userGoal?.targetRole || "Initialize Target"}</p>
              </div>
            </div>
            <EditGoalModal 
              initialPackage={userGoal?.targetPackage || ""} 
              initialRole={userGoal?.targetRole || ""}
              initialBranch={userGoal?.branch || ""}
              initialDate={formatDateForInput(userGoal?.targetDate)} 
            />
          </div>
          
          <div className="mb-12 bg-gray-50/50 p-10 rounded-[3rem] border-2 border-gray-50 shadow-inner relative overflow-hidden">
             <div className="absolute top-4 left-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Atomic Temporal Tracking</span>
             </div>
             <LiveTimer targetDate={userGoal?.targetDate || new Date()} />
          </div>

          <div className="pt-10 border-t border-gray-50 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-6">
              <div className="px-5 py-2 bg-brand-50 text-brand-600 rounded-xl text-[11px] font-black tracking-[0.2em] uppercase border border-brand-100 flex items-center gap-3">
                 <Shield size={14} />
                 Goal: {userGoal?.targetPackage || "---"}
              </div>
              <div className="flex items-center gap-2 text-[11px] font-black text-gray-300 uppercase tracking-widest">
                 <Compass size={14} /> Path Optimized
              </div>
            </div>
            <DetailedProgressModal 
              progress={userGoal?.progress || 0}
              targetPackage={userGoal?.targetPackage || "Not Set"}
              targetRole={userGoal?.targetRole}
              subjects={subjectsData.map(s => ({
                name: s.name,
                completed: 0, 
                total: 0,
                color: s.color
              }))}
              totalTasks={allTasks.length}
              completedTasks={allTasks.filter(t => t.isCompleted).length}
            />
          </div>
        </div>

        {/* Critical Vector Deadline */}
        <div className="bg-white border-2 border-gray-50 rounded-[4.5rem] p-12 shadow-2xl shadow-gray-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:-rotate-12 transition-transform duration-1000">
             <Calendar size={200} />
          </div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-red-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-100 group-hover:scale-110 transition-all duration-700">
                <Calendar size={36} className="text-white" />
              </div>
              <div>
                <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.3em]">Critical Vector</h3>
                <p className="text-3xl font-black text-gray-900 tracking-tighter uppercase mt-2">{exam?.name || "Pending Objective"}</p>
              </div>
            </div>
            <EditExamModal 
              initialName={exam?.name || ""} 
              initialDate={formatDateForInput(exam?.targetDate)} 
            />
          </div>

          <div className="mb-12 bg-red-50/20 p-10 rounded-[3rem] border-2 border-red-50 shadow-inner">
            <div className="absolute top-4 left-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Matrix Lock Engaged</span>
             </div>
            <LiveTimer targetDate={exam?.targetDate || new Date()} variant="red" />
          </div>

          <div className="pt-10 border-t border-gray-50 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className="px-5 py-2 bg-red-50 text-red-600 rounded-xl text-[11px] font-black tracking-[0.2em] uppercase border border-red-100">
                 Deadline: {exam?.targetDate.toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Protocol Delta Active</span>
               <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Intelligence Interface */}
      <div className="bg-gray-950 rounded-[4.5rem] p-16 text-white relative overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/15 rounded-full blur-[150px] -mr-64 -mt-64 transition-all duration-1000 group-hover:bg-brand-500/25"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-32 -mb-32"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-16">
          <div className="flex items-center gap-12 text-center xl:text-left flex-col xl:flex-row">
            <div className="relative">
              <div className="w-32 h-32 bg-white/5 backdrop-blur-3xl border-2 border-white/10 rounded-[3rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                <Bot size={64} className="text-brand-400" />
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center border-4 border-gray-950 shadow-2xl">
                <Sparkles size={16} className="text-white animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center xl:justify-start gap-5 mb-6">
                <h3 className="text-xl font-black uppercase tracking-[0.5em] text-white">Neural Strategy Hub</h3>
                <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                   <Terminal size={14} className="text-brand-400" />
                   <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Logic Stream v5.0</span>
                </div>
              </div>
              <p className="text-2xl text-gray-400 leading-relaxed max-w-3xl font-black tracking-tight italic uppercase">
                "Strategy synthesis localized. Recommend immediate focus on <span className="text-brand-400 border-b-4 border-brand-400/20 px-2">Differential Vectors</span>. Probability of breakthrough increased by 24% for next 48 hours."
              </p>
              <div className="flex items-center justify-center xl:justify-start gap-8 mt-10">
                 <div className="flex items-center gap-3">
                    <Globe size={18} className="text-gray-600" />
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Global Data Layer 01</span>
                 </div>
                 <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                 <div className="flex items-center gap-3">
                    <Shield size={18} className="text-gray-600" />
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">E2E Matrix Security</span>
                 </div>
              </div>
            </div>
          </div>
          <AIManagerModal />
        </div>
      </div>

      {/* Knowledge Matrix: Subject Database */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-2 h-10 bg-gray-900 rounded-full"></div>
            <div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-[0.4em] leading-none">Knowledge Database</h2>
              <div className="flex items-center gap-3 mt-3">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Syllabus Synchronization Matrix</p>
              </div>
            </div>
          </div>
          <Link href="/subjects" className="text-[11px] font-black text-white bg-gray-900 px-10 py-5 rounded-[2rem] tracking-[0.3em] uppercase hover:bg-brand-600 transition-all flex items-center gap-4 shadow-2xl shadow-gray-200 active:scale-95 group">
            Initialize Registry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {subjectsData.map((subject) => {
            const subjectTasks = syllabusTasks.filter(t => t.subjectId === subject.id);
            return (
              <SubjectDetailModal 
                key={subject.id}
                subjectId={subject.id}
                subjectName={subject.name}
                color={subject.color}
                topics={subjectTasks.map(t => ({
                  id: t.id,
                  title: t.title,
                  module: t.module,
                  isCompleted: t.isCompleted
                }))}
              />
            );
          })}
          {subjectsData.length === 0 && (
            <div className="col-span-full bg-gray-50/30 border-4 border-dashed border-gray-100 rounded-[4.5rem] p-32 text-center group cursor-pointer hover:bg-white hover:border-brand-200 transition-all duration-700">
              <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm group-hover:shadow-xl">
                <Sparkles size={40} className="text-gray-200 group-hover:text-brand-500" />
              </div>
              <h4 className="text-xl font-black text-gray-900 uppercase tracking-[0.3em] mb-4">Registry Empty</h4>
              <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest leading-loose max-w-sm mx-auto">Initialize your first syllabus injection matrix to populate the Knowledge Registry.</p>
            </div>
          )}
        </div>
      </section>

      {/* Execution Layer: Tactical Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Temporal Event Feed */}
        <div className="lg:col-span-4 h-full">
          <CalendarWidget initialEvents={events} />
        </div>

        {/* Execution Logs */}
        <div className="lg:col-span-4 bg-white border-2 border-gray-50 rounded-[4.5rem] p-12 shadow-2xl shadow-gray-100/50 flex flex-col h-full relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(#f3f3f3_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-[12px] font-black text-gray-900 uppercase tracking-[0.3em]">Execution Logs</h2>
                <div className="flex items-center gap-2 mt-2">
                   <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Real-time Stream</span>
                </div>
              </div>
              <Activity size={24} className="text-gray-200" />
            </div>
            <div className="flex flex-col gap-6 flex-1">
              {events.slice(0, 4).map((event) => (
                <EventItem
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  color={event.color}
                />
              ))}
              {events.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-50 rounded-[3rem] bg-gray-50/30">
                  <Terminal size={32} className="text-gray-100 mb-6" />
                  <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Stream Idle: No Logs</p>
                </div>
              )}
            </div>
            <button className="w-full mt-12 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-white hover:bg-gray-900 border-2 border-gray-50 rounded-[2rem] transition-all shadow-sm active:scale-95">Archive Access</button>
          </div>
        </div>

        {/* Priority Objective Matrix */}
        <div className="lg:col-span-4 bg-white border-2 border-gray-50 rounded-[4.5rem] p-12 shadow-2xl shadow-gray-100/50 flex flex-col h-full relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(#f3f3f3_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-12 shrink-0">
              <div>
                <h2 className="text-[12px] font-black text-gray-900 uppercase tracking-[0.3em]">Priority Matrix</h2>
                <div className="flex items-center gap-3 mt-2">
                   <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-lg border border-green-100">
                      <CheckCircle2 size={10} className="text-green-600" />
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">{previewTasks.filter(t => t.isCompleted).length} / {previewTasks.length} Resolved</span>
                   </div>
                </div>
              </div>
              <Layers size={24} className="text-gray-200" />
            </div>
            
            <div className="flex flex-col gap-4 flex-1">
              {previewTasks.map((task) => (
                <TaskItem 
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  isCompleted={task.isCompleted}
                  category={task.category}
                  priority={task.priority}
                  dueDate={task.dueDate}
                />
              ))}
            </div>
            <div className="mt-12">
              <ViewAllTasksModal tasks={allTasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


