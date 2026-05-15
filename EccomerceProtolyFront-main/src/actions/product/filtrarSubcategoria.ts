'use server'
import { Product } from "@/interfaces";
import { seedProducts } from "@/data/seed-data";

export const filterProductsBySubcategory = async (subcategoria: string): Promise<Product[]> => {
  if (!process.env.API_URL) {
    return seedProducts.filter(
      p => p.subcategoria?.toLocaleLowerCase() === subcategoria.toLocaleLowerCase()
    );
  }

  try {
    const data: Product[] = await fetch(`${process.env.API_URL}/subcategory/${subcategoria}`)
    .then( res => res.json() );
    return data;
  } catch (error) {
    console.error("Error filtering products by subcategory:", error);
    throw error;
  }
};
