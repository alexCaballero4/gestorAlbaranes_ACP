import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";
import Projects from "@/app/components/pag/projects";

export default function AlbaranesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <Menu />
      <div className="flex">
        <main className="flex-1 p-6">
          <Projects />
        </main>
      </div>
      <Footer />
    </div>
  );
}
