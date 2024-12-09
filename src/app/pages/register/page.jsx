"use client";

import { useState } from "react";
import RegisterForm from "@/app/components/forms/RegisterForm";
import ValidationForm from "@/app/components/forms/ValidationForm";
import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleRegistrationSuccess = (newToken) => {
    setIsRegistered(true); // Después del registro, mostramos el formulario de validación
    setToken(newToken); // Almacenamos el token de sesión
  };

  const handleValidationSuccess = () => {
    router.push("/pages/inicio"); // Redirige al inicio una vez validado
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <Menu />
      <main className="flex-1 bg-blue-50 p-10">
        <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
          {!isRegistered ? (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Crear una cuenta</h2>
              <RegisterForm onSuccess={handleRegistrationSuccess} />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Verificación de Correo</h2>
              <ValidationForm token={token} onSuccess={handleValidationSuccess} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
