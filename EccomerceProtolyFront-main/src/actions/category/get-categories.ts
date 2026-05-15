'use server';

import { Category } from "@/interfaces";
import { seedCategories } from "@/data/seed-data";

export const getCategories = async() => {
  if (!process.env.API_URL) {
    return seedCategories;
  }

  try {
    const data: Category[] = await fetch(`${process.env.API_URL}/categorias`)
    .then( res => res.json() );
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return seedCategories;
  }
}
