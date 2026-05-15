'use server';

import { Usuario } from "@/interfaces";

export const loginUser = async(user:Usuario) => {

    try {
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
  
        if (!response.ok) {
          throw new Error('Error al autenticar el usuario');
        }
  
        const data = response.json();
        // console.log('Usuario logeado con éxito', data);
        return data;

      } catch (error) {
        console.error(error);
        throw error;
      }


      
}