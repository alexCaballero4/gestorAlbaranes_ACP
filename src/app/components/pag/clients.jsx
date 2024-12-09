"use client";

import { useState, useEffect } from "react";
import { getClients, deleteClient } from "@/app/api/apiCliente";
import { useRouter } from "next/navigation";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [activeClientId, setActiveClientId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError("Error al obtener los clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientClick = (id) => {
    // Alterna la visibilidad de los detalles del cliente seleccionado
    setActiveClientId((prevId) => (prevId === id ? null : id));
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      // Actualiza la lista de clientes después de eliminar uno
      setClients((prevClients) => prevClients.filter((client) => client._id !== id));
      setDeleteError("");
    } catch (err) {
      setDeleteError("Error al eliminar el cliente.");
    }
  };

  if (loading) return <div className="text-gray-600">Cargando clientes...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Clientes</h2>
        <button
          onClick={() => router.push("/pages/createClient")}
          className="bg-cyan-900 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Añadir Cliente
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}

      <ul className="space-y-6">
        {clients.map((client) => (
          <li key={client._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleClientClick(client._id)}
                className="text-lg font-semibold text-gray-600 hover:underline focus:outline-none"
              >
                {client.name}
              </button>
              <button
                onClick={() => handleDeleteClient(client._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Borrar
              </button>
            </div>

            {activeClientId === client._id && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>CIF:</strong> {client.cif}
                </p>
                <p className="text-gray-700">
                  <strong>Domicilio:</strong> {client.address.street} {client.address.number},{" "}
                  {client.address.city}, {client.address.province}
                </p>
                <p className="text-gray-700">
                  <strong>Código Postal:</strong> {client.address.postal}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
