import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { Briefcase, Link as LinkIcon, Twitter, Linkedin, Github, Globe, ExternalLink, Plus, CheckCircle2, Circle } from "lucide-react";

export default async function CareerPage() {
  const userGoal = await prisma.userGoal.findFirst();

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
                <Briefcase size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Career Forge</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Networking & Portfolio Tracking</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Target Package</p>
                  <p className="text-2xl font-bold text-brand-600 tracking-tight">{userGoal?.targetPackage || "15 LPA"}</p>
                </div>
                <div className="w-px h-10 bg-gray-100"></div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Target Role</p>
                  <p className="text-lg font-bold text-gray-900 tracking-tight">{userGoal?.targetRole || "Software Engineer"}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Success Probability</p>
                <p className="text-lg font-bold text-green-600 tracking-tight">High (84%)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Networking */}
            <div className="lg:col-span-8 space-y-8">
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <LinkIcon size={14} /> ACTIVE OUTREACH
                  </h2>
                  <button className="text-[9px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-all">
                    Add Contact
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Sundeep Rao", company: "Google", platform: "LinkedIn", status: "Contacted", avatar: "SR" },
                    { name: "Ananya Sharma", company: "Microsoft", platform: "Twitter", status: "Follow-up", avatar: "AS" },
                    { name: "Rohan Das", company: "Amazon", platform: "LinkedIn", status: "Replied", avatar: "RD" },
                    { name: "Kiran J", company: "Meta", platform: "LinkedIn", status: "Idle", avatar: "KJ" },
                  ].map((contact, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl hover:border-brand-200 transition-all group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                          {contact.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900">{contact.name}</h3>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{contact.company}</p>
                        </div>
                        <div className={contact.platform === "LinkedIn" ? "text-[#0077B5]" : "text-gray-950"}>
                          {contact.platform === "LinkedIn" ? <Linkedin size={16} /> : <Twitter size={16} />}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                          contact.status === "Replied" ? "bg-green-50 text-green-600" :
                          contact.status === "Follow-up" ? "bg-orange-50 text-orange-600" :
                          "bg-gray-50 text-gray-400"
                        }`}>
                          {contact.status}
                        </span>
                        <button className="text-gray-400 group-hover:text-brand-600 transition-colors">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe size={14} /> PORTFOLIO MILESTONES
                  </h2>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                  {[
                    { title: "Personal Website v2", status: "Completed", date: "Last Week" },
                    { title: "Open Source Contribution", status: "In Progress", date: "Target: May 20" },
                    { title: "Tech Blog Post (Weekly)", status: "Pending", date: "Next: Sunday" },
                  ].map((milestone, i) => (
                    <div key={i} className="p-5 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50/50 transition-all">
                      <div className="flex items-center gap-4">
                        {milestone.status === "Completed" ? (
                          <CheckCircle2 size={18} className="text-green-500" />
                        ) : (
                          <Circle size={18} className="text-gray-200" />
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{milestone.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{milestone.date}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        milestone.status === "Completed" ? "border-green-100 text-green-600" :
                        milestone.status === "In Progress" ? "border-brand-100 text-brand-600" :
                        "border-gray-100 text-gray-400"
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Stats & Quick Actions */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-gray-950 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h3 className="text-xs font-black text-brand-400 uppercase tracking-[0.2em] mb-6">NETWORKING STATS</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span>Weekly outreach</span>
                      <span className="text-brand-400">12 / 15</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-brand-500 h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-xl font-bold">24</p>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">LinkedIn Conns</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-xl font-bold">8</p>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">Referrals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6">SOCIAL LINKS</h3>
                <div className="space-y-3">
                  {[
                    { icon: Github, label: "github.com/student", active: true },
                    { icon: Linkedin, label: "linkedin.com/in/student", active: true },
                    { icon: Twitter, label: "twitter.com/student", active: false },
                  ].map((link, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-gray-200 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <link.icon size={14} className={link.active ? "text-gray-900" : "text-gray-300"} />
                        <span className={`text-[11px] font-medium ${link.active ? "text-gray-700" : "text-gray-300 italic"}`}>
                          {link.label}
                        </span>
                      </div>
                      {link.active ? (
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      ) : (
                        <Plus size={12} className="text-gray-300 group-hover:text-brand-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

