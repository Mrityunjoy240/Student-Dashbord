import Header from "@/components/Header";
import { Briefcase, Terminal, ExternalLink, Plus } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    { title: "Student Dashboard", status: "In Progress", tech: ["Next.js", "Prisma"], color: "bg-brand-50" },
    { title: "Library Management", status: "Completed", tech: ["Java", "SQL"], color: "bg-green-50" },
    { title: "Portfolio Website", status: "Planned", tech: ["React", "Tailwind"], color: "bg-blue-50" },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
          <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={18} /> New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className={clsx("p-6 rounded-2xl border card-border shadow-sm flex flex-col", p.color)}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-900 shadow-sm">
                  <Briefcase size={20} />
                </div>
                <div className="flex gap-2">
                  <Terminal size={16} className="text-gray-400 cursor-pointer hover:text-gray-900" />
                  <ExternalLink size={16} className="text-gray-400 cursor-pointer hover:text-gray-900" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
              <div className="flex gap-2 mb-6">
                {p.tech.map(t => (
                  <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-white/50 rounded-full border border-white/20">{t}</span>
                ))}
              </div>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{p.status}</span>
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { clsx } from "clsx";
