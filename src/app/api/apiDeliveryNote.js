// Este archivo contiene funciones para interactuar con la API de albaranes.

const API_URL = 'https://bildy-rpmaya.koyeb.app/api'; // Base URL de la API

// Crea un nuevo albarán
export async function createDeliveryNote(data) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/deliverynote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Error al crear el albaran');
    return await response.json();
  } catch (error) {
    console.error('Error al crear el albaran:', error.message);
    throw error;
  }
}

// Obtiene la lista de albaranes
export async function getDeliveryNotes(queryParams = {}) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${API_URL}/deliverynote${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al listar los albaranes');
    return await response.json();
  } catch (error) {
    console.error('Error al listar los albaranes:', error.message);
    throw error;
  }
}

// Elimina un albarán usando su ID
export async function deleteDeliveryNote(id) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/deliverynote/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Error al eliminar el albaran');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el albaran:', error.message);
    throw error;
  }
}

// Descarga el PDF de un albarán
export async function downloadDeliveryNotePDF(id) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/deliverynote/pdf/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al descargar el PDF del albaran');

    // Retorna la respuesta en formato blob para descarga
    return await response.blob();
  } catch (error) {
    console.error('Error al descargar el PDF del albaran:', error.message);
    throw error;
  }
}
