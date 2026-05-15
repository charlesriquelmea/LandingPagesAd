'use server';

import { Category } from "@/interfaces";

export const createCategory = async(category:Category) => {

    try {
        const response = await fetch(`${process.env.API_URL}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(category)
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar el formulario');
        }
  
        const data = response.json();
        // console.log('Categoria agregada con éxito', data);
        return data;

      } catch (error) {
        console.error(error);
      }

      
}