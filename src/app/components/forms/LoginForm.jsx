"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "@/app/api/apiOnboarding";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Hook para manejar el formulario y validaciones
  const [error, setError] = useState(''); // Estado para manejar errores de inicio de sesión
  const [success, setSuccess] = useState(false); // Estado para manejar mensajes de éxito
  const router = useRouter(); // Hook para redirigir al usuario después del login

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      // Llamada a la API para iniciar sesión
      const response = await loginUser(data);
      
      // Guardar el token en localStorage para autenticar al usuario
      localStorage.setItem('jwt', response.token);
      setSuccess(true); // Mostrar mensaje de éxito
      
      // Redirigir al usuario a la página principal después del login
      router.push("/pages/inicio");
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-transparent">
      {/* Input para el email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'El email es obligatorio', // Validación: campo obligatorio
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Validación de formato de email
              message: 'Email inválido', // Mensaje de error si el email no es válido
            }
          })}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:ring focus:ring-blue-300"
        />
        {/* Mostrar mensaje de error si hay problemas con el campo email */}
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Input para la contraseña */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'La contraseña es obligatoria', // Validación: campo obligatorio
            minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } // Validación: mínimo de caracteres
          })}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:ring focus:ring-blue-300"
        />
        {/* Mostrar mensaje de error si hay problemas con el campo contraseña */}
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Botón para enviar el formulario */}
      <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
        Iniciar sesión
      </button>

      {/* Mostrar mensajes de error o éxito */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">¡Inicio de sesión exitoso!</p>}
    </form>
  );
};

export default LoginForm;
