"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateEmail } from '@/app/api/apiOnboarding';
import { useRouter } from 'next/navigation';

const ValidationForm = ({ token }) => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Configura el formulario
  const [error, setError] = useState(''); // Almacena mensajes de error
  const [success, setSuccess] = useState(false); // Indica si la validación fue exitosa
  const router = useRouter();

  // Maneja el envío del formulario
  const onSubmit = async (data) => {
    try {
      // Valida el código de validación enviado por el usuario
      await validateEmail(data.validationCode);
      setSuccess(true); // Muestra mensaje de éxito
      setError(''); // Limpia mensajes de error

      // Redirige al inicio tras una validación exitosa
      setTimeout(() => {
        router.push('/pages/inicio');
      }, 2000);
    } catch (err) {
      setError('Error al validar el correo');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Campo para el código de validación */}
      <div>
        <label htmlFor="validationCode" className="block text-sm font-medium text-gray-600">
          Código de Validación
        </label>
        <input
          type="text"
          id="validationCode"
          {...register('validationCode', {
            required: 'El código de validación es obligatorio',
            minLength: { value: 6, message: 'El código debe tener al menos 6 caracteres' }
          })}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
        />
        {errors.validationCode && (
          <p className="text-red-500 text-sm">{errors.validationCode.message}</p>
        )}
      </div>

      {/* Botón de validación */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-600 transition"
      >
        Validar Cuenta
      </button>

      {/* Mensajes de estado */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">¡Validación exitosa! Redirigiendo...</p>}
    </form>
  );
};

export default ValidationForm;
