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

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
        <div className="aspect-square bg-gray-200" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export default function SubcategoryPage({ params }: Props) {
  const { subcategoria } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filteredProducts = await filterProductsBySubcategory(subcategoria);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error obteniendo productos por subcategoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategoria]);

  const decoded = decodeURIComponent(subcategoria);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto mt-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{decoded}</h1>
      {loading ? (
        <SkeletonGrid />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 text-lg font-medium">No hay productos en esta subcategoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {products.map((product) => (
            <ProductGridItem key={product.id ?? product.nombre} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
