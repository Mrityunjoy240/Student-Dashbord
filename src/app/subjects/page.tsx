import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { BookOpen, Layers, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany();

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white scrollbar-hide">
      <Header />
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white border card-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
                    subject.color === 'brand' && "bg-brand-50 text-brand-600",
                    subject.color === 'green' && "bg-green-50 text-green-600",
                    subject.color === 'orange' && "bg-orange-50 text-orange-500",
                    subject.color === 'yellow' && "bg-yellow-50 text-yellow-500",
                    subject.color === 'blue' && "bg-blue-50 text-blue-600",
                  )}>
                    {subject.name.includes("Data") ? <Layers size={24} /> : <BookOpen size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{subject.name}</h3>
                    <p className="text-xs text-gray-500">Difficulty: {subject.difficulty}</p>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-brand-600 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-bold text-gray-900">{Math.round((subject.completedTopics / subject.totalTopics) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={clsx(
                    "h-2 rounded-full",
                    subject.color === 'brand' && "bg-brand-500",
                    subject.color === 'green' && "bg-green-500",
                    subject.color === 'orange' && "bg-orange-400",
                    subject.color === 'yellow' && "bg-yellow-400",
                    subject.color === 'blue' && "bg-blue-500",
                  )} style={{ width: `${(subject.completedTopics / subject.totalTopics) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{subject.completedTopics} completed</span>
                  <span>{subject.totalTopics} total topics</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
