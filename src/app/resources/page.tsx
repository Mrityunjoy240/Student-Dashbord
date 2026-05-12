import Header from "@/components/Header";
import { FolderOpen, File, Link as LinkIcon, Video, Download } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    { name: "DBMS Lecture Notes.pdf", type: "PDF", size: "4.2 MB", icon: <File size={18} /> },
    { name: "ML Tutorial Series", type: "Link", size: "YouTube", icon: <Video size={18} /> },
    { name: "DSA Problem Set 1", type: "Doc", size: "1.1 MB", icon: <File size={18} /> },
    { name: "OS Reference Book", type: "PDF", size: "28.5 MB", icon: <File size={18} /> },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Learning Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-brand-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-lg shadow-brand-100">
            <div>
              <h3 className="font-bold text-xl mb-1">Syllabus Guide</h3>
              <p className="text-brand-100 text-sm">Download your 4th-semester syllabus</p>
              <button className="mt-6 bg-white text-brand-600 px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
                <Download size={14} /> Download PDF
              </button>
            </div>
            <FolderOpen size={80} className="text-white/20 -rotate-6" />
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 text-white flex items-center justify-between shadow-lg shadow-gray-200">
            <div>
              <h3 className="font-bold text-xl mb-1">Resource Drive</h3>
              <p className="text-gray-400 text-sm">Central repository for all study materials</p>
              <button className="mt-6 bg-brand-600 text-white px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
                <LinkIcon size={14} /> Open Drive
              </button>
            </div>
            <LinkIcon size={80} className="text-white/10 rotate-12" />
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Recent Files</h3>
        <div className="bg-white border card-border rounded-xl shadow-sm overflow-hidden">
          {resources.map((res, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center">
                  {res.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-700">{res.name}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{res.type} • {res.size}</div>
                </div>
              </div>
              <button className="text-gray-300 hover:text-brand-600 transition-colors">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
