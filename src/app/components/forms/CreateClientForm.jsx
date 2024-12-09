"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/api/apiCliente";

const CreateClientForm = () => {
  // Configuración de React Hook Form para gestionar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(""); // Estado para errores en la creación
  const [success, setSuccess] = useState(false); // Estado para éxito en la creación
  const router = useRouter(); // Hook para redirigir al usuario

  // Manejo del envío del formulario
  const onSubmit = async (data) => {
    try {
      const formattedData = {
        name: data.name,
        cif: data.cif,
        address: {
          street: data.street,
          number: data.number,
          postal: data.postal,
          city: data.city,
          province: data.province,
        },
      };

      await createClient(formattedData); // Llama a la API para crear el cliente
      setSuccess(true); // Indica éxito en la operación
      setError(""); // Limpia cualquier error previo
      router.push("/pages/clientes"); // Redirige a la página de clientes
    } catch (err) {
      setError("Error al crear el cliente");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-md shadow-md"
    >
      {/* Campo para el nombre del cliente */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-800"
        >
          Nombre del Cliente o Empresa
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "El nombre es obligatorio" })}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Campo para el CIF */}
      <div>
        <label htmlFor="cif" className="block text-sm font-medium text-gray-800">
          CIF
        </label>
        <input
          type="text"
          id="cif"
          {...register("cif", { required: "El CIF es obligatorio" })}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
        />
        {errors.cif && (
          <p className="text-red-500 text-sm">{errors.cif.message}</p>
        )}
      </div>

      {/* Campos para la dirección */}
      {[
        { id: "street", label: "Calle", type: "text" },
        { id: "number", label: "Número", type: "number" },
        { id: "postal", label: "Código Postal", type: "number" },
        { id: "city", label: "Ciudad", type: "text" },
        { id: "province", label: "Provincia", type: "text" },
      ].map((field) => (
        <div key={field.id}>
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-800"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            {...register(field.id, {
              required: `${field.label} es obligatorio`,
            })}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
          {errors[field.id] && (
            <p className="text-red-500 text-sm">
              {errors[field.id]?.message}
            </p>
          )}
        </div>
      ))}

      {/* Botón para enviar */}
      <button
        type="submit"
        className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
      >
        Guardar
      </button>

      {/* Mensajes de error y éxito */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm mt-2">
          ¡Cliente creado exitosamente!
        </p>
      )}
    </form>
  );
};

export default CreateClientForm;
