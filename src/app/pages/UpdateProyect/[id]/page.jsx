"use client";

import { useParams } from "next/navigation";
import UpdateProyectForm from "@/app/components/forms/UpdateProyectForm";
import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";
import { getProjectById } from "@/app/api/apiProyect";
import { useEffect, useState } from "react";

export default function UpdateProyectPage() {
  const { id } = useParams(); // Extraer el ID de la URL dinámica
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      console.error("No se encontró el ID en la URL.");
      setError("No se encontró el ID del proyecto.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        console.log("ID recibido:", id); // Verifica el ID recibido
        const data = await getProjectById(id);
        console.log("Proyecto obtenido:", data); // Verifica los datos obtenidos
        setProject(data);
      } catch (err) {
        console.error("Error al obtener el proyecto:", err);
        setError("Error al obtener los datos del proyecto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Cargando proyecto...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Menu />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Actualizar Proyecto</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            project && <UpdateProyectForm project={project} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
