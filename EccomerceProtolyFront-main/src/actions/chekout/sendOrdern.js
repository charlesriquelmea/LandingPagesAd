'use server'
export const createOrder = async (products, nombre_cliente, telefono, correo, finalTotal, retiro, direccion, tipoPropiedad, nro) => {
    // Objeto con los datos de la orden
    const orderData = {
      productsWithQuantity: products,
      nombre_cliente: nombre_cliente,
      telefono: telefono,
      correo: correo,
      total: finalTotal,
      retira: retiro,
      direccion: direccion,
      propiedad: tipoPropiedad,
      numero: nro
    };
    console.log(orderData)
  
    // Configurar la solicitud
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    };
  
    // Hacer la solicitud al servidor
    fetch(`${process.env.API_URL}/order`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo crear la orden');
        }
        return response.json();
      })
      .then(data => {

      })
      .catch(error => {

        console.error('Error al crear la orden:', error);
      });
  }
  