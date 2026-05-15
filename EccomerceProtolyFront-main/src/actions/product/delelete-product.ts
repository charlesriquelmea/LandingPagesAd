

'use server';

export const deleteProduct = async(id:number) => {

    try {
        const response = await fetch(`${process.env.API_URL}/producto/${ id }`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error al borrar el producto');
        }
  
        const data = response.json();
        console.log('Producto borrado con éxito', data);
        return data;

      } catch (error) {
        console.error(error);
        throw error;
      }

      
}