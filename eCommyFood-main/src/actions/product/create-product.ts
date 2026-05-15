'use server';

import { Product } from "@/interfaces";

export const createProduct = async(product:Product) => {


    try {
        const response = await fetch(`${process.env.API_URL}/producto`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar el formulario');
        }
  
        const data = response.json();
        // console.log('Producto agregado con éxito', data);
        return data;

      } catch (error) {
        console.error(error);
      }


      
}