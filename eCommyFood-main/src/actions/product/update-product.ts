

'use server';

import { Product } from "@/interfaces";

export const updateProduct = async( id:number,product:Product ) => {

    try {
        const response = await fetch(`${process.env.API_URL}/producto/${ id }`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
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