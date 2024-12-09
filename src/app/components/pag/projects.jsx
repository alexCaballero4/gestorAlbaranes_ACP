"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjects, deleteProject } from "@/app/api/apiProyect";
import { getClients } from "@/app/api/apiCliente";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [localProjects, setLocalProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProjectsAndClients = async () => {
      try {
        const [projectsData, clientsData] = await Promise.all([getProjects(), getClients()]);
        setProjects(projectsData);
        setClients(clientsData);

        const savedProjects = JSON.parse(localStorage.getItem("projectData")) || {};
        setLocalProjects(savedProjects);
      } catch (err) {
        setError("Error al obtener proyectos o clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndClients();
  }, []);

  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : "Cliente no encontrado";
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));

      const updatedData = { ...localProjects };
      delete updatedData[id];
      setLocalProjects(updatedData);
      localStorage.setItem("projectData", JSON.stringify(updatedData));
    } catch (err) {
      setError("Error al eliminar el proyecto.");
    }
  };

  if (loading) return <div className="text-gray-600">Cargando proyectos...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Proyectos</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6">
        <button
          onClick={() => router.push("/pages/createProyect")}
          className="bg-cyan-900 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Crear Proyecto
        </button>
      </div>

      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-600">{project.name}</h3>
            <p className="text-gray-700">
              <strong>Cliente:</strong> {getClientName(project.clientId)}
            </p>
            <p className="text-gray-700">
              <strong>Estado:</strong> {localProjects[project._id]?.status || "No definido"}
            </p>
            <p className="text-gray-700">
              <strong>Fecha:</strong> {localProjects[project._id]?.fecha || "No definida"}
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => router.push(`/pages/UpdateProyect/${project._id}`)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Editar
              </button>
              <button
                onClick={() => router.push(`/pages/proyectDetails/${project._id}`)}
                className="bg-cyan-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Detalles
              </button>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
