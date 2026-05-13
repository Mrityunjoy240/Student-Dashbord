import { Bell } from "lucide-react";
import SyllabusUploadModal from "./SyllabusUploadModal";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Good morning, Rajendra! <span className="text-2xl">👋</span></h1>
        <p className="text-gray-500 text-sm mt-1">Stay consistent and never give up.</p>
      </div>
      <div className="flex items-center gap-4">
        <SyllabusUploadModal />
        <button className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
}
