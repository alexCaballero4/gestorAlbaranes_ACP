"use client"; // Marca este archivo como un componente del lado del cliente

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProject } from "@/app/api/apiProyect";
import { getClients } from "@/app/api/apiCliente";
import { useRouter } from "next/navigation";

const CreateProyectForm = () => {
  const { register, handleSubmit, reset } = useForm(); // Inicialización de react-hook-form
  const [clients, setClients] = useState([]); // Lista de clientes disponibles
  const [error, setError] = useState(""); // Estado para manejar errores
  const router = useRouter(); // Hook para manejar la navegación

  // Obtiene los clientes disponibles al montar el componente
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data); // Actualiza la lista de clientes
      } catch (err) {
        setError("Error al obtener los clientes");
      }
    };

    fetchClients();
  }, []);

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      // Agrega la fecha actual al proyecto
      const dateNow = new Date().toLocaleDateString("es-ES");
      const projectData = { ...data, fecha: dateNow };

      // Crea el proyecto en la API
      const createdProject = await createProject(projectData);

      // Guarda información adicional del proyecto en localStorage
      const localProjects = JSON.parse(localStorage.getItem("projectData")) || {};
      localProjects[createdProject._id] = { status: data.status, fecha: dateNow };
      localStorage.setItem("projectData", JSON.stringify(localProjects));

      // Resetea el formulario y redirige a la lista de proyectos
      reset();
      router.push("/pages/proyectos");
    } catch (err) {
      setError("Error al crear el proyecto");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Crear Proyecto</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo para el nombre del proyecto */}
        <div>
          <label className="block text-gray-800 font-medium">Nombre del Proyecto</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
        </div>

        {/* Campo para el código del proyecto */}
        <div>
          <label className="block text-gray-800 font-medium">Código del Proyecto</label>
          <input
            type="text"
            {...register("projectCode", { required: "El código es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
        </div>

        {/* Campo para seleccionar cliente */}
        <div>
          <label className="block text-gray-800 font-medium">Cliente Asociado</label>
          <select
            {...register("clientId", { required: "Debe seleccionar un cliente" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para el estado del proyecto */}
        <div>
          <label className="block text-gray-800 font-medium">Estado del Proyecto</label>
          <select
            {...register("status", { required: "Debe seleccionar un estado" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="">Selecciona un estado</option>
            <option value="cancelado">Cancelado</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};

export default CreateProyectForm;
