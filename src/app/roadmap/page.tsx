import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import RoadmapView from "@/components/RoadmapView";

export default async function RoadmapPage() {
  const userGoal = await prisma.userGoal.findFirst();
  const roadmapTasks = await prisma.task.findMany({ 
    where: { category: "ROADMAP" },
    orderBy: { milestoneIndex: 'asc' }
  });

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white scrollbar-hide">
      <Header />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Career Roadmap</h2>
          <p className="text-gray-500 mt-2">Your personalized path to {userGoal?.targetRole || "your dream role"} at {userGoal?.targetPackage || "your target package"}.</p>
        </div>
        
        <RoadmapView roadmapJson={userGoal?.roadmap} />
      </div>
    </main>
  );
}
