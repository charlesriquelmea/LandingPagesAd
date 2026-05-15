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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filteredProducts = await filterProductsByCategory(id);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error obteniendo productos por categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="mt-4">
      <FilteredProducts products={products} loading={loading} />
    </div>
  );
}
