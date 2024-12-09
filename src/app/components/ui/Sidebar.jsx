"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import '@/app/css/sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Boton para abrir o cerrar el sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
      >
        ☰
      </button>

      {/* Contenedor del sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="p-4 border-b">
          {/* Boton para cerrar el sidebar */}
          <button
            onClick={() => setIsOpen(false)}
            className="close-btn"
          >
            ✖ Cerrar
          </button>
        </div>
        <ul className="p-4 space-y-4">
          {/* Enlace a la pagina de inicio */}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/pages/inicio");
              }}
            >
              Inicio
            </button>
          </li>
          {/* Enlace a la pagina de clientes */}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/pages/clientes");
              }}
            >
              Clientes
            </button>
          </li>
          {/* Enlace a la pagina de proyectos */}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/pages/proyectos");
              }}
            >
              Proyectos
            </button>
          </li>
          {/* Enlace a la pagina de albaranes */}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/pages/albaranes");
              }}
            >
              Albaranes
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
