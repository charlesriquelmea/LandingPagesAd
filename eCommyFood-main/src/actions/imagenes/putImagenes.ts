
'use server';

export const putImagen = async( id:number, url: string) => {

    try {
        const response = await fetch(`${process.env.API_URL}/imagenes/${ id }`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url})
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar el producto');
        }
  
        const data = response.json();
        console.log('Producto actualizado con éxito', data);
        return data;

      } catch (error) {
        console.error(error);
      }

      
}