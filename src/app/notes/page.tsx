import Header from "@/components/Header";
import { StickyNote, Plus, Search, Filter, Hash, MoreHorizontal } from "lucide-react";
import { clsx } from "clsx";

export default function NotesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Mind Palace</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Personal Knowledge Base</p>
            </div>
            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-gray-200 flex items-center gap-2 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Commit Note
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                placeholder="Index search..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-200 transition-all placeholder:text-gray-300 shadow-sm"
              />
            </div>
            <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto scrollbar-hide">
              {["All", "DBMS", "DSA", "ML", "DevOps"].map((tag, i) => (
                <button key={tag} className={clsx(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  i === 0 ? "bg-brand-600 text-white shadow-lg shadow-brand-100" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                )}>
                  {tag}
                </button>
              ))}
              <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "B+ Trees indexing mechanisms", date: "2 hours ago", color: "bg-amber-50/30", tag: "DBMS", text: "Leaf nodes contain pointers to data records. Internal nodes only contain keys for routing..." },
              { title: "Dynamic Programming: Memoization vs Tabulation", date: "Yesterday", color: "bg-blue-50/30", tag: "DSA", text: "Top-down approach uses recursion and a lookup table. Bottom-up builds from base cases..." },
              { title: "Stochastic Gradient Descent Optimization", date: "3 days ago", color: "bg-emerald-50/30", tag: "ML", text: "SGD updates weights per sample, making it faster for large datasets but more volatile..." },
              { title: "Docker Container Lifecycle", date: "May 10", color: "bg-indigo-50/30", tag: "DevOps", text: "Created -> Running -> Paused -> Stopped. Using docker-compose for multi-container apps..." },
            ].map((note, i) => (
              <div key={i} className={clsx("group p-6 rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col h-[280px] cursor-pointer hover:border-brand-200 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden")}>
                <div className={clsx("absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity", note.color.replace('/30', ''))}></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-brand-100 transition-colors">
                    <StickyNote size={18} className="text-gray-400 group-hover:text-brand-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{note.date}</span>
                    <button className="text-gray-300 hover:text-gray-900 transition-colors"><MoreHorizontal size={16} /></button>
                  </div>
                </div>
                
                <div className="flex-1 relative z-10">
                  <h3 className="font-bold text-gray-900 tracking-tight mb-3 group-hover:text-brand-700 transition-colors">{note.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-4">{note.text}</p>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Hash size={10} className="text-brand-500" />
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{note.tag}</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center p-8 h-[280px] hover:border-brand-200 hover:bg-brand-50/10 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus size={24} className="text-gray-300 group-hover:text-brand-600" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-brand-600 transition-colors">New Knowledge Node</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


