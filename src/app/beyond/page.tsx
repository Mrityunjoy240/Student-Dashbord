import Header from "@/components/Header";
import { TrendingUp, Award, Star, ArrowRight } from "lucide-react";

export default function BeyondSyllabusPage() {
  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-4xl">
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp size={24} className="text-brand-600" /> Beyond Syllabus
          </h2>
          <p className="text-sm text-gray-500">Skills and knowledge that make you stand out in the industry.</p>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-orange-500" /> Professional Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "AWS Cloud Practitioner", provider: "Amazon", status: "Ongoing" },
                { title: "Google Data Analytics", provider: "Coursera", status: "Planned" },
              ].map(cert => (
                <div key={cert.title} className="p-6 border card-border rounded-2xl flex justify-between items-center bg-gray-50/30">
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{cert.title}</div>
                    <div className="text-xs text-gray-400">{cert.provider}</div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-1 rounded">{cert.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star size={18} className="text-yellow-500" /> Trending Technologies
            </h3>
            <div className="bg-white border card-border rounded-2xl overflow-hidden shadow-sm">
              {[
                "Generative AI & LLMs",
                "Rust Programming",
                "Post-Quantum Cryptography",
                "Edge Computing"
              ].map((tech, i) => (
                <div key={tech} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                  <span className="text-sm font-medium text-gray-700">{tech}</span>
                  <ArrowRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
