'use server'
export const createOrder = async (productDetails, nombre_cliente, telefono, correo, total, address, apartment, reference) => {
    // Objeto con los datos de la orden
    const orderData = {
      productsWithQuantity: productDetails,
      nombre_cliente: nombre_cliente,
      telefono: telefono,
      correo: correo,
      total: total,
      address: address,
      apartment: apartment,
      reference: reference,
    };

  
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

        console.log('Orden creada exitosamente:', data);
      })
      .catch(error => {

        console.error('Error al crear la orden:', error);
      });
  }
  