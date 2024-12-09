"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '@/app/api/apiOnboarding';

const RegisterForm = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Manejo del formulario y validaciones
  const [error, setError] = useState(''); // Estado para manejar errores de registro

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data); // Llama a la API para registrar al usuario
      localStorage.setItem('jwt', response.token); // Guarda el token en localStorage para sesiones futuras
      setError(''); // Limpia cualquier error previo
      onSuccess(response.token); // Llama a la función `onSuccess` pasada como prop
    } catch (err) {
      setError('Error al registrar el usuario'); // Manejo de errores de registro
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Input para el email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'El email es obligatorio', // Validación: campo obligatorio
            pattern: { 
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Validación del formato de email
              message: 'Email inválido' // Mensaje de error si el formato no es válido
            }
          })}
          className="w-full mt-1 p-3 border text-gray-600 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
        />
        {/* Muestra mensaje de error si hay problemas con el email */}
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Input para la contraseña */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'La contraseña es obligatoria', // Validación: campo obligatorio
            minLength: { 
              value: 6, 
              message: 'La contraseña debe tener al menos 6 caracteres' // Validación de longitud mínima
            }
          })}
          className="w-full mt-1 p-3 border text-gray-600 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
        />
        {/* Muestra mensaje de error si hay problemas con la contraseña */}
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-500 transition"
      >
        Registrar
      </button>

      {/* Muestra mensajes de error generales */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default RegisterForm;
