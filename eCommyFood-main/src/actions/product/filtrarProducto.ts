'use server'
import { Product } from "@/interfaces";
export const filterProductsByCategory = async (category: string): Promise<Product[]> => {
  try {

    const data:Product[] = await fetch(`${process.env.API_URL}/category/${category}`)
    .then( res => res.json() );
    return data;
  } catch (error) {
    console.error("Error filtrando productos por categoría:", error);
    throw error;
  }
};