"use client"
import { useEffect, useState } from 'react';
import { filterProductsByCategory } from '@/actions/product/filtrarProducto';
import { FilteredProducts } from "@/components/products/filteredProducts";
import { Product } from "@/interfaces";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filteredProducts = await filterProductsByCategory(id);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error obteniendo productos por categoría:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="mt-4">
      <FilteredProducts products={products} />
    </div>
  );
}
