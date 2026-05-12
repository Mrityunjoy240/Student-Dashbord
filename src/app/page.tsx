import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <div className="max-w-7xl mx-auto">
          <DashboardContent />
        </div>
      </main>
    </>
  );
}


