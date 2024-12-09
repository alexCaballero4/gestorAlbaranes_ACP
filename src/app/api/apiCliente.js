// Este archivo contiene funciones para interactuar con la API de clientes.

const API_URL = 'https://bildy-rpmaya.koyeb.app/api'; // Base URL de la API

// Crea un cliente en la API
export async function createClient(data) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Error al crear el cliente');
    return await response.json();
  } catch (error) {
    console.error('Error al crear el cliente:', error.message);
    throw error;
  }
}

// Obtiene todos los clientes de la API
export async function getClients() {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/client`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener los clientes');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message);
    throw error;
  }
}

// Obtiene los detalles de un cliente especifico por ID
export async function getClientById(id) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener los detalles del cliente');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener el cliente:', error.message);
    throw error;
  }
}

// Elimina un cliente de la API usando su ID
export async function deleteClient(id) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/client/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar el cliente');
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el cliente:', error.message);
    throw error;
  }
}
