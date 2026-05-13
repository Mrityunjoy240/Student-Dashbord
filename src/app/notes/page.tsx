import Header from "@/components/Header";
import { StickyNote, Plus, Search } from "lucide-react";

export default function NotesPage() {
  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">Personal Notes</h2>
          <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={18} /> New Note
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              placeholder="Search your notes..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex gap-2">
            {["Recent", "DBMS", "DSA", "ML"].map(tag => (
              <button key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-brand-50 hover:text-brand-600 transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "B+ Trees in DBMS", date: "2 hours ago", color: "bg-yellow-50" },
            { title: "Dynamic Programming Patterns", date: "Yesterday", color: "bg-blue-50" },
            { title: "ML Gradient Descent", date: "3 days ago", color: "bg-green-50" },
          ].map((note, i) => (
            <div key={i} className={clsx("p-6 rounded-2xl border card-border shadow-sm flex flex-col h-48 cursor-pointer hover:-translate-y-1 transition-transform", note.color)}>
              <div className="flex justify-between items-start mb-4">
                <StickyNote size={20} className="text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">{note.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 flex-1">{note.title}</h3>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { clsx } from "clsx";
