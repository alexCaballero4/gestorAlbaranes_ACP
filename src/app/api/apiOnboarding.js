// Funciones para manejar el registro, inicio de sesión y gestión de usuarios en la API.

const API_URL = 'https://bildy-rpmaya.koyeb.app/api'; // Base URL de la API

// Registra un nuevo usuario
export async function registerUser(formData) {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Error al registrar el usuario');
    }

    const data = await response.json();
    localStorage.setItem('jwt', data.token); // Guarda el token en localStorage
    console.log('Token de autenticacion:', data.token);
    return data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    throw error;
  }
}

// Inicia sesión de un usuario
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Error al iniciar sesion');
    }

    const data = await response.json();
    localStorage.setItem('jwt', data.token); // Guarda el token en localStorage si el login es exitoso
    console.log('Token de autenticacion:', data.token);
    return data;
  } catch (error) {
    console.error('Error al iniciar sesion:', error.message);
    throw error;
  }
}

// Valida el correo electrónico del usuario
export async function validateEmail(code) {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/user/validation`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Error al validar el correo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al validar el correo:', error.message);
    throw error;
  }
}

// Obtiene el perfil del usuario autenticado
export async function getUserProfile() {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Error al obtener el perfil');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener el perfil:', error.message);
    throw error;
  }
}

// Elimina la cuenta del usuario autenticado
export async function deleteUser() {
  const token = localStorage.getItem('jwt');
  if (!token) throw new Error('No se encontro un token');

  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Error al eliminar el usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message);
    throw error;
  }
}
