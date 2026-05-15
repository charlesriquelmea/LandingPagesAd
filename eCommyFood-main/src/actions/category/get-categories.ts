'use server';

import { Category } from "@/interfaces";

export const getCategories = async() => {

  try {
    const data:Category[] = await fetch(`${process.env.API_URL}/categorias`)
    .then( res => res.json() );
    return data;
    
  } catch (error) {
    console.error("Errors fetching user data:", error);
    
  } 
      
}