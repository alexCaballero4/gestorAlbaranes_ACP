// Funciones para manejar los proyectos en la API

const API_URL = 'https://bildy-rpmaya.koyeb.app/api'; // Base URL de la API

// Obtiene todos los proyectos disponibles
export async function getProjects() {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/project`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener los proyectos');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los proyectos:', error.message);
    throw error;
  }
}

// Obtiene un proyecto específico por su ID
export async function getProjectById(id) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/project/one/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener el proyecto');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener el proyecto:', error.message);
    throw error;
  }
}

// Crea un nuevo proyecto
export async function createProject(projectData) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) throw new Error('Error al crear el proyecto');
    return await response.json();
  } catch (error) {
    console.error('Error al crear el proyecto:', error.message);
    throw error;
  }
}

// Actualiza un proyecto existente por su ID
export async function updateProject(projectId, projectData) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/project/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) throw new Error('Error al actualizar el proyecto');
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error.message);
    throw error;
  }
}

// Elimina un proyecto por su ID
export async function deleteProject(id) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/project/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar el proyecto');
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error.message);
    throw error;
  }
}
