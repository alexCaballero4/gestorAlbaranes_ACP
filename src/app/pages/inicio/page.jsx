"use client";

import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";
import Image from "next/image";
import albaranImage from "@/app/images/albaran.png";
import "@/app/css/inicio.css";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <Menu />
      <main className="flex-1 p-6 flex flex-col items-center">
        <h2 className="home-title">
          Bienvenido al Gestor de Albaranes
        </h2>
        <p className="home-description">
          Administra fácilmente todos tus clientes, proyectos y albaranes desde un solo lugar. Usa los botones a continuación o el menú lateral para explorar las secciones.
        </p>
        <Image
          src={albaranImage}
          alt="Albarán"
          className="home-image"
          width={500}
          height={300}
          priority
        />
        <div className="home-buttons">
          <button
            onClick={() => window.location.href = "/pages/clientes"}
            className="home-button home-button-blue"
          >
            Ir a Clientes
          </button>
          <button
            onClick={() => window.location.href = "/pages/proyectos"}
            className="home-button home-button-green"
          >
            Ir a Proyectos
          </button>
          <button
            onClick={() => window.location.href = "/pages/albaranes"}
            className="home-button home-button-red"
          >
            Ir a Albaranes
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
