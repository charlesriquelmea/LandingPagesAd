'use server';

import { Product } from "@/interfaces";
import { seedProducts } from "@/data/seed-data";

export const getProducts = async() => {
  if (!process.env.API_URL) {
    return seedProducts;
  }

  try {
    const data: Product[] = await fetch(`${process.env.API_URL}/producto`)
    .then( res => res.json() );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return seedProducts;
  }
}
