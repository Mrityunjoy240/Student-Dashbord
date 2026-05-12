import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import EditExamModal from "@/components/EditExamModal";
import { Calendar, FileText, AlertCircle } from "lucide-react";

export default async function ExamsPage() {
  const exam = await prisma.exam.findFirst();
  
  const calculateDaysLeft = (targetDate: Date | undefined) => {
    if (!targetDate) return 0;
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysLeft = calculateDaysLeft(exam?.targetDate);

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Examination Center</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2">Primary Countdown</h3>
              <div className="text-6xl font-black text-red-500 mb-2">{daysLeft}</div>
              <div className="text-red-600/70 font-bold text-xl mb-6">Days Remaining</div>
              <p className="text-red-600/60 text-sm mb-8 font-medium">For: {exam?.name || "No exam scheduled"}</p>
              
              <EditExamModal 
                initialName={exam?.name || ""} 
                initialDate={exam?.targetDate ? exam.targetDate.toISOString().split('T')[0] : ""} 
              />
            </div>
            <FileText size={160} className="absolute -right-10 -bottom-10 text-red-100/50 -rotate-12" />
          </div>

          <div className="bg-white border card-border rounded-2xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Exam Guidelines</h3>
                <p className="text-xs text-gray-500">Essential rules for semester exams</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full" /> Admit card is mandatory</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full" /> Reach 30 mins before start time</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full" /> No electronic gadgets allowed</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full" /> ID card must be visible</li>
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Subject-wise Preparation</h3>
        <div className="bg-white border card-border rounded-xl shadow-sm divide-y divide-gray-100">
          {["Data Structures", "DBMS", "Operating Systems", "Computer Networks"].map((sub) => (
            <div key={sub} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                  <FileText size={16} />
                </div>
                <span className="font-medium text-sm text-gray-700">{sub}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Ready</span>
                <button className="text-xs text-brand-600 font-semibold hover:underline">View Material</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
