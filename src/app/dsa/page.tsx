import Header from "@/components/Header";
import { Code, Trophy, Target, ArrowUpRight } from "lucide-react";

export default function DSAPage() {
  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Code size={24} className="text-brand-600" /> DSA Practice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-brand-50 border border-brand-100 rounded-2xl">
            <h3 className="text-xs font-bold text-brand-600 uppercase mb-4 flex items-center gap-2">
              <Trophy size={14} /> LeetCode Progress
            </h3>
            <div className="text-3xl font-black text-brand-600">245</div>
            <p className="text-xs text-brand-600/70 mt-1">Problems Solved</p>
          </div>
          <div className="p-6 bg-green-50 border border-green-100 rounded-2xl">
            <h3 className="text-xs font-bold text-green-600 uppercase mb-4 flex items-center gap-2">
              <Target size={14} /> Daily Goal
            </h3>
            <div className="text-3xl font-black text-green-600">3 / 5</div>
            <p className="text-xs text-green-600/70 mt-1">Problems Solved Today</p>
          </div>
          <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl text-center flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors">
            <ArrowUpRight size={32} className="text-orange-500 mb-2" />
            <div className="text-sm font-bold text-orange-600">Resume Solving</div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Focus Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { topic: "Graphs", level: "Hard", solved: "12/40" },
            { topic: "Dynamic Programming", level: "Medium", solved: "45/80" },
            { topic: "Trees", level: "Medium", solved: "30/50" },
            { topic: "Arrays & Strings", level: "Easy", solved: "120/120" },
          ].map(item => (
            <div key={item.topic} className="p-4 border card-border rounded-xl flex justify-between items-center bg-white shadow-sm">
              <div>
                <div className="text-sm font-bold text-gray-700">{item.topic}</div>
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{item.level}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-gray-900">{item.solved}</div>
                <div className="w-24 bg-gray-100 h-1 rounded-full mt-1 overflow-hidden">
                  <div className="bg-brand-500 h-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
