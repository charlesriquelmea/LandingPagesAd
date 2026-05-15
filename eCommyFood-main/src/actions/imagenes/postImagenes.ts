"use server";

const postImagenes = async (url: any, dispositivo: any, nro: any) => {
    try {
      const response = await fetch(`${process.env.API_URL}/imagenes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url, dispositivo, nro})
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar imagen al banner');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error al agregar imagen al banner', error);
      throw error;
    }
  };
  

  export default postImagenes;