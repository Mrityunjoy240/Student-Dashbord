import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import TaskItem from "@/components/TaskItem";
import AddTaskModal from "@/components/AddTaskModal";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { isCompleted: 'asc' } });
  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Task Manager</h2>
            <p className="text-sm text-gray-500 mt-1">
              You have {tasks.length - completedCount} tasks remaining for today.
            </p>
          </div>
          <AddTaskModal />
        </div>

        <div className="bg-white border card-border rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Task Description</span>
            <span>Category</span>
          </div>
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <TaskItem 
                  id={task.id}
                  title={task.title}
                  isCompleted={task.isCompleted}
                  category={task.category}
                />
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No tasks found. Click "Add New Task" to get started!
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-4">
            <div className="text-brand-600 font-bold text-2xl">{tasks.length}</div>
            <div className="text-brand-600/70 text-xs font-medium uppercase tracking-wider">Total Tasks</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="text-green-600 font-bold text-2xl">{completedCount}</div>
            <div className="text-green-600/70 text-xs font-medium uppercase tracking-wider">Completed</div>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
            <div className="text-orange-600 font-bold text-2xl">{tasks.length - completedCount}</div>
            <div className="text-orange-600/70 text-xs font-medium uppercase tracking-wider">Pending</div>
          </div>
        </div>
      </div>
    </main>
  );
}
