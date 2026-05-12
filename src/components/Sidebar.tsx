"use client";

import { Layers, Home, BookOpen, Calendar, FileText, CheckSquare, StickyNote, FolderOpen, Briefcase, Code, TrendingUp, Bot, Settings, Clock, Play, Map } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFocus } from "./FocusMode";
import { clsx } from "clsx";

export default function Sidebar() {
  const { toggleFocusMode } = useFocus();
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-100 flex flex-col bg-white h-screen sticky top-0 font-sans antialiased shrink-0 overflow-y-auto scrollbar-hide">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-100">
          <Layers size={18} className="text-white" />
        </div>
        <span className="font-bold tracking-tight text-gray-900">Academic OS</span>
      </div>

      <nav className="flex-1 px-3 mt-4">
        <div className="space-y-1 mb-8">
          {[
            { icon: Home, label: "Dashboard", href: "/" },
            { icon: Map, label: "Roadmap", href: "/roadmap" },
          ].map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={idx} 
                href={item.href} 
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all", 
                  isActive ? "bg-gray-50 text-brand-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={14} className={isActive ? "text-brand-600" : "text-gray-400"} /> {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-3 mb-3">Academics</h3>
          <div className="space-y-0.5">
            {[
              { icon: BookOpen, label: "Subjects", href: "/subjects" },
              { icon: Calendar, label: "Calendar", href: "/calendar" },
              { icon: FileText, label: "Exams", href: "/exams" },
            ].map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={idx} 
                  href={item.href} 
                  className={clsx(
                    "flex items-center gap-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all", 
                    isActive ? "bg-gray-50 text-brand-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon size={14} className={isActive ? "text-brand-600" : "text-gray-400"} /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-3 mb-3">Productivity</h3>
          <div className="space-y-0.5">
            {[
              { icon: CheckSquare, label: "Tasks", href: "/tasks" },
              { icon: StickyNote, label: "Notes", href: "/notes" },
              { icon: FolderOpen, label: "Resources", href: "/resources" },
              { icon: Briefcase, label: "Projects", href: "/projects" },
              { icon: Code, label: "DSA Practice", href: "/dsa" },
              { icon: TrendingUp, label: "Beyond Syllabus", href: "/beyond" },
            ].map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={idx} 
                  href={item.href} 
                  className={clsx(
                    "flex items-center gap-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all", 
                    isActive ? "bg-gray-50 text-brand-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon size={14} className={isActive ? "text-brand-600" : "text-gray-400"} /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-3 mb-3">System</h3>
          <div className="space-y-0.5">
            {[
              { icon: Bot, label: "Manager (AI)", href: "/ai-manager" },
            ].map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={idx} 
                  href={item.href} 
                  className={clsx(
                    "flex items-center gap-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all", 
                    isActive ? "bg-gray-50 text-brand-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon size={14} className={isActive ? "text-brand-600" : "text-gray-400"} /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-50">
        <button 
          onClick={toggleFocusMode}
          className="w-full flex items-center justify-center gap-2 bg-gray-950 text-white py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-gray-200"
        >
          <Play size={12} fill="currentColor" /> Enter Focus Mode
        </button>
        <div className="mt-4 flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xs border border-brand-200">
            RA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-900 truncate uppercase tracking-widest">Rajendra Arumugam</p>
            <p className="text-[9px] text-gray-400 font-medium truncate uppercase">Pro Plan</p>
          </div>
          <Settings size={14} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
