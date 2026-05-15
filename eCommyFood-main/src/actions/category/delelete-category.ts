

'use server';

export const deleteCategory = async(id:number) => {

    try {
        const response = await fetch(`${process.env.API_URL}/categorias/${ id }`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error al borrar la categoria');
        }
  
        const data = response.json();
        console.log('Categoria borrada con éxito', data);
        return data;

      } catch (error) {
        console.error(error);
      }

      
}