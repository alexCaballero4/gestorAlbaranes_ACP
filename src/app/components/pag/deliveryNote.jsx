"use client";

import { useEffect, useState } from "react";
import {
  getDeliveryNotes,
  deleteDeliveryNote,
  downloadDeliveryNotePDF,
} from "@/app/api/apiDeliveryNote";
import { useRouter } from "next/navigation";

const DeliveryNote = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]); // Lista de albaranes obtenidos de la API
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState("");
  const router = useRouter();

  // Obtiene los albaranes al montar el componente
  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      try {
        const data = await getDeliveryNotes(); // Llama a la API para obtener los albaranes
        setDeliveryNotes(data); // Almacena los albaranes obtenidos
      } catch (err) {
        setError("Error al obtener los albaranes");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryNotes();
  }, []);

  // Elimina un albarán por su ID
  const handleDelete = async (id) => {
    try {
      await deleteDeliveryNote(id);
      setDeliveryNotes((prev) => prev.filter((note) => note._id !== id)); // Actualiza el estado eliminando el albarán
    } catch (err) {
      alert("Error al eliminar el albarán");
    }
  };

  // Descarga el PDF de un albarán por su ID
  const handleDownloadPDF = async (id) => {
    try {
      const pdfBlob = await downloadDeliveryNotePDF(id);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `Albaran_${id}.pdf`; // Define el nombre del archivo descargado
      link.click();
    } catch (err) {
      alert("Error al descargar el PDF del albarán");
    }
  };

  if (loading) return <div className="text-gray-600">Cargando albaranes...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Albaranes</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-6">
        {/* Botón para crear un nuevo albarán */}
        <button
          onClick={() => router.push("/pages/createDeliveryNote")}
          className="bg-cyan-900 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Crear Albarán
        </button>
      </div>
      <ul className="space-y-4">
        {deliveryNotes.map((note) => (
          <li key={note._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            {/* Información del albarán */}
            <p className="text-gray-700">
              <strong>Descripción:</strong> {note.description}
            </p>
            <p className="text-gray-700">
              <strong>Proyecto:</strong> {note.projectId?.name || "Proyecto no encontrado"}
            </p>
            {/* Botones de acción */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Eliminar
              </button>
              <button
                onClick={() => handleDownloadPDF(note._id)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Descargar PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryNote;
