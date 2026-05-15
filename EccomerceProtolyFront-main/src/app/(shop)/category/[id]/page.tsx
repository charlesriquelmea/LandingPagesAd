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
        console.log("ingresé")
        const filteredProducts = await filterProductsByCategory(id);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error obteniendo productos por categoría:", error);

      }
    };

    fetchProducts();
  }, [id]);


  return (
    <div className="mx-5 mb-2 sm:mx-10 lg:mx-20 xl:mx-44 mt-32">
      <FilteredProducts products={products} />
    </div>
  );
}
