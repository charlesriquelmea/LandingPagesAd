"use server";

const sendEmail = async (correo) => {
    try {
      const response = await fetch(`${process.env.API_URL}/enviarmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(correo),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el correo electrónico');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw error;
    }
  };
  

  export default sendEmail;