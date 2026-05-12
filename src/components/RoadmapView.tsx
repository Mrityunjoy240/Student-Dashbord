"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Loader2, Map, Target, Calendar, ArrowRight, Star, Award, Briefcase, ArrowUpRight, ChevronRight, Zap, Link as LinkIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Resource {
  name: string;
  url: string;
}

interface Milestone {
  title: string;
  details: string;
  resources?: Resource[];
}

interface Semester {
  term: string;
  focus: string;
  milestones: Milestone[];
}

interface RoadmapData {
  semesters: Semester[];
}

export default function RoadmapView({ roadmapJson }: { roadmapJson?: string | null }) {
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("roadmap_progress");
    if (saved) {
      try {
        setCompletedMilestones(new Set(JSON.parse(saved)));
      } catch (e) {}
    }
  }, []);

  let roadmap: RoadmapData | null = null;
  try {
    if (roadmapJson) roadmap = JSON.parse(roadmapJson);
  } catch (e) {
    console.error("Failed to parse roadmap:", e);
  }

  // Handle legacy schema
  if (roadmap && !roadmap.semesters && (roadmap as any).milestones) {
    // Convert old format to new format locally
    roadmap = {
      semesters: [
        {
          term: "Career Path",
          focus: "Core Skills",
          milestones: (roadmap as any).milestones.map((m: any) => ({
            title: m.task,
            details: m.details,
            resources: []
          }))
        }
      ]
    };
  }

  if (!roadmap || !roadmap.semesters) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-20 text-center shadow-sm">
        <Target size={48} className="mx-auto mb-4 text-gray-200" />
        <h3 className="text-sm font-semibold text-gray-900">Roadmap Not Found</h3>
        <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto tracking-tight">Generate your career path by completing onboarding or uploading a syllabus.</p>
      </div>
    );
  }

  const handleToggle = (milestoneId: string) => {
    const updateState = () => {
      setCompletedMilestones(prev => {
        const next = new Set(prev);
        if (next.has(milestoneId)) next.delete(milestoneId);
        else next.add(milestoneId);
        localStorage.setItem("roadmap_progress", JSON.stringify(Array.from(next)));
        return next;
      });
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        updateState();
      });
    } else {
      updateState();
    }
  };

  const totalMilestones = roadmap.semesters.reduce((acc, sem) => acc + sem.milestones.length, 0);
  const completedCount = completedMilestones.size;
  const progressPercent = totalMilestones === 0 ? 0 : Math.round((completedCount / totalMilestones) * 100);
  const xp = completedCount * 150;

  let badge = "Novice";
  if (xp > 1000) badge = "Expert";
  else if (xp > 600) badge = "Specialist";
  else if (xp > 300) badge = "Explorer";

  if (!mounted) return null; // Avoid hydration mismatch on localstorage

  return (
    <div className="space-y-10 pb-20">
      {/* Gamified Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2 bg-gray-950 rounded-xl p-6 text-white shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600 rounded-full blur-[100px] opacity-30 -mr-16 -mt-16 transition-opacity group-hover:opacity-50"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Mastery Progress</span>
              <div className="flex items-baseline gap-3 mb-6">
                <div className="text-5xl font-semibold tracking-tight" style={{ viewTransitionName: 'progress-percent' }}>{progressPercent}%</div>
                <div className="text-xs font-bold text-brand-400 uppercase tracking-widest">Completed</div>
              </div>
            </div>
            <div>
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div className="text-[10px] text-gray-400 font-medium tracking-wide">{completedCount} of {totalMilestones} milestones reached</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border card-border rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-gray-50 opacity-50"><Zap size={100} /></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-4 relative z-10">Experience</span>
          <div className="relative z-10">
            <div className="text-4xl font-semibold text-gray-900 mb-1 tracking-tight" style={{ viewTransitionName: 'xp-score' }}>{xp} <span className="text-sm text-gray-400 font-medium">XP</span></div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-2 bg-orange-50 w-fit px-2 py-1 rounded">
               <Star size={12} fill="currentColor" /> {badge}
            </div>
          </div>
        </div>

        <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400 block mb-4">Focus Area</span>
          <div>
            <div className="text-lg font-semibold text-brand-900 leading-tight mb-2 tracking-tight">
              {roadmap.semesters[activeTab]?.focus}
            </div>
            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest flex items-center gap-1">
              <Target size={12} /> {roadmap.semesters[activeTab]?.term}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {roadmap.semesters.map((sem, idx) => {
          const semMilestones = sem.milestones.length;
          const semCompleted = sem.milestones.filter(m => completedMilestones.has(`${idx}-${m.title}`)).length;
          const semProgress = semMilestones > 0 ? (semCompleted / semMilestones) * 100 : 0;
          const isActive = activeTab === idx;

          return (
            <button
              key={idx}
              onClick={() => {
                if (document.startViewTransition) document.startViewTransition(() => setActiveTab(idx));
                else setActiveTab(idx);
              }}
              className={cn(
                "min-w-[200px] text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden flex-shrink-0",
                isActive 
                  ? "border-brand-500 bg-white shadow-md ring-1 ring-brand-500/20" 
                  : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200"
              )}
            >
              {isActive && <div className="absolute top-0 left-0 right-0 h-1 bg-brand-500"></div>}
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{sem.term}</div>
              <div className={cn("text-sm font-semibold truncate", isActive ? "text-gray-900" : "text-gray-700")}>{sem.focus}</div>
              
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1 overflow-hidden">
                  <div className={cn("h-1 rounded-full transition-all duration-500", isActive ? "bg-brand-500" : "bg-gray-400")} style={{ width: `${semProgress}%` }}></div>
                </div>
                <div className="text-[10px] font-bold text-gray-400">{semCompleted}/{semMilestones}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Semester Content */}
      <div className="relative max-w-4xl mx-auto pt-6">
        <div className="absolute left-[39px] top-10 bottom-4 w-px bg-gradient-to-b from-brand-500 via-gray-200 to-transparent"></div>

        <div className="space-y-6">
          {roadmap.semesters[activeTab]?.milestones.map((m, i) => {
            const milestoneId = `${activeTab}-${m.title}`;
            const isCompleted = completedMilestones.has(milestoneId);

            return (
              <div key={i} className="relative flex gap-6 lg:gap-8 group">
                {/* Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <button 
                    onClick={() => handleToggle(milestoneId)}
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border bg-white relative",
                      isCompleted 
                        ? "border-brand-500 text-brand-500" 
                        : "border-gray-200 text-gray-400 hover:border-brand-500 hover:text-brand-600 hover:shadow-md"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={32} className="animate-in zoom-in duration-300 fill-brand-50 text-brand-600" />
                    ) : (
                      <div className="text-2xl font-bold">{i + 1}</div>
                    )}
                    {/* Ring animation on hover when not completed */}
                    {!isCompleted && <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500 ring-offset-2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300"></div>}
                  </button>
                </div>

                {/* Content Card */}
                <div className={cn(
                  "border rounded-2xl p-6 lg:p-8 flex-1 transition-all duration-500 bg-white relative overflow-hidden",
                  isCompleted 
                    ? "border-brand-200 shadow-md ring-1 ring-brand-100" 
                    : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
                )}>
                  {/* Subtle success background for completed tasks */}
                  {isCompleted && <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent pointer-events-none"></div>}
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                      <div>
                        <h4 className={cn(
                          "text-lg lg:text-xl font-bold transition-all tracking-tight mb-2",
                          isCompleted ? "text-brand-900" : "text-gray-900"
                        )}>
                          {m.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm max-w-2xl">{m.details}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleToggle(milestoneId)}
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all self-start flex items-center gap-2",
                          isCompleted 
                            ? "bg-brand-600 text-white shadow-sm shadow-brand-200 hover:bg-brand-700" 
                            : "bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white"
                        )}
                      >
                        {isCompleted ? (
                          <>Completed <CheckCircle2 size={14} /></>
                        ) : (
                          "Mark Done"
                        )}
                      </button>
                    </div>

                    {m.resources && m.resources.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                          <LinkIcon size={12} /> Key Resources
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {m.resources.map((res, ridx) => (
                            <a 
                              key={ridx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-gray-700 hover:border-brand-200 text-xs font-semibold rounded-lg transition-all border border-gray-200 shadow-sm"
                            >
                              {res.name} <ArrowUpRight size={12} />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
