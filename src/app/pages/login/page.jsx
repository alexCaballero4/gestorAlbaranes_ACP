"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/forms/LoginForm";
import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/pages/inicio");
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <Menu />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
