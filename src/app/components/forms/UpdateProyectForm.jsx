"use client";

import { useForm } from "react-hook-form";
import { updateProject } from "@/app/api/apiProyect";
import { useRouter } from "next/navigation";

const UpdateProyectForm = ({ project }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: project }); // Configura el formulario con valores por defecto
  const router = useRouter();

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      // Llama a la API para actualizar el proyecto
      await updateProject(project._id, data);

      // Actualiza los datos locales en caso de cambio en el estado o fecha
      const localProjects = JSON.parse(localStorage.getItem("projectData")) || {};
      if (data.status) {
        localProjects[project._id] = { ...localProjects[project._id], status: data.status };
      }
      localStorage.setItem("projectData", JSON.stringify(localProjects));

      // Resetea el formulario y redirige a la página de proyectos
      reset();
      router.push("/pages/proyectos");
    } catch (err) {
      console.error("Error al actualizar el proyecto:", err); // Manejo de errores
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Actualizar Proyecto</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input para el nombre del proyecto */}
        <div>
          <label className="block text-gray-800">Nombre del Proyecto</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full text-gray-800 rounded-md shadow-sm"
          />
        </div>

        {/* Input para el código del proyecto */}
        <div>
          <label className="block text-gray-800">Código del Proyecto</label>
          <input
            type="text"
            {...register("projectCode", { required: true })}
            className="w-full text-gray-800 rounded-md shadow-sm"
          />
        </div>

        {/* Select para el estado del proyecto */}
        <div>
          <label className="block text-gray-800">Estado del Proyecto</label>
          <select
            {...register("status", { required: true })}
            className="w-full text-gray-800 rounded-md shadow-sm"
          >
            <option value="cancelado">Cancelado</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        {/* Botón de actualización */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Actualizar Proyecto
        </button>
      </form>
    </div>
  );
};

export default UpdateProyectForm;
