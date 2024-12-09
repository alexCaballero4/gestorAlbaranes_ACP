"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createDeliveryNote } from "@/app/api/apiDeliveryNote";
import { getProjects } from "@/app/api/apiProyect";
import { useRouter } from "next/navigation";

const CreateDeliveryNoteForm = () => {
  // Inicialización de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [projects, setProjects] = useState([]); // Lista de proyectos disponibles
  const [error, setError] = useState(""); // Estado para manejar errores
  const router = useRouter(); // Hook para manejar la navegación

  // Obtiene los proyectos al montar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error al obtener proyectos:", err.message);
      }
    };

    fetchProjects();
  }, []);

  // Maneja los cambios en el proyecto seleccionado
  const handleProjectChange = (projectId) => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      setValue("projectId", project._id);
      setValue("clientId", project.clientId);
    }
  };

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      await createDeliveryNote(data); // Llama a la API para crear el albarán
      router.push("/pages/albaranes"); // Redirige a la lista de albaranes
    } catch (err) {
      console.error("Error al crear el albarán:", err.message);
      setError("No se pudo crear el albarán. Verifique los datos.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Crear Albarán</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Selección de proyecto */}
        <div>
          <label className="block text-gray-800 font-medium">Proyecto</label>
          <select
            {...register("projectId", { required: "Debe seleccionar un proyecto" })}
            onChange={(e) => handleProjectChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.projectId && <p className="text-red-500 text-sm">{errors.projectId.message}</p>}
        </div>
        <input type="hidden" {...register("clientId")} />

        {/* Formato */}
        <div>
          <label className="block text-gray-800 font-medium">Formato</label>
          <select
            {...register("format", { required: "El formato es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="material">Material</option>
            <option value="hours">Horas</option>
          </select>
          {errors.format && <p className="text-red-500 text-sm">{errors.format.message}</p>}
        </div>

        {/* Tipo de material */}
        <div>
          <label className="block text-gray-800 font-medium">Tipo de Material</label>
          <input
            type="text"
            {...register("material", { required: "El tipo de material es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
          {errors.material && <p className="text-red-500 text-sm">{errors.material.message}</p>}
        </div>

        {/* Horas */}
        <div>
          <label className="block text-gray-800 font-medium">Horas</label>
          <input
            type="number"
            {...register("hours", { required: "Las horas son obligatorias", valueAsNumber: true })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
          {errors.hours && <p className="text-red-500 text-sm">{errors.hours.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-gray-800 font-medium">Descripción</label>
          <textarea
            {...register("description", { required: "La descripción es obligatoria" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Fecha de trabajo */}
        <div>
          <label className="block text-gray-800 font-medium">Fecha de Trabajo</label>
          <input
            type="date"
            {...register("workdate", { required: "La fecha de trabajo es obligatoria" })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
          {errors.workdate && <p className="text-red-500 text-sm">{errors.workdate.message}</p>}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Crear Albarán
        </button>
      </form>
    </div>
  );
};

export default CreateDeliveryNoteForm;
