"use server"
export const editEstado = async (id, nuevoEstado) => {
  try {
    const response = await fetch(`${process.env.API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nuevoEstado: nuevoEstado })
    });

    if (!response.ok) {
      throw new Error('Failed to edit estado');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing estado:', error);
    throw error; // Propagate the error further if needed
  }
};