"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProjectById } from "@/app/api/apiProyect";
import { getDeliveryNotes } from "@/app/api/apiDeliveryNote";
import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";

const ProjectDetailsPage = () => {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const [project, setProject] = useState(null); // Proyecto obtenido de la API
  const [deliveryNotes, setDeliveryNotes] = useState([]); // Albaranes asociados al proyecto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [localData, setLocalData] = useState(null); // Datos locales: estado y fecha

  useEffect(() => {
    const fetchProjectAndNotes = async () => {
      try {
        // Obtener datos del proyecto
        console.log("Fetching project with ID:", id);
        const projectData = await getProjectById(id);
        console.log("Project data fetched:", projectData);
        setProject(projectData);

        // Obtener datos locales asociados al proyecto
        const storedData = JSON.parse(localStorage.getItem("projectData")) || {};
        if (storedData[id]) {
          setLocalData(storedData[id]);
        }

        // Obtener todos los albaranes
        console.log("Fetching delivery notes...");
        const notesData = await getDeliveryNotes();
        console.log("Delivery notes fetched:", notesData);

        // Filtrar los albaranes para mostrar solo los asociados al proyecto
        const filteredNotes = notesData.filter((note) => {
          const matches = note.projectId === id || note.projectId?._id === id;
          console.log(
            `Checking note: ${note._id}, projectId: ${note.projectId}, matches: ${matches}`
          );
          return matches;
        });
        console.log("Filtered delivery notes:", filteredNotes);

        setDeliveryNotes(filteredNotes);
      } catch (err) {
        console.error("Error al obtener los datos del proyecto o albaranes:", err);
        setError("Error al obtener los datos del proyecto o albaranes");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndNotes();
  }, [id]);

  if (loading) return <div>Cargando datos del proyecto...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Menu />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Detalles del Proyecto
          </h2>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            project && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Nombre:</strong> {project.name}
                </p>
                <p className="text-gray-600">
                  <strong>Código del Proyecto:</strong> {project.projectCode || "No definido"}
                </p>
                <p className="text-gray-600">
                  <strong>Cliente Asociado:</strong> {project.clientId || "No definido"}
                </p>
                {localData && (
                  <>
                    <p className="text-gray-600">
                      <strong>Estado:</strong> {localData.status || "No definido"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Fecha:</strong> {localData.fecha || "No definida"}
                    </p>
                  </>
                )}

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800">Albaranes Asociados</h3>
                  {deliveryNotes.length === 0 ? (
                    <p className="text-gray-600">No hay albaranes asociados a este proyecto.</p>
                  ) : (
                    <ul className="space-y-4">
                      {deliveryNotes.map((note) => (
                        <li key={note._id} className="border-b pb-4">
                          <p className="text-gray-600">
                            <strong>Descripción:</strong> {note.description}
                          </p>
                          <p className="text-gray-600">
                            <strong>Cliente:</strong> {note.clientId || "No definido"}
                          </p>
                          <p className="text-gray-600">
                            <strong>Fecha de Trabajo:</strong> {note.workdate || "No definida"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;
