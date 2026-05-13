import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, ArrowRight, Wand2, Bot, Layers, BookOpen } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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
  
  // Sort for preview: less time remaining first (dueDate ASC)
  const previewTasks = [...allTasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  }).slice(0, 6);

  const syllabusTasks = allTasks.filter(t => t.subjectId !== null);
  const roadmapTasks = allTasks.filter(t => t.category === "ROADMAP");

  const completedTasksCount = syllabusTasks.filter(t => t.isCompleted).length;

  const calculateDaysLeft = (targetDate: Date | undefined) => {
    if (!targetDate) return 0;
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const goalDaysLeft = calculateDaysLeft(userGoal?.targetDate);
  const examDaysLeft = calculateDaysLeft(exam?.targetDate);

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      {/* Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Goal Progress Card with Analytics */}
        <DetailedProgressModal 
          progress={userGoal?.progress || 0}
          targetPackage={userGoal?.targetPackage || "Not Set"}
          targetRole={userGoal?.targetRole}
          subjects={subjectsData.map(s => ({
            name: s.name,
            completed: s.completedTopics,
            total: s.totalTopics,
            color: s.color
          }))}
          totalTasks={allTasks.length}
          completedTasks={completedTasksCount}
        />


        {/* Time Left Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="bg-brand-50 border border-brand-100 rounded-lg px-3 py-2 mb-6 inline-flex items-center gap-2">
              <Clock size={16} className="text-brand-600" />
              <h2 className="text-sm font-black text-brand-900 uppercase tracking-[0.1em]">
                Time Left to Reach Goal
              </h2>
            </div>
            <LiveTimer targetDate={userGoal?.targetDate || new Date()} />
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-6">
            <div className="flex items-center gap-2">
               <Calendar size={12} className="text-gray-400" />
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{userGoal?.targetDate ? userGoal.targetDate.toLocaleDateString() : "Not Set"}</p>
            </div>
            <EditGoalModal 
              initialPackage={userGoal?.targetPackage || ""} 
              initialDate={formatDateForInput(userGoal?.targetDate)} 
            />
          </div>
        </div>

        {/* Exam Countdown Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-6 inline-flex items-center gap-2">
              <Calendar size={16} className="text-red-600" />
              <h2 className="text-sm font-black text-red-900 uppercase tracking-[0.1em]">
                Exam Countdown
              </h2>
            </div>
            <LiveTimer targetDate={exam?.targetDate || new Date()} variant="red" />
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-6">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{exam?.name || "Next Exam"}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Target: {exam?.targetDate ? exam.targetDate.toLocaleDateString() : "Not Set"}</p>
            </div>
            <EditExamModal 
              initialName={exam?.name || ""} 
              initialDate={formatDateForInput(exam?.targetDate)} 
            />
          </div>
        </div>
      </div>

      {/* Subjects Row */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 inline-flex items-center gap-2">
            <BookOpen size={14} className="text-gray-500" />
            <h2 className="text-[11px] font-black text-gray-700 uppercase tracking-[0.15em]">
              SUBJECTS <span className="text-gray-400 font-bold ml-1">(4th Semester)</span>
            </h2>
          </div>
          <Link href="/subjects" className="text-[10px] font-bold text-brand-600 uppercase tracking-widest hover:underline flex items-center gap-1.5">
            View All <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1.3fr] gap-6 mb-8">
        <CalendarWidget initialEvents={events} />

        {/* Upcoming Events */}
        <div className="bg-white border card-border rounded-xl p-5 shadow-sm flex flex-col">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-5">UPCOMING EVENTS</h2>
          <div className="flex flex-col gap-4 flex-1">
            {events.map((event) => (
              <EventItem
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                color={event.color}
              />
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-100">View All</button>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white border card-border rounded-xl p-5 shadow-sm flex flex-col min-w-0">
          <div className="flex justify-between items-center mb-5 shrink-0">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">PRIORITY TASKS</h2>
            <span className="text-[10px] font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded-md">{previewTasks.filter(t => t.isCompleted).length} / {previewTasks.length} Completed</span>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 text-xs min-w-0">
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
            {previewTasks.length === 0 && (
              <div className="text-center text-gray-400 mt-4">No tasks available.</div>
            )}
          </div>
          <ViewAllTasksModal tasks={allTasks} />
        </div>
      </div>

      {/* AI Manager Bar */}
      <div className="bg-white border card-border rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-brand-600 text-xl"><Wand2 size={24} /></div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">MANAGER (AI ASSISTANT)</h3>
              <ChevronRight size={10} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">I can help you plan, optimize and track your progress. What would you like to do?</p>
          </div>
        </div>
        <AIManagerModal />
      </div>
    </>
  );
}
