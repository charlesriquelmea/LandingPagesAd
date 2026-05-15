'use server';

import { createCategory } from '../category/create-category';
import { createProduct } from '../product/create-product';
import { seedCategories, seedProducts } from '@/data/seed-data';

export const seedData = async () => {
  const results = { categories: 0, products: 0, errors: [] as string[] };

  for (const cat of seedCategories) {
    try {
      await createCategory({ nombre: cat.nombre });
      results.categories++;
    } catch (e) {
      results.errors.push(`Error creating category "${cat.nombre}": ${e}`);
    }
  }

  for (const prod of seedProducts) {
    try {
      await createProduct({
        nombre: prod.nombre,
        descripcion: prod.descripcion,
        precio: prod.precio,
        inventario: prod.inventario,
        categoriaId: prod.categoriaId,
        imagenUrl: prod.imagenUrl,
      });
      results.products++;
    } catch (e) {
      results.errors.push(`Error creating product "${prod.nombre}": ${e}`);
    }
  }

  return results;
};
