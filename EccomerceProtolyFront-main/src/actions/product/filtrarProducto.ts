'use server'
import { Product } from "@/interfaces";
import { seedProducts } from "@/data/seed-data";

export const filterProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!process.env.API_URL) {
    return seedProducts.filter(
      p => p.Categoria?.nombre.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
  }

  try {
    const data: Product[] = await fetch(`${process.env.API_URL}/category/${category}`)
    .then( res => res.json() );
    return data;
  } catch (error) {
    console.error("Error filtering products by category:", error);
    throw error;
  }
};
