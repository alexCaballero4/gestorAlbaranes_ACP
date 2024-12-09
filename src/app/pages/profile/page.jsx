"use client";

import { useEffect, useState } from 'react';
import { getUserProfile, deleteUser } from '@/app/api/apiOnboarding';
import Header from '../../components/ui/Header';
import Menu from '../../components/ui/Menu';
import Footer from '../../components/ui/Footer';

export default function ProfilePage() {
  const [user, setUser] = useState(null); // Almacenamos los datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(''); // Estado de error
  const [deleteError, setDeleteError] = useState(''); // Error al eliminar usuario

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUser(profileData); // Guardamos los datos del usuario
        console.log('ID del Usuario:', profileData._id); // Mostramos el ID del usuario en consola
      } catch (err) {
        setError('Error al obtener el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(); // Llamamos a la API cuando el componente se monta
  }, []);

  // Manejar eliminación del usuario
  const handleDeleteUser = async () => {
    try {
      await deleteUser(); // Llama a la API para eliminar al usuario
      alert('Usuario eliminado correctamente');
      localStorage.removeItem('jwt'); // Elimina el token de localStorage
      window.location.href = '/'; // Redirige al inicio
    } catch (err) {
      setDeleteError(err.message || 'Error al eliminar el usuario');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <Menu />
      <main className="flex-1 container mx-auto p-4">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Perfil del Usuario</h2>
              {user && (
                <div className="space-y-4">
                  <p className="text-lg text-gray-800"><strong>Email:</strong> {user.email}</p>
                  <p className="text-lg text-gray-800"><strong>Fecha de Registro:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              )}
              {/* Botón para eliminar usuario */}
              <button
                onClick={handleDeleteUser}
                className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
              >
                Eliminar Usuario
              </button>
              {deleteError && <p className="text-red-500 mt-4">{deleteError}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
