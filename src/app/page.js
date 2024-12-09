"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/ui/Header";
import Footer from "@/app/components/ui/Footer";
import "@/app/css/home.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Elimina cualquier token previo al cargar la página
    localStorage.removeItem("jwt");

    // Verifica si el usuario está autenticado
    const token = localStorage.getItem("jwt");
    if (token) {
      router.push("/inicio"); // Redirige a la página de inicio si el token está presente
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cabecera */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col justify-center items-center bg-blue-50 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Bienvenido al Gestor de Albaranes
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Organiza y gestiona tus proyectos y albaranes con facilidad.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/pages/login")}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Iniciar Sesion
          </button>
          <button
            onClick={() => router.push("/pages/register")}
            className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Registrarse
          </button>
        </div>
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
