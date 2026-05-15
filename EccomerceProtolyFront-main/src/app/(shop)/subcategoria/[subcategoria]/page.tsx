"use client"
import { useEffect, useState } from 'react';
import { filterProductsBySubcategory } from '@/actions/product/filtrarSubcategoria';
import { Product } from "@/interfaces";
import { ProductGridItem } from "@/components/products/product-grid/ProductGridItem";

interface Props {
  params: {
    subcategoria: string;
  };
}

export default function SubcategoryPage({ params }: Props) {
  const { subcategoria } = params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filteredProducts = await filterProductsBySubcategory(subcategoria);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error obteniendo productos por subcategoría:", error);
      }
    };

    fetchProducts();
  }, [subcategoria]);

  const decoded = decodeURIComponent(subcategoria);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto mt-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{decoded}</h1>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 text-lg font-medium">No hay productos en esta subcategoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {products.map((product) => (
            <ProductGridItem key={product.nombre} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
