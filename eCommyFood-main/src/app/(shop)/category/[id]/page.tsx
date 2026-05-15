"use client";
import { useEffect, useState } from 'react';
import { filterProductsByCategory } from '@/actions/product/filtrarProducto';
import { FilteredProducts } from "@/components/products/filteredProducts";
import { Product } from "@/interfaces";
import Link from "next/link"; // Importar Link
import { IoArrowBack } from "react-icons/io5";

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
        console.log("ingresé");
        const filteredProducts = await filterProductsByCategory(id);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error obteniendo productos por categoría:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="mt-10 mx-2 sm:mx-10 lg:mx-20 md:mx-10 xl:mx-44">
      {/* Botón "Volver a Menu" */}
      <Link href={"/"}>
        <div className="rounded-md py-1 px-2 flex justify-center items-center mb-4">
          <IoArrowBack size={20} />
          <span className="ml-1 hover:text-yellow-500">Volver a Menu</span>
        </div>
      </Link>

      <FilteredProducts products={products} />
    </div>
  );
}

